/*
 * Created on Sun Dec 24 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { TouchableOpacity, View } from "react-native";

import Text from "@/ui_v1/Text";
import tw from "@/lib/tailwind";

interface FormHeaderProps {
  onCancel: () => void;
  onSave: () => void;
  style?: any;
}

const FormHeader: React.FC<FormHeaderProps> = ({ onCancel, onSave, style }) => {
  const containerStyles = tw.style(
    "flex-row justify-between items-center py-3 w-full",
    style,
  );

  return (
    <View style={containerStyles}>
      <TouchableOpacity onPress={onCancel}>
        <Text variant="body" style={tw`text-primary`}>
          Cancel
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onSave}>
        <Text variant="body" style={tw`text-blue-600`}>
          Save
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FormHeader;
