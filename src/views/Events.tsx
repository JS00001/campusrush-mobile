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

import { useMemo } from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";

import tw from "@/lib/tailwind";
import { alert } from "@/lib/util";
import FlatList from "@/ui/FlatList";
import Searchbox from "@/ui/Searchbox";
import { ChapterRole } from "@/@types";
import Event from "@/ui/ListItems/Event";
import IconButton from "@/ui/IconButton";
import useSearch from "@/hooks/useSearch";
import EventLoader from "@/ui/Loaders/Event";
import ActionButton from "@/ui/ActionButton";
import Menu, { MenuAction } from "@/ui/Menu";
import StickyHeader from "@/ui/StickyHeader";
import { useBottomSheetStore } from "@/store";
import RoleGuard from "@/components/RoleGuard";
import { useDeleteEvents, useGetEvents } from "@/hooks/api/events";

const EventsView = () => {
  const bottomSheetStore = useBottomSheetStore();

  const eventsQuery = useGetEvents();
  const deleteAllEventsMutation = useDeleteEvents();

  const events = eventsQuery.data?.events || [];

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
        alert({
          title: "Are you sure?",
          message: "All events will be permanently deleted.",
          buttons: [
            {
              style: "cancel",
              text: "No, Cancel",
            },
            {
              text: "Yes, Delete",
              style: "destructive",
              onPress: async () => {
                const eventCount = events.length;
                await deleteAllEventsMutation.mutateAsync();
                Toast.show({
                  type: "success",
                  text1: "All Events Deleted",
                  text2: `${eventCount} events have been deleted`,
                });
              },
            },
          ],
        });
      },
    },
  ];

  const placeholder = `Search ${events.length} Events`;

  /**
   * Create groupings of events by date, and extract
   * the indices of the sticky headers (the dates)
   */
  const [data, stickyHeaderIndices] = useMemo(() => {
    /**
     * Take the list of events and reduce them into a list like this:
     * {
     *  "Date": ['Feb 26 · Monday', event1, event2],
     *  "Date": ['Feb 27 · Tuesday', event3, event4],
     * }
     */
    const groupedEvents = search.data.reduce((accumulator, event) => {
      const startDate = new Date(event.startDate);
      const weekday = startDate.toLocaleString("en-US", { weekday: "long" });
      const date = startDate.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
      });

      const key = `${date} · ${weekday}`;

      if (accumulator[key]) {
        accumulator[key].push(event);
      } else {
        accumulator[key] = [key, event];
      }

      return accumulator;
    }, {});

    // Sort the keys by date, and flatten the list
    const sortedKeys = Object.keys(groupedEvents)
      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
      .flatMap((key) => groupedEvents[key]);

    // Get the indices of the sticky headers
    const stickyHeaderIndices = sortedKeys.reduce((indices, item, i) => {
      if (typeof item === "string") {
        indices.push(i);
      }

      return indices;
    }, []);

    return [sortedKeys, stickyHeaderIndices];
  }, [search.data]);

  const onNewEventPress = () => {
    bottomSheetStore.open("CREATE_EVENT");
  };

  const onRefresh = async () => {
    await eventsQuery.refetch();
  };

  return (
    <>
      <View style={tw`flex-row relative w-full gap-x-1`}>
        <Searchbox
          ph-label="search-events"
          autoCorrect={false}
          placeholder={placeholder}
          value={search.query}
          onChangeText={search.setQuery}
          contentContainerStyle={tw`flex-shrink`}
        />

        <Menu title="Filter By" actions={filterMenu}>
          <IconButton
            size="lg"
            color="secondary"
            iconName="FunnelSimple"
            style={tw`flex-grow`}
          />
        </Menu>

        <RoleGuard role={ChapterRole.Editor}>
          <Menu actions={moreMenu}>
            <IconButton
              size="lg"
              color="secondary"
              iconName="DotsThree"
              style={tw`flex-grow`}
            />
          </Menu>
        </RoleGuard>
      </View>

      <FlatList
        data={data}
        onRefresh={onRefresh}
        error={eventsQuery.error}
        errorDescription="Could not fetch events"
        emptyListTitle="No Events Found"
        emptyListSubtitle="Try changing your filters or creating a new event"
        loading={eventsQuery.isLoading}
        loadingComponent={<EventLoader />}
        stickyHeaderIndices={stickyHeaderIndices}
        renderItem={({ item: event }) => {
          if (typeof event === "string") {
            return <StickyHeader>{event}</StickyHeader>;
          }
          return <Event event={event} />;
        }}
      />

      <RoleGuard role={ChapterRole.Editor}>
        <ActionButton
          ph-label="create-event"
          icon="Plus"
          onPress={onNewEventPress}
        />
      </RoleGuard>
    </>
  );
};

export default EventsView;
