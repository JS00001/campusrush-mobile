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
import InfoIcon from "@/assets/icons/Info";
import ButtonGroup from "@/ui/ButtonGroup";

const InfoModal: React.FC<ModalProps> = ({
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
      <InfoIcon />

      <Text variant="body" style={tw`text-center`}>
        {message}
      </Text>

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
            style={tw`bg-indigo-500 px-2`}
            onPress={onPrimaryButtonPress}
            textStyle={tw`text-white`}
          >
            {primaryButtonText}
          </Button>
        )}
      </ButtonGroup>
    </ModalWrapper>
  );
};

export default InfoModal;
