/*
 * Created on Sat Feb 24 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { useState } from "react";
import { View } from "react-native";
import ReactNativeModal from "react-native-modal";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import Button from "@/ui/Button";
import ButtonGroup from "@/ui/ButtonGroup";

export interface ModalProps {
  open: boolean;
  type: keyof typeof buttonColors;
  title: string;
  subtitle: string;
  primaryActionLabel?: string;
  secondaryActionLabel?: string;
  onPrimaryAction?: () => Promise<void>;
  onSecondaryAction?: () => Promise<void>;
  close: () => void;
}

const buttonColors = {
  error: {
    text: "text-white",
    background: "bg-red",
  },
  info: {
    text: "text-white",
    background: "bg-primary",
  },
  warning: {
    text: "text-black",
    background: "bg-yellow",
  },
};

const Modal: React.FC<ModalProps> = ({
  open,
  title,
  subtitle,
  primaryActionLabel,
  secondaryActionLabel,
  onPrimaryAction,
  onSecondaryAction,
  close,
  type = "info",
  ...props
}) => {
  type Loading = "primary" | "secondary" | "none";

  const [loading, setLoading] = useState<Loading>("none");

  const buttonBackground = buttonColors[type].background;
  const buttonTextColor = buttonColors[type].text;

  const containerClasses = tw.style(
    "bg-white p-5 rounded shadow-2xl items-start gap-6",
  );

  const onPrimaryActionHandler = async () => {
    setLoading("primary");
    await onPrimaryAction?.();
    setLoading("none");

    close();
  };

  const onSecondaryActionHandler = async () => {
    await onSecondaryAction?.();
    setLoading("none");

    close();
  };

  return (
    <ReactNativeModal
      {...props}
      isVisible={open}
      backdropOpacity={0.5}
      onBackdropPress={close}
      animationIn="zoomIn"
      animationOut="zoomOut"
    >
      <View style={containerClasses}>
        <View style={tw`gap-y-2`}>
          <Text variant="header">{title}</Text>
          <Text variant="body" style={tw`text-black`}>
            {subtitle}
          </Text>
        </View>

        <ButtonGroup>
          {secondaryActionLabel && (
            <Button
              size="sm"
              color="gray"
              style={tw`px-2`}
              loading={loading === "secondary"}
              onPress={onSecondaryActionHandler}
            >
              {secondaryActionLabel}
            </Button>
          )}

          {primaryActionLabel && (
            <Button
              size="sm"
              loading={loading === "primary"}
              style={tw.style(`px-2`, buttonBackground)}
              textStyle={tw.style(buttonTextColor)}
              onPress={onPrimaryActionHandler}
            >
              {primaryActionLabel}
            </Button>
          )}
        </ButtonGroup>
      </View>
    </ReactNativeModal>
  );
};

export default Modal;
