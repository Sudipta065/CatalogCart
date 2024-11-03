import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useFetchProductsQuery } from '../store/apiSlice';

const HomeScreen = () => {
  const { data: products, isLoading, error } = useFetchProductsQuery('asc');
  if (isLoading) return <Text style={styles.loadingText}>Loading...</Text>;
  if (error) return <Text style={styles.errorText}>Error fetching products.</Text>;

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.productTitle}>{item.title}</Text>
          <Text style={styles.productPrice}>${item.price}</Text>
          <Button title="View Details" onPress={() => {}} />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#333',
    marginTop: 20,
  },
  errorText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'red',
    marginTop: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
});

export default HomeScreen;
