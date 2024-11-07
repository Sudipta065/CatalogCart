import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { useFetchProductsQuery } from "../store/apiSlice";
import * as Location from "expo-location";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, increaseQuantity, decreaseQuantity } from "../store/cartSlice";
import { format } from "date-fns";
import { RootState } from "../store/store";
import { saveProductsToCache } from "../utils/storage";

const HomeScreen = ({ navigation }) => {
  const { data: products, isLoading, error } = useFetchProductsQuery("asc");
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
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
  }, [products]);

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
    dispatch(addToCart({ id: product.id, title: product.title, price: product.price }));
  };

  const handleIncrease = (productId) => {
    dispatch(increaseQuantity(productId));
  };

  const handleDecrease = (productId) => {
    dispatch(decreaseQuantity(productId));
  };

  if (isLoading) return <ActivityIndicator style={styles.loading} size="large" color="#6200ee" />;
  if (error) return <Text style={styles.errorText}>Error fetching products.</Text>;

  return (
    <View style={styles.container}>
      <FlatList
        data={products || []}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => {
          const cartItem = cartItems.find((cartItem) => cartItem.id === item.id);
          return (
            <View style={styles.card}>
              <View style={styles.cardContent}>
                <Text style={styles.productTitle}>{item.title}</Text>
                <Text style={styles.productPrice}>${item.price}</Text>
                <TouchableOpacity
                  style={styles.detailsButton}
                  onPress={() => navigation.navigate("ProductDetails", { product: item })}
                >
                  <Text style={styles.detailsButtonText}>View Details</Text>
                </TouchableOpacity>
                {cartItem ? (
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity style={styles.quantityButton} onPress={() => handleDecrease(item.id)}>
                      <Text style={styles.quantityButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{cartItem.quantity}</Text>
                    <TouchableOpacity style={styles.quantityButton} onPress={() => handleIncrease(item.id)}>
                      <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity style={styles.addToCartButton} onPress={() => handleAddToCart(item)}>
                    <Text style={styles.addToCartButtonText}>Add to Cart</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          );
        }}
      />
      <View style={styles.footerButtons}>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate("CartScreen")}>
          <Text style={styles.footerButtonText}>Go to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('MapScreen', { location })}>
          <Text style={styles.footerButtonText}>Go to Map</Text>
        </TouchableOpacity>
      </View>
      {currentTimestamp && (
        <View style={styles.timestampContainer}>
          <Text style={styles.timestampText}>{currentTimestamp}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  listContainer: {
    paddingBottom: 150,
    paddingHorizontal: 10,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  cardContent: {
    alignItems: "flex-start",
  },
  productTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 6,
  },
  productPrice: {
    fontSize: 16,
    color: "#6200ee",
    marginBottom: 10,
  },
  detailsButton: {
    backgroundColor: "#6200ee",
    padding: 8,
    borderRadius: 5,
    marginBottom: 10,
  },
  detailsButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  addToCartButton: {
    backgroundColor: "#03dac5",
    padding: 8,
    borderRadius: 5,
    alignItems: "center",
  },
  addToCartButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  quantityButton: {
    backgroundColor: "#6200ee",
    padding: 5,
    paddingLeft:20,
    paddingRight:20,
    borderRadius: 5,
  },
  quantityButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "600",
    marginHorizontal: 10,
  },
  footerButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  footerButton: {
    backgroundColor: "#6200ee",
    padding: 12,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
  },
  footerButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
  timestampContainer: {
    position: "absolute",
    bottom: 80,
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
