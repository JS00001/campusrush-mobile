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
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";

import Tabs from "@/ui/Tabs";
import Event from "@/ui/Event";

import tw from "@/lib/tailwind";
import { useGetEvents } from "@/hooks/api/events";
import { CardEventLoader } from "@/ui/Event/Loaders";
import KeyboardListener from "@/ui/KeyboardListener";
import InfiniteHorizontaList from "@/components/InfiniteHorizontalList";

const ExtensionPanel = forwardRef<ExtensionPanelRef, ExtensionPanelProps>(
  ({ setVisible, setEvent, animateMessageBox }: ExtensionPanelProps, ref) => {
    const [activeTab, setActiveTab] = useState(0);

    const eventsQuery = useGetEvents();
    const bottomSheetRef = useRef<BottomSheetModal>(null);

    useImperativeHandle(ref, () => ({
      openPanel,
      closePanel,
    }));

    const openPanel = () => {
      setVisible(true);
      bottomSheetRef.current?.present();
    };

    const closePanel = () => {
      setVisible(false);
      bottomSheetRef.current?.close();
    };

    const onKeyboardWillShow = () => {
      closePanel();
      animateMessageBox(0, 200);
    };

    const onEventPress = (event: Event) => {
      setEvent(event);
    };

    const onEndReached = async () => {
      await eventsQuery.fetchNextPage();
    };

    return (
      <KeyboardListener onKeyboardWillShow={onKeyboardWillShow}>
        <BottomSheetModal
          ref={bottomSheetRef}
          index={0}
          snapPoints={[328]}
          enablePanDownToClose={false}
          backgroundStyle={tw`rounded-none`}
        >
          <View style={tw`p-3 gap-4 flex-1 pb-20`}>
            <Tabs
              selectedIndex={activeTab}
              options={["Events", "Photos", "Videos"]}
              disabledIndexes={[1, 2]}
              onChange={setActiveTab}
            />

            <InfiniteHorizontaList
              data={eventsQuery.events}
              loading={eventsQuery.isLoading}
              onEndReached={onEndReached}
              loadingComponent={<CardEventLoader />}
              emptyListTitle="No Events Found"
              emptyListSubtitle="Try creating a new event"
              renderItem={({ item: event }) => (
                <Event type="card" event={event} onPress={onEventPress} />
              )}
            />
          </View>
        </BottomSheetModal>
      </KeyboardListener>
    );
  },
);

export default ExtensionPanel;
