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
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { View } from "react-native";
import * as Haptic from "expo-haptics";
import Toast from "react-native-toast-message";
import { forwardRef, useImperativeHandle, useRef, Fragment } from "react";

import EventCard from "./Extensions/Event/Card";

import type {
  ExtensionPanelProps,
  ExtensionPanelRef,
} from "@/@types/message-box";
import type { IEvent } from "@/types";

import tw from "@/lib/tailwind";
import Tab from "@/ui/Tabs/Tab";
import Skeleton from "@/ui/Skeleton";
import Headline from "@/ui/Headline";
import AppConstants from "@/constants";
import useCamera from "@/hooks/useCamera";
import { useGetEvents } from "@/hooks/api/events";
import useCloudStorage from "@/hooks/useCloudStorage";
import ErrorMessage from "@/components/ErrorMessage";

const ExtensionPanel = forwardRef<ExtensionPanelRef, ExtensionPanelProps>(
  (
    {
      attachments,
      pendingAttachments,
      setVisible,
      setAttachments,
      setPendingAttachments,
    }: ExtensionPanelProps,
    ref,
  ) => {
    const camera = useCamera();
    const eventsQuery = useGetEvents();
    const cloudStorage = useCloudStorage();
    const bottomSheetRef = useRef<BottomSheetModal>(null);

    useImperativeHandle(ref, () => ({
      openPanel,
      closePanel,
    }));

    const events = eventsQuery.data?.events;

    const openPanel = () => {
      setVisible(true);
      Haptic.selectionAsync();
      bottomSheetRef.current?.present();
    };

    const closePanel = () => {
      setVisible(false);
      bottomSheetRef.current?.close();
    };

    const onEventPress = (event: IEvent) => {
      const eventURL = `${AppConstants.WebURL}/events/${event._id}`;

      setAttachments((attachments) => ({
        ...attachments,
        events: [eventURL],
      }));
    };

    const onImageAttach = (image: string) => {
      setAttachments((attachments) => ({
        ...attachments,
        images: [...attachments.images, image],
      }));
    };

    const onPhotosPress = async () => {
      const addedImages = attachments.images.length + pendingAttachments;
      const hasMaxImages = addedImages >= AppConstants.maxImages;

      if (hasMaxImages) {
        Toast.show({
          type: "error",
          text1: "Maximum Images",
          text2: `You can only attach ${AppConstants.maxImages} images per message`,
        });
        return;
      }

      const image = await camera.selectPhoto();

      if (!image) return;

      setPendingAttachments((pending) => pending + 1);

      const imageUrl = await cloudStorage.uploadImage(image);

      if (imageUrl) {
        onImageAttach(imageUrl);
      }

      setPendingAttachments((pending) => pending - 1);
    };

    const BackdropComponent = (props: any) => (
      <BottomSheetBackdrop {...props} opacity={0.5} onPress={closePanel} />
    );

    return (
      <BottomSheetModal
        ref={bottomSheetRef}
        index={0}
        snapPoints={[334, "90%"]}
        enablePanDownToClose={false}
        backdropComponent={BackdropComponent}
        backgroundStyle={tw`bg-white rounded-t-3xl`}
      >
        <View style={tw`px-3 pt-3 gap-y-3 flex-1`}>
          <View style={tw`flex-row gap-1`}>
            <Tab selected={true} label="Events" onPress={() => {}} />
            <Tab selected={false} label="Photos" onPress={onPhotosPress} />
          </View>

          {/* If the query is loading, show a loading skeleton */}
          {eventsQuery.isLoading && <Skeleton width={"100%"} height={212} />}

          {/* If the user has no events, show a message */}
          {!eventsQuery.isLoading && !events?.length && (
            <Headline
              centerText
              style={tw`mt-12`}
              title="No events found"
              subtitle="You have not added any events yet"
            />
          )}

          {/* Error State */}
          {eventsQuery.isError && (
            <ErrorMessage
              error={eventsQuery.error}
              description="Could not fetch events"
            />
          )}

          {/* If the user has events, show them */}
          {!!events?.length && (
            <BottomSheetScrollView showsVerticalScrollIndicator={false}>
              <View style={tw`bg-gray-100 rounded-xl mb-16`}>
                {events.map((event, index) => {
                  const isLast = index === events.length - 1;

                  return (
                    <Fragment key={event._id}>
                      <EventCard event={event} onPress={onEventPress} />
                      {!isLast && <View style={tw`h-[1px] bg-gray-200`} />}
                    </Fragment>
                  );
                })}
              </View>
            </BottomSheetScrollView>
          )}
        </View>
      </BottomSheetModal>
    );
  },
);

export default ExtensionPanel;
