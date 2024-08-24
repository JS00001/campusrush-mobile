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

import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  Fragment,
} from "react";
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { View } from "react-native";
import * as Haptic from "expo-haptics";

import EventCard from "./Extensions/Event/Card";

import Tabs from "@/ui/Tabs";
import tw from "@/lib/tailwind";
import Skeleton from "@/ui/Skeleton";
import Headline from "@/ui/Headline";
import { useGetEvents } from "@/hooks/api/events";

const ExtensionPanel = forwardRef<ExtensionPanelRef, ExtensionPanelProps>(
  ({ setVisible, setAttachment }: ExtensionPanelProps, ref) => {
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
      setAttachment(event);
    };

    return (
      <BottomSheetModal
        ref={bottomSheetRef}
        index={0}
        snapPoints={[334, "90%"]}
        enablePanDownToClose={false}
        backgroundStyle={tw`rounded-none border-t border-slate-100`}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            opacity={0.5}
            {...props}
            onPress={() => setVisible(false)}
          />
        )}
      >
        <View style={tw`p-3 gap-y-3 flex-1`}>
          <Tabs
            options={["Events", "Photos", "Videos"]}
            currentIndex={activeTab}
            disabledIndex={[1, 2]}
            onChange={setActiveTab}
          />

          <BottomSheetScrollView contentContainerStyle={tw`flex-1 gap-3`}>
            {eventsQuery.isLoading && <Skeleton width={"100%"} height={212} />}
            {!eventsQuery.isLoading && !eventsQuery.events && (
              <Headline
                centerText
                style={tw`mt-12`}
                title="No events found"
                subtitle="You have not added any events yet"
              />
            )}

            {!eventsQuery.isLoading && eventsQuery.events && (
              <View style={tw`bg-slate-100 rounded-xl`}>
                {eventsQuery.events.map((event, index) => {
                  const isLast = index === eventsQuery.events.length - 1;

                  return (
                    <Fragment key={event._id}>
                      <EventCard event={event} onPress={onEventPress} />
                      {!isLast && <View style={tw`h-[1px] bg-slate-200`} />}
                    </Fragment>
                  );
                })}
              </View>
            )}
          </BottomSheetScrollView>
        </View>
      </BottomSheetModal>
    );
  },
);

export default ExtensionPanel;
