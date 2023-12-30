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

import { PurchasesStoreProduct } from "react-native-purchases";

import tw from "@/lib/tailwind";
import Button from "@/ui/Button";
import { useAuth } from "@/providers/Auth";
import ProductPerk from "@/components/ProductPerk";
import useEntitlementsStore from "@/state/entitlements";
import { useBottomSheets } from "@/providers/BottomSheet";
import SelectionCard from "@/ui/SelectionCard/SelectionCard";

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
  const { customerData } = useAuth();
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
  // Whether or not the user has previously purchased a subscription
  // prettier-ignore
  const hasPreviousSubscription = Object.keys(customerData?.entitlements?.all ?? {}).length > 0;

  // The title of the product (should always exist, but just in case)
  const title = product.title || "No title";
  // The subtitle (price) of the product (should always exist, but just in case)
  // prettier-ignore
  const subtitle = `${product.priceString} ${isSubscription ? "/ year" : ""}` ?? "No price";
  // The description of the product (whether or not it has a trial period)
  const description = isSubscription
    ? hasPreviousSubscription
      ? "Unlock features to boost your recruitment"
      : hasTrialPeriod
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

export default ProductCard;
