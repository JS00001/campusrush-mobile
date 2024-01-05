/*
 * Created on Tue Oct 24, 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import type { ModalProps } from "./types";
import ModalWrapper from "./Templates/ModalWrapper";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import Button from "@/ui/Button";
import ButtonGroup from "@/ui/ButtonGroup";
import WarningIcon from "@/assets/icons/Warning";
import { View } from "react-native";

const WarningModal: React.FC<ModalProps> = ({
  open,
  close,
  message,
  primaryButtonText,
  primaryButtonAction,
  secondaryButtonText,
  secondaryButtonAction,
}) => {
  const onPrimaryButtonPress = () => {
    primaryButtonAction?.();
    close();
  };

  const onSecondaryButtonPress = () => {
    secondaryButtonAction?.();
    close();
  };

  return (
    <ModalWrapper open={open} close={close}>
      <WarningIcon />

      <Text variant="body" style={tw`text-center text-primary`}>
        {message}
      </Text>

      <View style={tw`w-full gap-y-2`}>
        {primaryButtonText && (
          <Button
            size="sm"
            style={tw`bg-yellow-500 px-2 rounded-full`}
            onPress={onPrimaryButtonPress}
            textStyle={tw`text-black`}
          >
            {primaryButtonText}
          </Button>
        )}

        {secondaryButtonText && (
          <Button
            size="sm"
            style={tw`px-2 rounded-full`}
            onPress={onSecondaryButtonPress}
            color="light"
          >
            {secondaryButtonText}
          </Button>
        )}
      </View>
    </ModalWrapper>
  );
};

export default WarningModal;
