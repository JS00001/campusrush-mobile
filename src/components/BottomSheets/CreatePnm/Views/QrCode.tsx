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

import Text from "@/ui_v1/Text";
import tw from "@/lib/tailwind";
import CopyItem from "@/ui_v1/CopyItem";
import AppConstants from "@/constants";
import { useAuth } from "@/providers/Auth";

const QrCode: React.FC<UseSheetFlowProps> = () => {
  const { chapter } = useAuth();

  const linkSharingCode = `${AppConstants.sharingUrl}/${chapter.linkSharingCode}`;

  return (
    <>
      <View style={tw`w-full`}>
        <Text variant="title">Display QR Code</Text>
        <Text variant="body">Have a PNM scan the QR code</Text>
      </View>

      <View style={tw`bg-slate-100 rounded-xl p-12 w-full items-center`}>
        <QRCode
          size={232}
          value={linkSharingCode}
          color={tw.color("primary")}
          backgroundColor="transparent"
        />
      </View>

      <Text variant="title" style={tw`self-center`}>
        Or
      </Text>

      <CopyItem label="Link Sharing URL" value={linkSharingCode} />
    </>
  );
};

export default QrCode;
