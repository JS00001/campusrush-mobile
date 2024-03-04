/*
 * Created on Fri Nov 10 2023
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
import Information from "@/ui_v1/Information";

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
          color={tw.color("green")}
          size={20}
        />
        <Text style={tw`shrink`}>{name}</Text>
      </View>

      {/* The information to show more information */}
      <Information tooltip={description} size="sm" />
    </View>
  );
};

export default ProductPerk;
