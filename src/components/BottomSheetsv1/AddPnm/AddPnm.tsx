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

import { View } from "react-native";

import { AddPnmScreens } from "./types";

import Text from "@/ui/Text";
import ActionCard from "@/ui/ActionCard";
import Content from "@/constants/content";
import { useAuth } from "@/providers/Auth";
import useModalsStore from "@/statev1/modals";

interface AddPnmProps {
  handleCloseModalPress: () => void;
  setScreen: (screen: AddPnmScreens) => void;
}

const AddPnm: React.FC<AddPnmProps> = ({
  setScreen,
  handleCloseModalPress,
}) => {
  const { isPro } = useAuth();
  const { openModal } = useModalsStore();

  const onAddPnmManuallyPress = () => {
    setScreen(AddPnmScreens.AddManualStep1);
  };

  const onAddPnmQrCodePress = () => {
    if (isPro) {
      setScreen(AddPnmScreens.AddQrCode);
      return;
    }

    openModal({
      name: "UPGRADE",
      props: {
        subtitle: Content.addPNM.shareQRCodeUpgrade,
      },
    });

    handleCloseModalPress();
  };

  return (
    <>
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
        enforceProPlan
        title="Share QR Code or Link"
        subtitle="Share a QR code with a PNM"
        icon="ri-qr-code-fill"
        onPress={onAddPnmQrCodePress}
      />
    </>
  );
};

export default AddPnm;
