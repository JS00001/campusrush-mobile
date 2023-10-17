/*
 * Created on Mon Oct 16 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import tw from "@/lib/tailwind";
import { ScrollView, View } from "react-native";

import { AddPnmScreens } from "./types";

import Text from "@/ui/Text";

interface AddQrCodeScreenProps {
  handleCloseModalPress: () => void;
  setScreen: (screen: AddPnmScreens) => void;
}

const AddQrCodeStep: React.FC<AddQrCodeScreenProps> = ({
  setScreen,
  handleCloseModalPress,
}) => {
  return (
    <ScrollView style={tw`p-6`} contentContainerStyle={tw`gap-y-4`}>
      <View>
        <Text variant="title">Display QR Code</Text>
        <Text variant="body">Have a PNM scan a QR code</Text>
      </View>
    </ScrollView>
  );
};

export default AddQrCodeStep;
