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

  const linkSharingCode = `${AppConstants.sharingUrl}/${chapter.linkSharingCode}`;

  return (
    <>
      <View style={tw`w-full`}>
        <Text type="h2">Display QR Code</Text>
        <Text>Have a PNM scan the QR code</Text>
      </View>

      <View style={tw`bg-slate-100 rounded-xl p-12 w-full items-center`}>
        <QRCode
          size={232}
          value={linkSharingCode}
          color={tw.color("primary")}
          backgroundColor="transparent"
        />
      </View>

      <Text type="h2" style={tw`self-center`}>
        Or
      </Text>

      <CopyView title="Link Sharing URL" content={linkSharingCode} />
    </>
  );
};

export default QrCode;
