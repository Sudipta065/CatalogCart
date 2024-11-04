import { useState, useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";

const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      // console.log("@@@@@@",state)
      setIsOnline(state.isConnected && state.isInternetReachable);
    });
    return () => unsubscribe();
  }, []);

  return isOnline;
};

export default useNetworkStatus;
