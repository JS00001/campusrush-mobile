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

import useSearch from "@/hooks/useSearch";
import { useEventStore, useModalStore } from "@/store";
import { useBottomSheets } from "@/providers/BottomSheet";
import { useDeleteEvent, useDeleteEvents } from "@/hooks/api/events";

import Event from "@/ui/Event";
import tw from "@/lib/tailwind";
import TextInput from "@/ui/TextInput";
import IconButton from "@/ui/IconButton";
import Content from "@/constants/content";
import ActionButton from "@/ui/ActionButton";
import Menu, { MenuAction } from "@/ui/Menu";
import InfiniteList from "@/components/InfiniteList";
import { DefaultEventLoader } from "@/ui/Event/Loaders";

const EventsView = () => {
  const { openModal } = useModalStore();
  const singleDeletionMutation = useDeleteEvent();
  const massDeletionMutation = useDeleteEvents();
  const { openBottomSheet } = useBottomSheets();
  const { events, isLoading, refetch, ...store } = useEventStore();

  const search = useSearch({
    data: events,
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
            await massDeletionMutation.mutateAsync();
            await refetch();
            // Empty the stores cache
            store.clear();
          },
        });
      },
    },
  ];

  const placeholder = `Search ${events.length || 0} Events`;

  const onDeleteEvent = async (event: Event) => {
    const res = await singleDeletionMutation.mutateAsync({ id: event._id });

    if ("error" in res) return;

    await refetch();

    Toast.show({
      type: "success",
      text1: "Deleted Event",
      text2: `${event.title} has been deleted`,
    });
  };

  const onNewEventPress = () => {
    openBottomSheet("CREATE_EVENT");
  };

  const onRefresh = async () => {
    await refetch();
  };

  const onEndReached = async () => {
    await store.fetchNextPage();
  };

  return (
    <>
      <ActionButton icon="ri-add-line" onPress={onNewEventPress} />

      <View style={tw`flex-row w-full gap-x-1`}>
        <TextInput
          autoCorrect={false}
          icon="ri-search-line"
          variant="alternate"
          placeholder={placeholder}
          value={search.query}
          onChangeText={search.setQuery}
          containerStyle={tw`flex-shrink`}
        />

        <Menu title="Filter By" actions={filterMenu}>
          <IconButton icon="ri-filter-3-fill" style={tw`flex-grow`} />
        </Menu>

        <Menu actions={moreMenu}>
          <IconButton icon="ri-more-fill" style={tw`flex-grow`} />
        </Menu>
      </View>

      <InfiniteList
        elementsDeletable
        data={events}
        loading={isLoading}
        onRefresh={onRefresh}
        onEndReached={onEndReached}
        onDeleteElement={onDeleteEvent}
        loadingComponent={<DefaultEventLoader />}
        emptyListTitle="No Events Found"
        emptyListSubtitle="Try changing your filters or creating a new event"
        renderItem={({ item: event }) => <Event event={event} />}
      />
    </>
  );
};

export default EventsView;
