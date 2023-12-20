/*
 * Created on Sun Oct 22 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { useEffect, useState } from "react";
import { MenuAction } from "@react-native-menu/menu";
import { useInfiniteQuery } from "@tanstack/react-query";

import eventsApi from "@/api/api/events";
import { useAuth } from "@/providers/Auth";
import useEventsStore from "@/state/events";

export enum EventsFilter {
  NoFilter = "NO_FILTER",
  Upcoming = "UPCOMING",
  Past = "PAST",
}

export enum EventsOtherOption {
  DeleteAll = "DELETE_ALL",
}

const useEvents = () => {
  // Import data from auth provider
  const { accessToken } = useAuth();

  // Pull the events state from the store
  const { events, setEvents } = useEventsStore();

  // Create a state to store filtered events
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);

  // All filtering options
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<EventsFilter>(
    EventsFilter.NoFilter,
  );

  // The query to get events
  const query = useInfiniteQuery({
    queryKey: ["events", accessToken],
    queryFn: async ({ pageParam = 0 }) => {
      return await eventsApi.getEvents({
        offset: pageParam,
      });
    },
    getNextPageParam: (lastPage) => {
      const hasNextPage = lastPage.data.data.hasNextPage;

      if (!hasNextPage) return undefined;

      return lastPage.data.data.nextOffset;
    },
  });

  // When the query loads, set the conversations
  useEffect(() => {
    if (query.data) {
      // Combine all the pages into one array
      const formattedEvents = query.data.pages.flatMap(
        (page) => page.data.data.events,
      );

      setEvents(formattedEvents);
    }
  }, [query.data]);

  // When the query first loads, or when the search query or selected filter changes, filter the events
  useEffect(() => {
    // First, filter all the events based on the search query, by full name or phone number
    const matchedEvents = events.filter((event) => {
      const matches =
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase());

      // Return true if the event matches the search query
      return matches;
    });

    // Then, filter the matched events based on the selected filter
    switch (selectedFilter) {
      case EventsFilter.Upcoming:
        const upcomingEvents = matchedEvents.filter((event) => {
          return new Date(event.startDate) > new Date();
        });

        setFilteredEvents(upcomingEvents);
        break;

      case EventsFilter.Past:
        const pastEvents = matchedEvents.filter((event) => {
          return new Date(event.startDate) < new Date();
        });

        setFilteredEvents(pastEvents);
        break;
      case EventsFilter.NoFilter:
        setFilteredEvents(matchedEvents);
        break;
      default:
        break;
    }
  }, [searchQuery, selectedFilter, events]);

  // Handle the filter press event
  const onFilterPress = (e: any) => {
    const eventId = e.nativeEvent.event as EventsFilter;

    setSelectedFilter(eventId);
  };

  // Handle the other menu press event
  const onOtherPress = (e: any) => {
    const eventId = e.nativeEvent.event as EventsOtherOption;

    switch (eventId) {
      case EventsOtherOption.DeleteAll:
        break;
      default:
        break;
    }
  };

  // The actions for the filter menu
  const filterActions: MenuAction[] = [
    {
      id: EventsFilter.NoFilter,
      title: "No Filters",
      image: "xmark",
      state: selectedFilter === EventsFilter.NoFilter ? "on" : "off",
    },
    {
      id: EventsFilter.Upcoming,
      title: "Upcoming Events",
      image: "calendar",
      state: selectedFilter === EventsFilter.Upcoming ? "on" : "off",
    },
    {
      id: EventsFilter.Past,
      title: "Past Events",
      image: "calendar",
      state: selectedFilter === EventsFilter.Past ? "on" : "off",
    },
  ];

  // The actions for the other menu
  const otherActions: MenuAction[] = [
    {
      id: EventsOtherOption.DeleteAll,
      title: "Delete All Events",
      image: "trash",
      attributes: {
        destructive: true,
      },
    },
  ];

  return {
    ...query,

    searchQuery,
    filterActions,
    otherActions,
    events: filteredEvents,

    onFilterPress,
    onOtherPress,
    setSearchQuery,
  };
};

export default useEvents;
