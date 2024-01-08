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

import { ScrollView, View } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";

import Tabs from "@/ui/Tabs";
import Event from "@/ui/Event";

import tw from "@/lib/tailwind";
import KeyboardListener from "@/ui/KeyboardListener";
import useEventsList from "@/hooks/events/useEventsList";

const ExtensionPanel = forwardRef<ExtensionPanelRef, ExtensionPanelProps>(
  ({ setVisible, setEvent, animateMessageBox }: ExtensionPanelProps, ref) => {
    const { events } = useEventsList();
    const [activeTab, setActiveTab] = useState(0);

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

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={tw`overflow-visible`}
              contentContainerStyle={tw`gap-2`}
            >
              {events.map((event, index) => (
                <Event
                  key={index}
                  type="card"
                  event={event}
                  onPress={onEventPress}
                />
              ))}
            </ScrollView>
          </View>
        </BottomSheetModal>
      </KeyboardListener>
    );
  },
);

export default ExtensionPanel;
