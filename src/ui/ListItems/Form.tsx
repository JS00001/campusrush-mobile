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

import { TouchableOpacity, View } from "react-native";

import type { IForm } from "@/types";

import Text from "@/ui/Text";
import Icon from "@/ui/Icon";
import tw from "@/lib/tailwind";
import date from "@/lib/util/date";
import IconLabel from "@/ui/IconLabel";
import { useBottomSheet } from "@/providers/BottomSheet";

interface FormProps {
  form: IForm;
}

const Form: React.FC<FormProps> = ({ form }) => {
  const { openBottomSheet } = useBottomSheet();

  const onPress = () => {
    openBottomSheet("FORM", { form });
  };

  const responseCount = form.responseCount || "No";
  const responseText = responseCount === 1 ? "response" : "responses";
  const lastResponseAt = form.lastResponseAt
    ? `Last response ${date.timeAgo(form.lastResponseAt)}`
    : "No responses yet";

  const containerStyles = tw.style(
    "flex-row gap-2 justify-between items-center",
    "p-5 rounded-xl relative bg-gray-100",
  );

  return (
    <TouchableOpacity onPress={onPress} style={containerStyles}>
      <View style={tw`flex-col gap-2`}>
        <View>
          <Text type="p3" style={tw`text-gray-500`}>
            {lastResponseAt}
          </Text>
          <Text type="h4" numberOfLines={1}>
            {form.title}
          </Text>
        </View>

        {/* Details */}
        <View style={tw`gap-2`}>
          <IconLabel
            size="sm"
            color="tertiary"
            iconName="ChatsCircle"
            subtitle={`${responseCount} ${responseText}`}
          />
          <IconLabel
            size="sm"
            color="tertiary"
            iconName="QuestionMark"
            subtitle={`${form.fields.length} questions`}
          />
        </View>
      </View>

      <Icon size={16} icon="CaretRight" />
    </TouchableOpacity>
  );
};

export default Form;
