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
import WarningIcon from "@/assets/icons/Warning";
import ButtonGroup from "@/ui/ButtonGroup";

export interface WarningModalProps extends ModalProps {
  buttonOneText?: string;
  buttonTwoText?: string;
}

const WarningModal: React.FC<WarningModalProps> = ({
  open,
  close,
  message,
  buttonOneText,
  buttonTwoText,
}) => {
  const isButtonGroup = buttonOneText || buttonTwoText;

  const onPress = () => {
    close();
  };

  return (
    <ModalWrapper open={open} close={close}>
      <WarningIcon />

      <Text variant="body" style={tw`text-center`}>
        {message}
      </Text>

      <ButtonGroup>
        {buttonOneText && (
          <Button size="sm" style={tw`px-2`} onPress={onPress} color="gray">
            {buttonOneText}
          </Button>
        )}

        {buttonTwoText && (
          <Button
            size="sm"
            style={tw`bg-yellow-500 px-2`}
            onPress={onPress}
            textStyle={tw`text-primary`}
          >
            {buttonTwoText}
          </Button>
        )}
      </ButtonGroup>
    </ModalWrapper>
  );
};

export default WarningModal;
