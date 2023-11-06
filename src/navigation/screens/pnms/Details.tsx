/*
 * Created on Sat Oct 21 2023
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
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import date from "@/lib/date";
import tw from "@/lib/tailwind";
import Layout from "@/ui/Layout";
import usePnmsStore from "@/state/pnms";
import ActionCard from "@/ui/ActionCard";
import ChatHeader from "@/components/ChatHeader";
import { formatPhoneNumber } from "@/lib/format";

interface PnmDetailsProps {
  navigation: NativeStackNavigationProp<any>;
  route: any;
}

const PnmDetails: React.FC<PnmDetailsProps> = ({ navigation, route }) => {
  // The PNM to get details for
  const pnmId = route.params.pnmId as string;
  // Get the PNM from the store
  const pnm = usePnmsStore((state) => state.getPnm(pnmId));

  // When an item is pressed, navigate to the update details screen
  const onCardPress = (field: keyof PNM) => {
    return () =>
      // Navigate to the update details screen with the pnm and field to update
      (navigation.navigate as any)("PNMUpdateDetails", {
        pnmId: pnm?._id,
        field,
      });
  };

  // If there is no pnm, go back as we cannot display details
  if (!pnm) {
    navigation.goBack();
    return <View />;
  }

  return (
    <Layout scrollable gap={8} contentContainerStyle={tw`pb-6`}>
      <Layout.CustomHeader>
        <ChatHeader pnms={[pnm]} />
      </Layout.CustomHeader>

      {/* The basic details for the PNM */}
      <ActionCard
        title="First Name"
        subtitle={pnm.firstName || "N/A"}
        onPress={onCardPress("firstName")}
      />
      <ActionCard
        title="Last Name"
        subtitle={pnm.lastName || "N/A"}
        onPress={onCardPress("lastName")}
      />
      <ActionCard
        title="Phone Number"
        subtitle={formatPhoneNumber(pnm.phoneNumber) || "N/A"}
        onPress={onCardPress("phoneNumber")}
      />
      <ActionCard
        title="Classification"
        subtitle={pnm.classification || "N/A"}
        onPress={onCardPress("classification")}
      />
      <ActionCard
        title="Instagram"
        subtitle={pnm.instagram || "N/A"}
        onPress={onCardPress("instagram")}
      />
      <ActionCard
        title="Snapchat"
        subtitle={pnm.snapchat || "N/A"}
        onPress={onCardPress("snapchat")}
      />

      {/* The time details for the PNM */}
      <View style={tw`w-full flex-row gap-3`}>
        <ActionCard
          pressable={false}
          size="sm"
          title="Added On"
          subtitle={date.toString(pnm.createdAt) || "N/A"}
          icon="ri-calendar-check-fill"
        />

        <ActionCard
          pressable={false}
          size="sm"
          title="Last Updated"
          subtitle={date.toString(pnm.updatedAt) || "N/A"}
          icon="ri-calendar-check-fill"
        />
      </View>
    </Layout>
  );
};

export default PnmDetails;
