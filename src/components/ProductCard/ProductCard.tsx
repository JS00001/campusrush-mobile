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

import { Product } from "react-native-qonversion";

import tw from "@/lib/tailwind";
import Button from "@/ui/Button";
import { useEntitlementStore } from "@/store";
import ProductPerk from "@/components/ProductPerk";
import { useBottomSheets } from "@/providers/BottomSheet";
import SelectionCard from "@/ui_v1/SelectionCard/SelectionCard";

interface ProductCardProps {
  product: Product;
  selected: boolean;
  onPress: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  selected,
  onPress,
}) => {
  const { openBottomSheet } = useBottomSheets();
  const entitlements = useEntitlementStore((s) => s.entitlements);

  const hasTrialPeriod = product.trialPeriod !== null;
  const trialLength = `${product.trialPeriod
    ?.unitCount}-${product.trialPeriod?.unit.toLowerCase()}`;

  const title = product.skProduct?.localizedTitle;
  const subtitle = `${
    product.prettyPrice
  } /${product.subscriptionPeriod?.unit.toLowerCase()}`;
  const description = hasTrialPeriod
    ? `with ${trialLength} free trial`
    : `Unlock features to boost your recruitment`;

  const productPerks =
    entitlements?.products[product.storeID as any]?.FEATURED_PERKS || [];

  const onComparePlansPress = () => {
    openBottomSheet("PLAN_COMPARISON");
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
