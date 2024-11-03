import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Button } from "react-native";

import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
} from "../store/cartSlice";
import { RootState } from '../store/store';
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
    <View style={styles.container}>
      <View style={styles.productCard}>
        <Image source={{ uri: product.image }} style={styles.productImage} />
        <Text style={styles.productTitle}>{product.title}</Text>
        <Text style={styles.productPrice}>${product.price}</Text>
        <Text style={styles.productDescription}>{product.description}</Text>
        {cartItem ? (
          <View style={styles.quantityContainer}>
            <Button title="-" onPress={handleDecrease} />
            <Text style={styles.quantityText}>{cartItem.quantity}</Text>
            <Button title="+" onPress={handleIncrease} />
          </View>
        ) : (
          <Button title="Add to Cart" onPress={handleAddToCart} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    padding: 10,
  },
  productCard: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
    marginBottom: 20,
  },
  productImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 16,
    color: "#ff6347",
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  mapHeader: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
    textAlign: "center",
  },
  map: {
    height: 200,
    borderRadius: 10,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
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
});

export default ProductDetailsScreen;
