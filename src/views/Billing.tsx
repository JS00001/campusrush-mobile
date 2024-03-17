/*
 * Created on Mon Aug 07 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */
import { useState } from "react";
import { View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import Qonversion, { PurchaseModel } from "react-native-qonversion";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import Button from "@/ui/Button";
import Hyperlink from "@/ui/Hyperlink";
import { useAuth } from "@/providers/Auth";
import { useLogout } from "@/hooks/api/auth";
import ProductCard from "@/components/ProductCard";
import { useQonversion } from "@/providers/Qonversion";

const BillingView = () => {
  const logoutMutation = useLogout();
  const { chapter, clear } = useAuth();
  const { purchaseProduct, restorePurchases } = useQonversion();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [purchaseLoading, setPurchaseLoading] = useState(false);

  /**
   * Fetch all of the products from Qonversion and
   * sort them by their price
   */
  const query = useQuery(["packages"], {
    queryFn: async () => {
      const response = await Qonversion.getSharedInstance().products();

      const toObject = Object.fromEntries(response.entries());

      const sortedKeys = Object.keys(toObject).sort((a, b) => {
        const aPrice = toObject[a].price as number;
        const bPrice = toObject[b].price as number;

        return aPrice - bPrice;
      });

      const sortedProducts = sortedKeys.map((key) => toObject[key]);

      return sortedProducts;
    },
  });

  const products = query.data;
  const selectedProduct = products?.[selectedIndex];

  const buttonCTA = selectedProduct?.trialPeriod
    ? `Start your ${
        selectedProduct.trialPeriod.unitCount
      }-${selectedProduct.trialPeriod?.unit.toLowerCase()} free trial\nthen ${
        selectedProduct.prettyPrice
      } /${selectedProduct.subscriptionPeriod?.unit.toLowerCase()}`
    : `Subscribe for ${selectedProduct?.prettyPrice} /${selectedProduct?.subscriptionPeriod?.unit.toLowerCase()}`;

  /**
   * When the purchase button is pressed, purchase the selected product, do
   * not throw an error if the buyer cancels the purchase
   */
  const onPurchase = async () => {
    setPurchaseLoading(true);

    const purchaseModel = selectedProduct?.toPurchaseModel() as PurchaseModel;

    await purchaseProduct(purchaseModel);

    setPurchaseLoading(false);
  };

  /**
   * When the logout button is pressed, log the user out
   */
  const onLogout = async () => {
    const res = await logoutMutation.mutateAsync();

    if ("error" in res.data) return;

    clear();
  };

  // TODO: Add loading to this
  if (query.isLoading && query.isFetching) return null;

  // TODO: Add a "No products found" message here
  if (!products) return null;

  return (
    <>
      {products.map((product, i) => {
        const isSelected = selectedIndex === i;

        const onPress = () => {
          setSelectedIndex(i);
        };

        return (
          <ProductCard
            key={i}
            product={product}
            selected={isSelected}
            onPress={onPress}
          />
        );
      })}

      <Button onPress={onPurchase} loading={purchaseLoading}>
        {buttonCTA}
      </Button>

      <View style={tw`justify-center -mt-2 items-center`}>
        <Text style={tw`text-center`}>
          You are currently signed in as {chapter?.email}. Wrong account?&nbsp;
        </Text>

        <View style={tw`justify-center items-center`}>
          <Hyperlink
            color="primary"
            onPress={onLogout}
            disabled={logoutMutation.isLoading}
          >
            Sign out
          </Hyperlink>
          <Text style={tw`mx-1`}>or</Text>
          <Hyperlink color="primary" onPress={restorePurchases}>
            Restore purchases
          </Hyperlink>
        </View>
      </View>
    </>
  );
};

export default BillingView;
