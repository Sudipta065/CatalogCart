import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import { useFetchProductsQuery } from "../store/apiSlice";
import * as Location from "expo-location";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
} from "../store/cartSlice";
import { format } from "date-fns";
import { RootState } from "../store/store";
import { saveProductsToCache } from "../utils/storage";

const HomeScreen = ({ navigation }) => {
  const { data: products, isLoading, error } = useFetchProductsQuery("asc");
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [currentTimestamp, setCurrentTimestamp] = useState<string | null>(null);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  useEffect(() => {
    const updateTimestamp = () => {
      const timestamp = new Date();
      const formattedTimestamp = format(timestamp, "yyyy-MM-dd HH:mm:ss");
      setCurrentTimestamp(formattedTimestamp);
    };

    updateTimestamp();
    const intervalId = setInterval(updateTimestamp, 20000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (products) {
      saveProductsToCache(products);
    }
  }, [products])

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === "granted") {
          const locationData = await Location.getCurrentPositionAsync({});
          setLocation(locationData);
        } else {
          console.log("Location permission denied");
        }
      } catch (err) {
        console.error(err);
      }
    };

    requestLocationPermission();
  }, []);

  const handleAddToCart = (product) => {
    dispatch(
      addToCart({ id: product.id, title: product.title, price: product.price })
    );
  };

  const handleIncrease = (productId) => {
    dispatch(increaseQuantity(productId));
  };

  const handleDecrease = (productId) => {
    dispatch(decreaseQuantity(productId));
  };

  if (isLoading) return <Text style={styles.loadingText}>Loading...</Text>;
  if (error)
    return <Text style={styles.errorText}>Error fetching products.</Text>;

  return (
    <>
      <FlatList
        data={products || []}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => {
          const cartItem = cartItems.find(
            (cartItem) => cartItem.id === item.id
          );
          return (
            <View style={styles.card}>
              <Text style={styles.productTitle}>{item.title}</Text>
              <Text style={styles.productPrice}>${item.price}</Text>
              <Button
                title="View Details"
                onPress={() =>
                  navigation.navigate("ProductDetails", { product: item })
                }
              />
              {cartItem ? (
                <View style={styles.quantityContainer}>
                  <Button title="-" onPress={() => handleDecrease(item.id)} />
                  <Text style={styles.quantityText}>{cartItem.quantity}</Text>
                  <Button title="+" onPress={() => handleIncrease(item.id)} />
                </View>
              ) : (
                <Button
                  title="Add to Cart"
                  onPress={() => handleAddToCart(item)}
                />
              )}
            </View>
          );
        }}
      />
      <Button
        title="Go to Cart"
        onPress={() => navigation.navigate("CartScreen")}
      />
      <Button
        title="Go to Map"
        onPress={() => navigation.navigate('MapScreen', { location })}
      />

      {currentTimestamp && (
        <View style={styles.timestampContainer}>
          <Text style={styles.timestampText}>{currentTimestamp}</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 100,
  },
  loadingText: {
    textAlign: "center",
    fontSize: 18,
    color: "#333",
    marginTop: 20,
  },
  errorText: {
    textAlign: "center",
    fontSize: 18,
    color: "red",
    marginTop: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  quantityButton: {
    backgroundColor: "#ff6347",
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  timestampContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 10,
  },
  timestampText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default HomeScreen;
