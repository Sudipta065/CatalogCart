import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
} from "../store/cartSlice";
import { RootState } from "../store/store";

const ProductDetailsScreen = ({ route }) => {
  const { product } = route.params;
  const dispatch = useDispatch();
  const cartItem = useSelector((state: RootState) =>
    state.cart.items.find((item) => item.id === product.id)
  );

  const handleAddToCart = () => {
    dispatch(
      addToCart({ id: product.id, title: product.title, price: product.price })
    );
  };

  const handleIncrease = () => {
    dispatch(increaseQuantity(product.id));
  };

  const handleDecrease = () => {
    dispatch(decreaseQuantity(product.id));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.productCard}>
        <Image source={{ uri: product.image }} style={styles.productImage} />
        <Text style={styles.productTitle}>{product.title}</Text>
        <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
        <Text style={styles.productDescription}>{product.description}</Text>
        {cartItem ? (
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={handleDecrease}
            >
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{cartItem.quantity}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={handleIncrease}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={handleAddToCart}
          >
            <Text style={styles.addToCartButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f5",
  },
  productCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    margin: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  productImage: {
    width: "100%",
    height: 250,
    borderRadius: 12,
    marginBottom: 15,
    resizeMode: "cover",
  },
  productTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 20,
    color: "#e76f51",
    fontWeight: "600",
    marginBottom: 15,
  },
  productDescription: {
    fontSize: 16,
    color: "#555",
    lineHeight: 22,
    marginBottom: 20,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  quantityButton: {
    backgroundColor: "#2a9d8f",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 5,
  },
  quantityButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  quantityText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginHorizontal: 10,
  },
  addToCartButton: {
    backgroundColor: "#e76f51",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    alignItems: "center",
  },
  addToCartButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ProductDetailsScreen;
