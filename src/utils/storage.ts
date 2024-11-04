import AsyncStorage from "@react-native-async-storage/async-storage";

const PRODUCT_CACHE_KEY = "cached_products";

export const saveProductsToCache = async (products: any[]) => {
  try {
    await AsyncStorage.setItem(PRODUCT_CACHE_KEY, JSON.stringify(products));
  } catch (error) {
    console.error(error);
  }
};

export const loadProductsFromCache = async () => {
  try {
    const cachedData = await AsyncStorage.getItem(PRODUCT_CACHE_KEY);
    // console.log("@@@@@@@@",cachedData)
    return cachedData ? JSON.parse(cachedData) : [];
  } catch (error) {
    console.error(error);
    return [];
  }
};
