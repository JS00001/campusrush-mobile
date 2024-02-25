/*
 * Created on Wed Nov 1 2023
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
import { View } from "react-native";

const ErrorModal: React.FC<ModalProps> = ({
  open,
  close,
  title,
  subtitle,
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
      <View style={tw`gap-y-2`}>
        <Text variant="header">{title}</Text>

        <Text variant="body" style={tw`text-black`}>
          {subtitle}
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

        {primaryButtonText && (
          <Button
            size="sm"
            style={tw`bg-red px-2 rounded-md`}
            onPress={onPrimaryButtonPress}
          >
            {primaryButtonText}
          </Button>
        )}
      </ButtonGroup>
    </ModalWrapper>
  );
};

export default ErrorModal;
