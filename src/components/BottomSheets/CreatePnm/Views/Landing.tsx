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

import { useModalStore } from "@/store";
import { useQonversion } from "@/providers/Qonversion";
import type { UseSheetFlowProps } from "@/hooks/useSheetFlow";

import tw from "@/lib/tailwind";
import ListItem from "@/ui/ListItem";
import Headline from "@/ui/Headline";
import Content from "@/constants/content";

const Landing: React.FC<UseSheetFlowProps> = ({
  nextView,
  setView,
  handleClose,
}) => {
  const { isPro } = useQonversion();
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
      <Headline
        style={tw`mb-2`}
        title="Add a PNM"
        subtitle="Add a PNM to your chapter to keep track of their rush."
      />

      <ListItem
        size="lg"
        title="Add PNM Manually"
        subtitle="Add a PNMs info manually"
        icon="user-voice-fill"
        onPress={nextView}
      />
      <ListItem
        size="lg"
        title="Share QR Code or Link"
        subtitle="Share a QR code with a PNM"
        icon="qr-code-fill"
        onPress={onQrCodePress}
      />
    </>
  );
};

export default Landing;
