import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { loadProductsFromCache } from "../utils/storage";

const HistoryScreen = () => {
  const [cachedProducts, setCachedProducts] = useState([]);

  useEffect(() => {
    const loadCachedData = async () => {
      const products = await loadProductsFromCache();
      setCachedProducts(products);
    };

    loadCachedData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        You are currently not connected to Internet. Showing cached Products
      </Text>
      <FlatList
        data={cachedProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.productTitle}>{item.title}</Text>
            <Text style={styles.productPrice}>${item.price}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No cached products available.</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#f2f2f2",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  card: {
    padding: 15,
    backgroundColor: "#fff",
    marginVertical: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 16,
    color: "#555",
  },
  empty: {
    textAlign: "center",
    fontSize: 16,
    color: "#888",
    marginTop: 20,
  },
});

export default HistoryScreen;
