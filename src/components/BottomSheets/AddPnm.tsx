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
import { Pressable } from "react-native";
import tw from "@/lib/tailwind";

interface AddPnmProps {
  innerRef: React.RefObject<any>;
  handleCloseModalPress: () => void;
}

const AddPnm: React.FC<AddPnmProps> = ({ innerRef, handleCloseModalPress }) => {
  // Memoized snap points (When the bottom sheet modal is open)
  const snapPoints = useMemo(() => ["75%"], []);

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
      <Layout>
        <Text>Add Pnm</Text>
      </Layout>
    </BottomSheetModal>
  );
};

export default AddPnm;
