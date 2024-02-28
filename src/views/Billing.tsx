/*
 * Created on Sat Feb 24 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { View } from "react-native";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import Button from "@/ui/Button";
import Hyperlink from "@/ui/Hyperlink";
import { useAuth } from "@/providers/Auth";
import usePurchase from "@/hooks/deprecated/usePurchase";
import ProductCard from "@/components/ProductCard";

const BillingView = () => {
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

  const { chapter, signOut } = useAuth();

  const onButtonPress = () => {
    completePurchase();
  };

  const onRestorePress = () => {
    restorePurchases();
  };

  if (areOfferingsLoading) return null;

  return (
    <>
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
          <Hyperlink color="dark" onPress={signOut}>
            Sign out
          </Hyperlink>
          <Text style={tw`mx-1`}>or</Text>
          <Hyperlink color="dark" onPress={onRestorePress}>
            Restore purchases
          </Hyperlink>
        </View>
      </View>
    </>
  );
};

export default BillingView;
