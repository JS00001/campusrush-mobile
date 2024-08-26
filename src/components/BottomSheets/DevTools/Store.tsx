/*
 * Created on Mon Mar 18 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import lodash from "lodash";
import { View } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import Button from "@/ui/Button";
import Headline from "@/ui/Headline";
import Menu, { MenuAction } from "@/ui/Menu";
import { formatJSON, titleCase } from "@/lib/util/string";
import Expandable from "@/ui/Expandable";

const Store = () => {
  const [store, setStore] = useState({} as any);
  const [storeSize, setStoreSize] = useState("");

  const fetchAsyncStorageData = async () => {
    const keys = await AsyncStorage.getAllKeys();
    const result = await AsyncStorage.multiGet(keys);
    const data = lodash.fromPairs(result);

    // Sort by key alphabetically first
    const sortedKeys = Object.keys(data).sort();
    const sortedData = sortedKeys.reduce((acc, key) => {
      acc[key] = data[key];
      return acc;
    }, {} as any);

    setStore(sortedData);
  };

  useEffect(() => {
    fetchAsyncStorageData();
  }, []);

  useEffect(() => {
    const size = calculateStringSize(JSON.stringify(store));

    setStoreSize(size);
  }, [store]);

  const calculateStringSize = (str: string) => {
    const bytes = str.length;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

    if (bytes === 0) return "0 Bytes";

    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString());
    const result = Math.round(bytes / Math.pow(1024, i)) + " " + sizes[i];

    return result;
  };

  return (
    <>
      <View style={tw`gap-y-2`}>
        <Button iconLeft="refresh-line" onPress={fetchAsyncStorageData}>
          Refresh Store Data
        </Button>

        <View style={tw`rounded-xl bg-slate-100 p-4`}>
          <Headline title="Store Size" subtitle={storeSize} />
        </View>

        {Object.keys(store).map((key) => {
          const actions: MenuAction[] = [
            {
              title: "Remove From Store",
              image: "trash",
              attributes: { destructive: true },
              onPress: async () => {
                await AsyncStorage.removeItem(key);
                fetchAsyncStorageData();
              },
            },
          ];

          const size = calculateStringSize(JSON.stringify(store[key]));
          const title = `${titleCase(key.replace("-", " "))} (${size})`;

          return (
            <Menu key={key} shouldOpenOnLongPress actions={actions}>
              <Expandable title={title}>
                <Text type="p4">{formatJSON(store[key])}</Text>
              </Expandable>
            </Menu>
          );
        })}
      </View>
    </>
  );
};

export default Store;
