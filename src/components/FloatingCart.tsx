import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Icon from "react-native-vector-icons/Ionicons";

const FloatingCart = () => {
  const navigation = useNavigation();
  const cartItemsCount = useSelector((state: RootState) =>
    state.cart.items.reduce((count, item) => count + item.quantity, 0)
  );

  if (cartItemsCount === 0) return null;

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate("CartScreen")}
    >
      <Icon name="cart" size={30} color="#fff" />
      {cartItemsCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{cartItemsCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    top: "50%",
    right: 20,
    backgroundColor: "#4CAF50",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  badge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "#fff",
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "#4CAF50",
    fontSize: 10,
    fontWeight: "bold",
  },
});

export default FloatingCart;
