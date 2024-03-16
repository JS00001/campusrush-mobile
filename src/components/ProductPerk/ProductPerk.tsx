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

import Text from "@/ui/Text";
import Icon from "@/ui/Icon";
import tw from "@/lib/tailwind";
import Information from "@/ui/Information";

interface ProductPerkProps {
  name: string;
  description: string;
}

const ProductPerk: React.FC<ProductPerkProps> = ({ name, description }) => {
  return (
    <View style={tw`flex-row items-center justify-between gap-2 mt-1`}>
      {/* The perk and checkmark icon */}
      <View style={tw`flex-row gap-2 shrink`}>
        <Icon size={20} color={tw.color("green")} name="checkbox-circle-line" />
        <Text type="p3" style={tw`shrink`}>
          {name}
        </Text>
      </View>

      {/* The information to show more information */}
      <Information tooltip={description} size="sm" />
    </View>
  );
};

export default ProductPerk;
