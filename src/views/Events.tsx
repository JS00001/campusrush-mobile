/*
 * Created on Mon Feb 26 2024
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
import Toast from "react-native-toast-message";

import {
  useDeleteEvent,
  useDeleteEvents,
  useGetEvents,
} from "@/hooks/api/events";
import useSearch from "@/hooks/useSearch";
import { useEventStore, useModalStore } from "@/store";
import { useBottomSheets } from "@/providers/BottomSheet";

import Event from "@/ui/Event";
import tw from "@/lib/tailwind";
import TextInput from "@/ui/TextInput";
import IconButton from "@/ui/IconButton";
import Content from "@/constants/content";
import EventLoader from "@/ui/Loaders/Event";
import ActionButton from "@/ui/ActionButton";
import Menu, { MenuAction } from "@/ui/Menu";
import FlatList from "@/ui/FlatList";

const EventsView = () => {
  const { openModal } = useModalStore();
  const { openBottomSheet } = useBottomSheets();

  const eventStore = useEventStore();
  const eventsQuery = useGetEvents();
  const deleteEventMutation = useDeleteEvent();
  const deleteAllEventsMutation = useDeleteEvents();

  const search = useSearch({
    data: eventsQuery.events,
    filters: [
      {
        id: "PAST",
        filterFn: (data) =>
          data.filter((event) => new Date(event.startDate) < new Date()),
      },
      {
        id: "UPCOMING",
        filterFn: (data) =>
          data.filter((event) => new Date(event.startDate) > new Date()),
      },
    ],
  });

  /**
   * Create the filter menu actions
   */
  const filterMenu: MenuAction[] = [
    {
      id: "NO_FILTER",
      title: "No Filter",
      image: "xmark",
      state: search.filter === "NO_FILTER" ? "on" : "off",
      onPress: () => search.setFilter("NO_FILTER"),
    },
    {
      id: "PAST",
      title: "Past Events",
      image: "calendar",
      state: search.filter === "PAST" ? "on" : "off",
      onPress: () => search.setFilter("PAST"),
    },
    {
      id: "UPCOMING",
      title: "Upcoming Events",
      image: "calendar",
      state: search.filter === "UPCOMING" ? "on" : "off",
      onPress: () => search.setFilter("UPCOMING"),
    },
  ];

  /**
   * Create the more menu actions
   */
  const moreMenu: MenuAction[] = [
    {
      id: "DELETE_ALL",
      title: "Delete All Events",
      image: "trash",
      attributes: { destructive: true },
      onPress: () => {
        openModal("error", {
          title: Content.confirmDeleteAllEvents.title,
          subtitle: Content.confirmDeleteAllEvents.subtitle,
          primaryActionLabel: "Yes, Delete",
          secondaryActionLabel: "No, Cancel",
          onPrimaryAction: async () => {
            await deleteAllEventsMutation.mutateAsync();
            await eventsQuery.refetch();
            // Empty the stores cache
            eventStore.clear();
          },
        });
      },
    },
  ];

  const placeholder = `Search ${eventsQuery.events.length || ""} Events`;

  const onNewEventPress = () => {
    openBottomSheet("CREATE_EVENT");
  };

  const onRefresh = async () => {
    await eventsQuery.refetch();
  };

  return (
    <>
      <View style={tw`flex-row w-full gap-x-1`}>
        <TextInput
          autoCorrect={false}
          icon="search-line"
          placeholder={placeholder}
          value={search.query}
          onChangeText={search.setQuery}
          contentContainerStyle={tw`flex-shrink`}
        />

        <Menu title="Filter By" actions={filterMenu}>
          <IconButton
            color="secondary"
            iconName="filter-3-fill"
            style={tw`flex-grow`}
          />
        </Menu>

        <Menu actions={moreMenu}>
          <IconButton
            color="secondary"
            iconName="more-fill"
            style={tw`flex-grow`}
          />
        </Menu>
      </View>

      <FlatList
        data={search.data}
        onRefresh={onRefresh}
        loadingComponent={<EventLoader />}
        loading={eventsQuery.isLoading}
        emptyListTitle="No Events Found"
        emptyListSubtitle="Try changing your filters or creating a new event"
        renderItem={({ item: event }) => {
          const handlePress = () => {
            openBottomSheet("EVENT", {
              eventId: event._id,
            });
          };

          return <Event event={event} onPress={handlePress} />;
        }}
      />

      <ActionButton icon="add-line" onPress={onNewEventPress} />
    </>
  );
};

export default EventsView;
