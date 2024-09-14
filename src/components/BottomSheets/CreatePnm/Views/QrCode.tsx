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
import QRCode from "react-native-qrcode-svg";

import type { UseSheetFlowProps } from "@/hooks/useSheetFlow";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import CopyView from "@/ui/CopyView";
import AppConstants from "@/constants";
import { useAuth } from "@/providers/Auth";

const QrCode: React.FC<UseSheetFlowProps> = () => {
  const { chapter } = useAuth();

  const linkSharingCode = `${AppConstants.sharingUrl}/${chapter.linkSharing.code}`;

  const QRContainerStyles = tw.style(
    "w-full items-center",
    "bg-slate-100 rounded-xl p-10",
  );

  return (
    <>
      <View style={tw`w-full`}>
        <Text type="h3">Share a Form</Text>
        <Text>Send the QR code below to PNMs, or share the link below. </Text>
      </View>

      <View style={QRContainerStyles}>
        <QRCode
          size={264}
          value={linkSharingCode}
          color={tw.color("primary")}
          backgroundColor="transparent"
        />
      </View>

      <Text type="h3" style={tw`self-center`}>
        Or
      </Text>
      <CopyView title="Form URL" content={linkSharingCode} />
    </>
  );
};

export default QrCode;
