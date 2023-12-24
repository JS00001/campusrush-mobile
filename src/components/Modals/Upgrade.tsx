/*
 * Created on Thu Nov 30 2023
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
import { useNavigation } from "@react-navigation/native";

import type { ModalProps } from "./types";
import ModalWrapper from "./Templates/ModalWrapper";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import Button from "@/ui/Button";
import UpgradeIcon from "@/assets/icons/Upgrade";

const UpgradeModal: React.FC<ModalProps> = ({
  open,
  close,
  message,
  primaryButtonAction,
  primaryButtonText,
  secondaryButtonText,
  secondaryButtonAction,
}) => {
  const navigation = useNavigation();

  const onPrimaryButtonPress = () => {
    if (!primaryButtonAction) {
      (navigation.navigate as any)("HomeTab", {
        screen: "UpdateBilling",
        initial: false,
      });
    } else {
      primaryButtonAction();
    }

    close();
  };

  const onSecondaryButtonPress = () => {
    secondaryButtonAction?.();
    close();
  };

  return (
    <ModalWrapper open={open} close={close}>
      <UpgradeIcon />

      <View style={tw`w-full items-center`}>
        <Text variant="title">Upgrade for More!</Text>

        <Text variant="body" style={tw`text-center`}>
          {message}
        </Text>
      </View>

      <View style={tw`w-full`}>
        {primaryButtonText && (
          <Button
            size="sm"
            style={tw`bg-primary px-2 rounded-full`}
            onPress={onPrimaryButtonPress}
            textStyle={tw`text-white`}
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

export default UpgradeModal;
