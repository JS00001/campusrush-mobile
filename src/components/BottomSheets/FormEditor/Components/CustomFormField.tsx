/*
 * Created on Sat Nov 30 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import * as Haptic from "expo-haptics";
import { TouchableOpacity, View } from "react-native";
import { RenderItemParams } from "react-native-draggable-flatlist";

import type { IFormField } from "@/types";
import type { IndividualSheetName, IndividualSheetProps } from "../../@types";

import Icon from "@/ui/Icon";
import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import { FieldType } from "@/@types";
import { IconType } from "@/constants/icons";

type CustomFormFieldProps = (
  | RenderItemParams<IFormField>
  | { item: IFormField }
) & {
  onDelete?: (id: string) => void;
  onChange?: (id: string, value: Partial<IFormField>) => void;
  openBottomSheet?: <T extends IndividualSheetName>(
    name: T,
    props?: IndividualSheetProps[T],
  ) => void;
};

const CustomFormField: React.FC<CustomFormFieldProps> = ({
  item,
  onChange,
  onDelete,
  openBottomSheet,
  ...props
}) => {
  const icon: IconType = (() => {
    if (item.type === FieldType.LONGTEXT) return "Paragraph";
    else if (item.type === FieldType.CHECKBOX) return "CheckSquareOffset";
    return "TextAa";
  })();

  const onDeleteField = () => {
    onDelete?.(item.id);
  };

  const onEditField = () => {
    openBottomSheet?.("MANAGE_FORM_FIELD", {
      field: item,
      onFieldChange: (value) => {
        onChange?.(item.id, value);
      },
    });
  };

  const onPressIn = () => {
    if ("drag" in props) {
      Haptic.impactAsync(Haptic.ImpactFeedbackStyle.Medium);
      props.drag();
    }
  };

  const containerStyles = tw.style(
    "flex-row justify-between items-center gap-4 w-full",
    "p-3 rounded-xl bg-gray-100 my-1",
  );

  const formFieldName = item.required ? `${item.name} *` : item.name;

  return (
    <View style={containerStyles}>
      <View style={tw`gap-4 flex-row items-center shrink`}>
        <Icon icon={icon} size={20} color={tw.color("gray-500")} />
        <Text style={tw`text-primary shrink`}>{formFieldName}</Text>
      </View>

      <View style={tw`flex-row items-center gap-2`}>
        <TouchableOpacity onPress={onEditField}>
          <Icon size={16} icon="PencilLine" color={tw.color("gray-500")} />
        </TouchableOpacity>

        {onDelete && (
          <TouchableOpacity onPress={onDeleteField}>
            <Icon size={16} icon="Trash" color={tw.color("red-500")} />
          </TouchableOpacity>
        )}

        <TouchableOpacity onPressIn={onPressIn}>
          <Icon icon="DotsSixVertical" size={16} color={tw.color("gray-500")} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomFormField;
