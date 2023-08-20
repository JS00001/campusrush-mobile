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

  return (
    <SelectionCard
      hideChildrenWhenUnselected
      title={title}
      subtitle={subtitle}
      description={description}
      selected={selected}
      onPress={onPress}
    />
  );
};

export default ProductCard;
