/*
 * Created on Mon Dec 09 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { z } from "zod";
import { View } from "react-native";

import Icon from "@/ui/Icon";
import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import Button from "@/ui/Button";
import Headline from "@/ui/Headline";
import FormField from "@/ui/FormField";
import { useGetMetadata } from "@/hooks/api/external";
import useFormMutation from "@/hooks/useFormMutation";
import { UseSheetFlowProps } from "@/hooks/useSheetFlow";
import { usePurchasePhoneNumber } from "@/hooks/api/billing";
import useKeyboardListener from "@/hooks/useKeyboardListener";

const Purchase: React.FC<UseSheetFlowProps> = ({
  nextView,
  snapToIndex,
  snapToPosition,
}) => {
  const metadata = useGetMetadata();
  const mutation = usePurchasePhoneNumber();

  const areaCodeData = metadata.data?.areaCodes || {};
  const areaCodes = Object.keys(areaCodeData) as [string, ...string[]];

  const form = useFormMutation({
    mutation,
    validators: {
      areaCode: z.enum(areaCodes, {
        message: "Unsupported area code",
      }),
    },
    onSuccess: async () => {
      nextView();
    },
  });

  useKeyboardListener({
    onKeyboardWillShow: () => {
      snapToPosition("75%");
    },
    onKeyboardWillHide: () => {
      snapToIndex(0);
    },
  });

  const areaCodeState = areaCodeData[form.state.areaCode.value];

  return (
    <View style={tw`gap-4`}>
      <Headline
        title="Setup Your Chapter's Phone Number"
        subtitle="Enter the area code you'd like to use for your chapter's phone number. This cannot be changed."
      />

      <FormField
        placeholder="Area Code (e.g., 368)"
        value={form.state.areaCode.value}
        error={form.state.areaCode.error}
        onChangeText={form.setValue.bind(null, "areaCode")}
      />

      {areaCodeState && (
        <View style={tw`items-center flex-row gap-1`}>
          <Icon icon="MapPinSimple" size={16} color={tw.color("gray-500")} />
          <Text type="p4">Location: {areaCodeState}</Text>
        </View>
      )}

      <Button loading={form.loading} onPress={form.handleSubmission}>
        Activate Number
      </Button>
    </View>
  );
};

export default Purchase;
