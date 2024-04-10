/*
 * Created on Tue Apr 09 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import * as Network from "expo-network";
import { createContext, useContext, useEffect, useState } from "react";

interface NetworkContext {
  isConnected: boolean;
  retryConnection(): void;
}

interface NetworkProviderProps {
  children: React.ReactNode;
}

const NetworkContext = createContext<NetworkContext>({} as NetworkContext);

const NetworkProvider: React.FC<NetworkProviderProps> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    retryConnection();
  }, []);

  const retryConnection = async () => {
    const { isInternetReachable } = await Network.getNetworkStateAsync();

    setIsConnected(isInternetReachable ?? false);
  };

  return (
    <NetworkContext.Provider value={{ isConnected, retryConnection }}>
      {children}
    </NetworkContext.Provider>
  );
};

export const useNetwork = () => useContext(NetworkContext);

export default NetworkProvider;
