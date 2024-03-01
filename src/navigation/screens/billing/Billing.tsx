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

import { View } from "react-native";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import Layout from "@/ui/Layout";
import Button from "@/ui/Button";
import Hyperlink from "@/ui/Hyperlink";
import { useAuth } from "@/providers/Auth";
import { useLogout } from "@/hooks/api/auth";
import ProductCard from "@/components/ProductCard";
import usePurchase from "@/hooks/deprecated/usePurchase";

const BillingScreen = () => {
  const {
    packages,
    buttonCTA,
    packageID,
    isPurchaseLoading,
    areOfferingsLoading,
    setPackageID,
    completePurchase,
    restorePurchases,
  } = usePurchase();

  const logoutMutation = useLogout();
  const { chapter, clearUserData } = useAuth();

  const onButtonPress = () => {
    completePurchase();
  };

  const onRestorePress = () => {
    restorePurchases();
  };

  const onLogout = async () => {
    const res = await logoutMutation.mutateAsync();

    if ("error" in res.data) return;

    clearUserData();
  };

  if (areOfferingsLoading) return null;

  return (
    <Layout scrollable gap={18}>
      <Layout.Header title="Billing" subtitle="Select a plan to get started" />

      {packages?.map(({ product }, i) => (
        <ProductCard
          key={i}
          product={product}
          selected={i === packageID}
          onPress={() => setPackageID(i)}
        />
      ))}

      <Button loading={isPurchaseLoading} onPress={onButtonPress}>
        {buttonCTA}
      </Button>

      <View style={tw`justify-center -mt-2 items-center`}>
        <Text style={tw`text-center`}>
          You are currently signed in as {chapter?.email}. Wrong account?&nbsp;
        </Text>

        <View style={tw`justify-center items-center`}>
          <Hyperlink
            color="dark"
            onPress={onLogout}
            disabled={logoutMutation.isLoading}
          >
            Sign out
          </Hyperlink>
          <Text style={tw`mx-1`}>or</Text>
          <Hyperlink color="dark" onPress={onRestorePress}>
            Restore purchases
          </Hyperlink>
        </View>
      </View>
    </Layout>
  );
};

export default BillingScreen;
