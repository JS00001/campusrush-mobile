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
import RemixIcon from "react-native-remix-icon";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import SelectionCard from "@/ui/SelectionCard/SelectionCard";

interface BillingDetailsProps {
  activeProducts: {
    title: string;
    subtitle: string;
    description: string;
    perks: string[];
  }[];
}

const BillingDetails: React.FC<BillingDetailsProps> = ({ activeProducts }) => {
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
              <View key={perk} style={tw`flex-row gap-2`}>
                <RemixIcon
                  name="ri-check-line"
                  color={tw.color("primary")}
                  size={20}
                />
                <Text>{perk}</Text>
              </View>
            ))}
        </SelectionCard>
      ))}
    </View>
  );
};

export default BillingDetails;
