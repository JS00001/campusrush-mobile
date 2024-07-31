/*
 * Created on Sun Jan 07 2024
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
import * as Haptic from "expo-haptics";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";

import EventCard from "./Extensions/Event/Card";
import { EventCardLoader } from "./Extensions/Event/Card";

import Tabs from "@/ui/Tabs";
import tw from "@/lib/tailwind";
import FlatList from "@/ui/FlatList";
import { useGetEvents } from "@/hooks/api/events";

const ExtensionPanel = forwardRef<ExtensionPanelRef, ExtensionPanelProps>(
  ({ setVisible, setEvent }: ExtensionPanelProps, ref) => {
    const [activeTab, setActiveTab] = useState(0);

    const eventsQuery = useGetEvents();
    const bottomSheetRef = useRef<BottomSheetModal>(null);

    useImperativeHandle(ref, () => ({
      openPanel,
      closePanel,
    }));

    const openPanel = () => {
      setVisible(true);
      Haptic.selectionAsync();
      bottomSheetRef.current?.present();
    };

    const closePanel = () => {
      setVisible(false);
      bottomSheetRef.current?.close();
    };

    const onEventPress = (event: Event) => {
      setEvent(event);
    };

    return (
      <BottomSheetModal
        ref={bottomSheetRef}
        index={0}
        snapPoints={[334]}
        enablePanDownToClose={false}
        backgroundStyle={tw`rounded-none`}
      >
        <View style={tw`pl-3 pt-3 gap-4 flex-1 pb-12`}>
          <Tabs
            options={["Events", "Photos", "Videos"]}
            currentIndex={activeTab}
            disabledIndex={[1, 2]}
            onChange={setActiveTab}
          />

          <FlatList
            horizontal
            style={tw`flex-1`}
            data={eventsQuery.events}
            loading={eventsQuery.isLoading}
            loadingComponent={<EventCardLoader />}
            emptyListTitle="No Events Found"
            emptyListSubtitle="Try creating a new event"
            renderItem={({ item: event }) => (
              <EventCard event={event} onPress={onEventPress} />
            )}
          />
        </View>
      </BottomSheetModal>
    );
  },
);

export default ExtensionPanel;
