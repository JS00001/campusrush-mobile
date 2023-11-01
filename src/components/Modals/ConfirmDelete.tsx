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
import ErrorIcon from "@/assets/icons/Error";

export interface ConfirmDeleteModalProps extends ModalProps {}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  open,
  close,
  message,
  onAction,
}) => {
  const onCancelPress = () => {
    close();
  };

  const onConfirmPress = () => {
    close();
    onAction?.();
  };

  return (
    <ModalWrapper open={open} close={close}>
      <ErrorIcon />

      <Text variant="body" style={tw`text-center`}>
        {message}
      </Text>

      <ButtonGroup>
        <Button size="sm" color="gray" style={tw`px-2`} onPress={onCancelPress}>
          No, Cancel
        </Button>
        <Button size="sm" style={tw`bg-red-500 px-2`} onPress={onConfirmPress}>
          Yes, Delete
        </Button>
      </ButtonGroup>
    </ModalWrapper>
  );
};

export default ConfirmDeleteModal;
