import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapScreen = ({ route }) => {
  const { coords } = route.params.location;
  //  console.log("@@@@@@",location)
  if (!coords) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          Location data not available. Please ensure location permissions are
          enabled in HomeScreen.
        </Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker coordinate={coords} title="You are here" />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  map: {
    width: "100%",
    height: "80%",
    borderRadius: 10,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    marginTop: 10,
  },
});

export default MapScreen;
