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
import QRCode from "react-native-qrcode-svg";

import { AddPnmScreens } from "./types";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import Layout from "@/ui/Layout";
import CopyItem from "@/ui/CopyItem";
import { WEB_URL } from "@/api/constants";
import { useAuth } from "@/providers/Auth";

interface AddQrCodeScreenProps {
  handleCloseModalPress: () => void;
  setScreen: (screen: AddPnmScreens) => void;
}

const AddQrCodeStep: React.FC<AddQrCodeScreenProps> = ({}) => {
  const { organization } = useAuth();

  const linkSharingCode = `${WEB_URL}/${organization.linkSharingCode}`;

  return (
    <Layout scrollable gap={16}>
      <View style={tw`w-full`}>
        <Text variant="title">Display QR Code</Text>
        <Text variant="body">Have a PNM scan the QR code</Text>
      </View>

      <View style={tw`bg-slate-100 rounded-md p-12 w-full items-center`}>
        <QRCode
          size={232}
          value={linkSharingCode}
          color={tw.color("primary")}
          backgroundColor="transparent"
        />
      </View>

      <Text variant="title">Or</Text>

      <CopyItem label="Link Sharing URL" value={linkSharingCode} />
    </Layout>
  );
};

export default AddQrCodeStep;
