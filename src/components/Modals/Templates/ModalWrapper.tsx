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

import { View } from "react-native";
import Modal from "react-native-modal";

import type { ModalProps } from "../types";

import tw from "@/lib/tailwind";

interface ModalWrapperProps extends ModalProps {
  children: React.ReactNode;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({
  open,
  close,
  children,
  ...props
}) => {
  // Styling
  const containerClasses = tw.style(
    "bg-white pt-8 pb-6 px-6 rounded-[20px] shadow-md mx-4 items-center gap-y-6",
  );

  return (
    <Modal
      {...props}
      isVisible={open}
      backdropOpacity={0.2}
      onBackdropPress={close}
      animationIn="zoomIn"
      animationOut="zoomOut"
    >
      <View style={containerClasses}>{children}</View>
    </Modal>
  );
};

export default ModalWrapper;
