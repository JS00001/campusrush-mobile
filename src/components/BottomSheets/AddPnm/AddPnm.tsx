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

import { ScrollView, View } from "react-native";

import { AddPnmScreens } from "./types";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import ActionCard from "@/ui/ActionCard";

interface AddPnmProps {
  handleCloseModalPress: () => void;
  setScreen: (screen: AddPnmScreens) => void;
}

const AddPnm: React.FC<AddPnmProps> = ({
  setScreen,
  handleCloseModalPress,
}) => {
  const onAddPnmManuallyPress = () => {
    setScreen(AddPnmScreens.AddManualStep1);
  };

  const onAddPnmQrCodePress = () => {
    setScreen(AddPnmScreens.AddQrCode);
  };

  return (
    <ScrollView style={tw`p-6`} contentContainerStyle={tw`gap-y-2`}>
      <View>
        <Text variant="title">Add a PNM</Text>
        <Text variant="body">
          Add a PNM to your chapter to keep track of their rush.
        </Text>
      </View>

      <ActionCard
        title="Add PNM Manually"
        subtitle="Add a PNMs info manually"
        icon="ri-user-voice-fill"
        onPress={onAddPnmManuallyPress}
      />
      <ActionCard
        title="Share QR Code"
        subtitle="Share a QR code with a PNM"
        icon="ri-qr-code-fill"
        onPress={onAddPnmQrCodePress}
      />
    </ScrollView>
  );
};

export default AddPnm;
