/*
 * Created on Sun Dec 24 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { useEffect } from "react";
import { View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import tw from "@/lib/tailwind";
import Header from "@/ui/Header";
import Layout from "@/ui/Layout";
import ActionCard from "@/ui/ActionCard";
import useEventsStore from "@/state/events";
import { formatEvent } from "@/lib/util/format";

interface EventDetailsProps {
  navigation: NativeStackNavigationProp<any>;
  route: any;
}

const EventDetails: React.FC<EventDetailsProps> = ({ navigation, route }) => {
  const paramEvent = route.params.event as Event;

  const addEvent = useEventsStore((state) => state.addEvent);
  const storedEvent = useEventsStore((state) => state.getEvent(paramEvent._id));

  const event = formatEvent(storedEvent || paramEvent);

  useEffect(() => {
    addEvent(paramEvent);
  }, []);

  const onCardPress = (field: keyof Event) => {
    return () =>
      // Navigate to the edit screen with the event and field to update
      (navigation.navigate as any)("EventEdit", {
        eventId: event?._id,
        field,
      });
  };

  return (
    <Layout scrollable gap={8} contentContainerStyle={tw`pb-6`}>
      <Layout.CustomHeader>
        <Header hasBackButton hasMenuButton title={event?.title} />
      </Layout.CustomHeader>

      {/* The basic details for the event */}
      <View style={tw`w-full flex-row gap-2`}>
        <ActionCard
          size="md"
          pressable={false}
          icon="ri-user-fill"
          title={`${event.totalResponses}`}
          subtitle="Total Event Responses"
        />
        <ActionCard
          size="md"
          pressable={false}
          icon="ri-user-follow-fill"
          title={`${event.yesCount}`}
          subtitle="Total Responded 'Yes'"
        />
      </View>

      <ActionCard pressable={false} title="Date" subtitle={event.day} />

      <ActionCard
        title="Location"
        subtitle={event.location}
        onPress={onCardPress("location")}
      />
      <ActionCard
        title="Start Time"
        subtitle={event.startTime}
        onPress={onCardPress("startDate")}
      />
      <ActionCard
        title="End Time"
        subtitle={event.endTime}
        onPress={onCardPress("endDate")}
      />
      <ActionCard
        title="Description"
        subtitle={event.description}
        onPress={onCardPress("description")}
      />
    </Layout>
  );
};

export default EventDetails;
