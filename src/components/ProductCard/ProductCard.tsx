/*
 * Created on Sat Aug 19 2023
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
import RemixIcon from "react-native-remix-icon";
import { PurchasesStoreProduct } from "react-native-purchases";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import Button from "@/ui/Button";
import Information from "@/ui/Information";
import useEntitlementsStore from "@/state/entitlements";
import { useBottomSheets } from "@/providers/BottomSheet";
import SelectionCard from "@/ui/SelectionCard/SelectionCard";

import type { ProductId } from "@/types/interfaces/EntitlementInterfaces";

interface ProductCardProps {
  product: PurchasesStoreProduct;
  selected: boolean;
  onPress: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  selected,
  onPress,
}) => {
  // The bottom sheet provider to open the compare plans modal
  const { handlePresentModalPress } = useBottomSheets();

  // The Product ID
  const id = product.identifier as ProductId;
  // Whether or not a product is a subscription
  const isSubscription = product.productCategory === "SUBSCRIPTION";
  // Whether or not a product has a trial period (free trial)
  const hasTrialPeriod = product.introPrice !== null;
  // The length of a trial period (formatted as "3-day" or "1-week" etc.)
  // prettier-ignore
  const trialLength = `${product.introPrice?.periodNumberOfUnits}-${product.introPrice?.periodUnit.toLowerCase()}`;

  // The title of the product (should always exist, but just in case)
  const title = product.title ?? "No title";
  // The subtitle (price) of the product (should always exist, but just in case)
  // prettier-ignore
  const subtitle = `${product.priceString} ${isSubscription ? "/ mo" : ""}` ?? "No price";
  // The description of the product (whether or not it has a trial period)
  const description = isSubscription
    ? hasTrialPeriod
      ? `with ${trialLength} free trial`
      : "with no free trial"
    : "one-time purchase";

  // Pull the entitlement details from the store
  // prettier-ignore
  const entitlementDetails = useEntitlementsStore((state) => state.entitlementDetails);

  // Get the perks from the entitlement details
  const productPerks = entitlementDetails?.products[id]?.FEATURED_PERKS || [];

  // When the compare plans button is pressed, open the compare plans modal
  const onComparePlansPress = () => {
    handlePresentModalPress("PLAN_COMPARISON");
  };

  return (
    <SelectionCard
      hideChildrenWhenUnselected
      title={title}
      subtitle={subtitle}
      description={description}
      selected={selected}
      onPress={onPress}
    >
      {productPerks.map((perk, i) => (
        <ProductPerk {...perk} key={i} />
      ))}

      <Button
        size="sm"
        color={"gray"}
        style={tw`mt-2`}
        onPress={onComparePlansPress}
      >
        Compare Plans
      </Button>
    </SelectionCard>
  );
};

interface ProductPerkProps {
  active: boolean;
  name: string;
  description: string;
}

const ProductPerk: React.FC<ProductPerkProps> = ({
  active,
  name,
  description,
}) => {
  return (
    <View style={tw`flex-row items-center justify-between gap-2 mt-1`}>
      {/* The perk and checkmark icon */}
      <View style={tw`flex-row gap-2 shrink`}>
        <RemixIcon
          name="ri-checkbox-circle-line"
          color={tw.color("green-500")}
          size={20}
        />
        <Text style={tw`shrink`}>{name}</Text>
      </View>

      {/* The information to show more information */}
      <Information tooltip={description} size="sm" />
    </View>
  );
};

export default ProductCard;
