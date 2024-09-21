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

import tw from "@/lib/tailwind";
import Button from "@/ui/Button";
import { Layout } from "@/ui/Layout";
import Headline from "@/ui/Headline";

interface INetworkContext {
  isConnected: boolean;
  verifyConnection: () => Promise<boolean>;
}

const NetworkContext = createContext<INetworkContext>({} as INetworkContext);

const NetworkProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isConnected, setIsConnected] = useState(true);

  /**
   * On initial render, verify the internet connection
   */
  useEffect(() => {
    verifyConnection();
  }, []);

  /**
   * Ensure the device is connected to the internet, and update
   * the state to reflect the connection status
   */
  const verifyConnection = async () => {
    const { isInternetReachable } = await Network.getNetworkStateAsync();

    setIsConnected(isInternetReachable ?? false);

    return isInternetReachable ?? false;
  };

  if (!isConnected) {
    return (
      <NetworkContext.Provider value={{ isConnected, verifyConnection }}>
        <Layout.Root>
          <Layout.Content contentContainerStyle={tw`justify-center`}>
            <Headline
              centerText
              title="Uh Oh, You're Offline..."
              subtitle="Sorry, we couldn't connect to the internet. Please check your connection and try again!"
            />

            <Button
              size="sm"
              color="secondary"
              iconLeft="refresh-line"
              onPress={verifyConnection}
            >
              Retry
            </Button>
          </Layout.Content>
        </Layout.Root>
      </NetworkContext.Provider>
    );
  }

  return (
    <NetworkContext.Provider value={{ isConnected, verifyConnection }}>
      {children}
    </NetworkContext.Provider>
  );
};

export const useNetwork = () => useContext(NetworkContext);

export default NetworkProvider;
