/*
 * Created on Sun Sep 17 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import Layout from "@/ui/Layout";
import Header from "@/ui/Header";
import { View } from "react-native";
import tw from "@/lib/tailwind";
import { useState } from "react";
import InfiniteCarousel from "@/ui/InfiniteCarousel";
import Text from "@/ui/Text";
import Button from "@/ui/Button";
import useModalsStore from "@/statev1/modals";
import { useModalStore } from "@/store";

interface UITestingProps {
  navigation: NativeStackNavigationProp<any>;
}

const UITesting: React.FC<UITestingProps> = ({ navigation }) => {
  const { openModal } = useModalStore();

  const openErrorModal = () => {
    openModal("error", {
      title: "Error",
      subtitle: "An error occurred",
    });
  };

  const openInfoModal = () => {
    openModal("info", {
      title: "Info",
      subtitle: "An info message",
    });
  };

  const openWarningModal = () => {
    openModal("warning", {
      title: "Warning",
      subtitle: "A warning message",
    });
  };

  const openErrorWithActionsModal = () => {
    openModal("error", {
      title: "Error",
      subtitle: "An error occurred",
      primaryActionLabel: "Retry",
      secondaryActionLabel: "Go Back",
      onPrimaryAction: async () => console.log("Retry"),
      onSecondaryAction: async () => console.log("Go Back"),
    });
  };

  const openInfoWithActionsModal = () => {
    openModal("info", {
      title: "Info",
      subtitle: "An info message",
      primaryActionLabel: "Continue",
      secondaryActionLabel: "Go Back",
      onPrimaryAction: async () => console.log("Continue"),
      onSecondaryAction: async () => console.log("Go Back"),
    });
  };

  const openWarningWithActionsModal = () => {
    openModal("warning", {
      title: "Warning",
      subtitle: "A warning message",
      primaryActionLabel: "Continue",
      secondaryActionLabel: "Go Back",
      onPrimaryAction: async () => console.log("Continue"),
      onSecondaryAction: async () => console.log("Go Back"),
    });
  };

  return (
    <Layout gap={12} contentContainerStyle={tw`pl-4 pr-0`}>
      <Layout.CustomHeader>
        <Header hasBackButton hasMenuButton title="Admin" />
      </Layout.CustomHeader>

      <Button onPress={openErrorModal}>Open Error Modal</Button>
      <Button onPress={openInfoModal}>Open Info Modal</Button>
      <Button onPress={openWarningModal}>Open Warning Modal</Button>
      <Button onPress={openErrorWithActionsModal}>
        Open Error Modal with Actions
      </Button>
      <Button onPress={openInfoWithActionsModal}>
        Open Info Modal with Actions
      </Button>
      <Button onPress={openWarningWithActionsModal}>
        Open Warning Modal with Actions
      </Button>
    </Layout>
  );
};

export default UITesting;
