/*
 * Created on Sun Sep 10 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { useMemo } from "react";

import Layout from "@/ui/Layout";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import Text from "@/ui/Text";
import { Pressable, View } from "react-native";
import tw from "@/lib/tailwind";
import ActionCard from "@/ui/ActionCard";

interface AddPnmProps {
  innerRef: React.RefObject<any>;
  handleCloseModalPress: () => void;
}

const AddPnm: React.FC<AddPnmProps> = ({ innerRef, handleCloseModalPress }) => {
  // Memoized snap points (When the bottom sheet modal is open)
  const snapPoints = useMemo(() => ["60%"], []);

  return (
    <BottomSheetModal
      ref={innerRef}
      index={0}
      snapPoints={snapPoints}
      backdropComponent={() => (
        <Pressable
          style={tw`h-full w-full absolute bg-black opacity-20`}
          onPress={handleCloseModalPress}
        />
      )}
    >
      <Layout contentContainerStyle={tw`items-start`}>
        <View>
          <Text variant="title">Add a PNM</Text>
          <Text variant="body" style={tw`text-slate-600`}>
            Add a PNM to your chapter to keep track of their rush.
          </Text>
        </View>

        <ActionCard
          title="Add PNM Manually"
          subtitle="Add a PNMs info manually"
          icon="ri-user-voice-fill"
          onPress={() => console.log("Add PNM Manually")}
        />
        <ActionCard
          title="Add PNM from Contacts"
          subtitle="Add a PNM from your contacts"
          icon="ri-contacts-fill"
          onPress={() => console.log("Add PNM from Contacts")}
        />
        <ActionCard
          title="Display QR Code"
          subtitle="Have a PNM scan a QR code"
          icon="ri-qr-code-fill"
          onPress={() => console.log("Display QR Code")}
        />
      </Layout>
    </BottomSheetModal>
  );
};

export default AddPnm;
