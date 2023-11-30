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

import type { ModalProps } from "./types";
import ModalWrapper from "./Templates/ModalWrapper";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import Button from "@/ui/Button";
import ButtonGroup from "@/ui/ButtonGroup";
import UpgradeIcon from "@/assets/icons/Upgrade";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const UpgradeModal: React.FC<ModalProps> = ({
  open,
  close,
  message,
  secondaryButtonText,
  secondaryButtonAction,
}) => {
  const navigation = useNavigation();

  const onPrimaryButtonPress = () => {
    (navigation.navigate as any)("SettingsTab", {
      screen: "UpdateBilling",
      initial: false,
    });
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
        <Text variant="title">Upgrade to Access</Text>

        <Text variant="body" style={tw`text-center`}>
          {message}
        </Text>
      </View>

      <ButtonGroup>
        {secondaryButtonText && (
          <Button
            size="sm"
            style={tw`px-2`}
            onPress={onSecondaryButtonPress}
            color="gray"
          >
            {secondaryButtonText}
          </Button>
        )}

        <Button
          size="sm"
          style={tw`bg-primary px-2`}
          onPress={onPrimaryButtonPress}
          textStyle={tw`text-white`}
        >
          Upgrade
        </Button>
      </ButtonGroup>
    </ModalWrapper>
  );
};

export default UpgradeModal;
