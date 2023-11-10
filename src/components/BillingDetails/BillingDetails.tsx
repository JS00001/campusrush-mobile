/*
 * Created on Wed Sep 27 2023
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

import tw from "@/lib/tailwind";
import Button from "@/ui/Button";
import ProductPerk from "@/components/ProductPerk";
import { useBottomSheets } from "@/providers/BottomSheet";
import SelectionCard from "@/ui/SelectionCard/SelectionCard";

interface BillingDetailsProps {
  activeProducts: {
    title: string;
    subtitle: string;
    description: string;
    perks: {
      name: string;
      description: string;
      active: boolean;
    }[];
  }[];
}

const BillingDetails: React.FC<BillingDetailsProps> = ({ activeProducts }) => {
  // The bottom sheet provider to open the compare plans modal
  const { handlePresentModalPress } = useBottomSheets();

  // When the compare plans button is pressed, open the compare plans modal
  const onComparePlansPress = () => {
    handlePresentModalPress("PLAN_COMPARISON");
  };

  return (
    <View style={tw`w-full`}>
      {activeProducts.map((product) => (
        <SelectionCard
          key={product.title}
          pressable={false}
          title={product.title}
          subtitle={product.subtitle}
          description={product.description}
        >
          {product.perks.length > 0 &&
            product.perks.map((perk) => (
              <ProductPerk key={perk.name} {...perk} />
            ))}

          <Button
            size="sm"
            color="light"
            style={tw`mt-2`}
            onPress={onComparePlansPress}
          >
            Compare Plans
          </Button>
        </SelectionCard>
      ))}
    </View>
  );
};

export default BillingDetails;
