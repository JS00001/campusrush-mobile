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

import { View } from "react-native";
import { useEffect, useRef, useState } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import Debug from "./Debug";
import Store from "./Store";
import Network from "./Network";
import Overrides from "./Overrides";
import Websocket from "./Websocket";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import { useAuth } from "@/providers/Auth";
import { BottomSheet } from "@/ui/BottomSheet";
import { listenForShake } from "@/lib/util/shake";
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
  {
    label: "Ws",
    title: "Websocket",
    subtitle: "Websocket messages and connections",
    component: <Websocket />,
  },
];

const DeveloperTools = () => {
  const { chapter } = useAuth();
  const sheetRef = useRef<BottomSheetModal>(null);

  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);

  const openDeveloperTools = () => {
    sheetRef.current?.present();
  };

  const onSegmentChange = (event: any) => {
    setCurrentScreenIndex(event.nativeEvent.selectedSegmentIndex);
  };

  const CurrentSegment = Segments[currentScreenIndex];

  // Disable the first screen from scrolling, so we dont get the 'nested virtualized lists' warning
  const disableScroll = currentScreenIndex === 0;

  /**
   * When the screen is shaken, open the developer tools
   */
  useEffect(() => {
    if (__DEV__ || chapter.role === "admin") {
      const subscription = listenForShake(() => {
        openDeveloperTools();
      });

      return () => {
        subscription.remove();
      };
    }
  }, [chapter.role]);

  return (
    <BottomSheet enablePanDownToClose={false} innerRef={sheetRef}>
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

export default DeveloperTools;
