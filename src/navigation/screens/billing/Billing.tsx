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
import usePurchase from "@/hooks/usePurchase";
import ProductCard from "@/components/ProductCard";

const Billing = () => {
  const {
    areOfferingsLoading,
    isPurchaseLoading,
    buttonCTA,
    packages,
    packageID,
    setPackageID,
    completePurchase,
  } = usePurchase();

  const { organization, signOut } = useAuth();

  const onButtonPress = () => {
    completePurchase();
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
          You are currently signed in as {organization?.email}. Wrong
          account?&nbsp;
        </Text>
        <Hyperlink color="dark" onPress={signOut}>
          Sign out
        </Hyperlink>
      </View>
    </Layout>
  );
};

export default Billing;
