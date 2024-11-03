import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const ProductDetailsScreen = ({ route }) => {
  const { product } = route.params;
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);

  // Fetch user location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLocationError("Permission denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.productCard}>
        <Image source={{ uri: product.image }} style={styles.productImage} />
        <Text style={styles.productTitle}>{product.title}</Text>
        <Text style={styles.productPrice}>${product.price}</Text>
        <Text style={styles.productDescription}>{product.description}</Text>
      </View>

      <Text style={styles.mapHeader}>Your Current Location:</Text>

      {location ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          <Marker coordinate={location} title="You are here" />
        </MapView>
      ) : locationError ? (
        <Text style={styles.errorText}>{locationError}</Text>
      ) : (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      )}
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
});

export default ProductDetailsScreen;
