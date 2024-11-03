import React from 'react';
import { Provider } from 'react-redux';
import store from './src/store/store';
import HomeScreen from './src/screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProductDetailsScreen from './src/screens/ProductDetailsScreen';
import MapScreen from './src/screens/MapScreen';
import CartScreen from './src/screens/CartScreen';
import FloatingCart from './src/components/FloatingCart';
const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
          <Stack.Screen name="MapScreen" component={MapScreen} />
          <Stack.Screen name="CartScreen" component={CartScreen} />
        </Stack.Navigator>
        <FloatingCart/>
      </NavigationContainer>
    </Provider>
  );
}
