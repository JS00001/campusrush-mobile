/*
 * Created on Mon Mar 18 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { useState } from "react";
import { View } from "react-native";

import Debug from "./Debug";
import Store from "./Store";
import Network from "./Network";
import Overrides from "./Overrides";
import type { BottomSheetProps } from "../@types";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import { useAuth } from "@/providers/Auth";
import { BottomSheet } from "@/ui/BottomSheet";
import SegmentedControl from "@/ui/SegmentedControl";
import BottomSheetContainer from "@/ui/BottomSheet/Container";

const Segments = [
  {
    label: "Net",
    title: "Network",
    subtitle: "Network requests and responses",
    component: <Network />,
  },
  {
    label: "Ovrd",
    title: "Overrides",
    subtitle: "Override user settings",
    component: <Overrides />,
  },
  {
    label: "Debug",
    title: "Debug",
    subtitle: "Debugging tools",
    component: <Debug />,
  },
  {
    label: "Store",
    title: "Store",
    subtitle: "Manage zustand persistent store",
    component: <Store />,
  },
];

const DeveloperToolsSheet: React.FC<BottomSheetProps> = ({ innerRef }) => {
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);

  const onSegmentChange = (event: any) => {
    setCurrentScreenIndex(event.nativeEvent.selectedSegmentIndex);
  };

  const CurrentSegment = Segments[currentScreenIndex];

  // Disable the first screen from scrolling, so we dont get the 'nested virtualized lists' warning
  const disableScroll = currentScreenIndex === 0;

  return (
    <BottomSheet enablePanDownToClose={false} innerRef={innerRef}>
      <BottomSheetContainer
        disableScroll={disableScroll}
        contentContainerStyle={tw`gap-y-6`}
      >
        <SegmentedControl
          values={Segments.map((segment) => segment.label)}
          selectedIndex={currentScreenIndex}
          onChange={onSegmentChange}
        />

        <View>
          <Text type="h1">{CurrentSegment.title}</Text>
          <Text>{CurrentSegment.subtitle}</Text>
        </View>

        {CurrentSegment.component}
      </BottomSheetContainer>
    </BottomSheet>
  );
};

export default DeveloperToolsSheet;
