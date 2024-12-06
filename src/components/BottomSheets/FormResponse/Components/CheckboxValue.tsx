/*
 * Created on Fri Dec 06 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import Checkbox from "expo-checkbox";
import { View } from "react-native";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";

interface CheckboxValueProps {
  fieldName: string;
  response: boolean;
}

const CheckboxValue: React.FC<CheckboxValueProps> = ({
  fieldName,
  response,
}) => {
  return (
    <View style={tw`rounded-xl gap-2 bg-gray-100 px-4 py-2`}>
      <Text type="p4" numberOfLines={2}>
        {fieldName}
      </Text>

      <View style={tw`gap-1`}>
        <View style={tw`flex-row gap-2 items-center`}>
          <Checkbox color={tw.color("primary")} value={response} disabled />
          <Text type="p2">Yes</Text>
        </View>
        <View style={tw`flex-row gap-2 items-center`}>
          <Checkbox color={tw.color("primary")} value={!response} disabled />
          <Text type="p2">No</Text>
        </View>
      </View>
    </View>
  );
};

export default CheckboxValue;
