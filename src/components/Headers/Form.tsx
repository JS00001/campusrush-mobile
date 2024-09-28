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

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";

interface FormHeaderProps {
  style?: any;
  disableSave?: boolean;
  disableCancel?: boolean;
  onSave: () => void;
  onCancel: () => void;
}

const FormHeader: React.FC<FormHeaderProps> = ({
  style,
  disableSave,
  disableCancel,
  onSave,
  onCancel,
}) => {
  const containerStyles = tw.style(
    "flex-row justify-between items-center py-3 w-full",
    style,
  );

  const cancelTextStyles = tw.style(
    "text-primary",
    disableCancel && "disabled",
  );

  const saveTextStyles = tw.style("text-blue-600", disableSave && "disabled");

  return (
    <View style={containerStyles}>
      <TouchableOpacity onPress={onCancel} disabled={disableCancel}>
        <Text style={cancelTextStyles}>Cancel</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onSave} disabled={disableSave}>
        <Text style={saveTextStyles}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FormHeader;
