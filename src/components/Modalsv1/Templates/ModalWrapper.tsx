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
    "bg-white p-5 rounded shadow-2xl mx-2 items-start gap-6",
  );

  return (
    <Modal
      {...props}
      isVisible={open}
      backdropOpacity={0.5}
      onBackdropPress={close}
      animationIn="zoomIn"
      animationOut="zoomOut"
    >
      <View style={containerClasses}>{children}</View>
    </Modal>
  );
};

export default ModalWrapper;
