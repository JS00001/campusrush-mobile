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
import { Pressable, ScrollView } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";

interface HelpProps {
  innerRef: React.RefObject<any>;
  handleCloseModalPress: () => void;
}

const Help: React.FC<HelpProps> = ({ innerRef, handleCloseModalPress }) => {
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
      <ScrollView style={tw`p-6`} contentContainerStyle={tw`gap-y-2`}>
        <Text>Help</Text>
      </ScrollView>
    </BottomSheetModal>
  );
};

export default Help;
