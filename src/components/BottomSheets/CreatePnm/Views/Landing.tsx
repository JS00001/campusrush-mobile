/*
 * Created on Sun Feb 25 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { View } from "react-native";

import type { UseSheetFlowProps } from "@/hooks/useSheetFlow";

import Text from "@/ui_v1/Text";
import { useModalStore } from "@/store";
import ActionCard from "@/ui_v1/ActionCard";
import Content from "@/constants/content";
import { useAuth } from "@/providers/Auth";

const Landing: React.FC<UseSheetFlowProps> = ({
  nextView,
  setView,
  handleClose,
}) => {
  const { isPro } = useAuth();
  const { openModal } = useModalStore();

  const onQrCodePress = () => {
    if (isPro) {
      setView(4);
      return;
    }

    handleClose();
    openModal("info", {
      subtitle: Content.addPNM.shareQRCodeUpgrade,
    });
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
        onPress={nextView}
      />
      <ActionCard
        enforceProPlan
        title="Share QR Code or Link"
        subtitle="Share a QR code with a PNM"
        icon="ri-qr-code-fill"
        onPress={onQrCodePress}
      />
    </>
  );
};

export default Landing;
