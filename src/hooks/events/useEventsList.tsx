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
import Toast from "react-native-toast-message";
import { MenuAction } from "@react-native-menu/menu";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";

import errors from "@/lib/errors";
import eventsApi from "@/api/api/events";
import Content from "@/constants/content";
import { useAuth } from "@/providers/Auth";
import useModalsStore from "@/state/modals";
import useEventsStore, { EventsStatus } from "@/state/events";

export enum EventsFilter {
  NoFilter = "NO_FILTER",
  Upcoming = "UPCOMING",
  Past = "PAST",
}

export enum EventsOtherOption {
  DeleteAll = "DELETE_ALL",
}

/**
 * HACK-AROUND SOLUTION
 * We use this hook in two different places. React query's caching
 * causes the data to be shared between the two hooks, which is not good, because it will
 * 'refetch' with a wrong cache. For example, delete an event in one hook, in the other, the
 * last query is still cached, so it will not show up as deleted. To fix this, we pass in a cacheId
 * to the hook, which will be used as the query key. This way, the two hooks will have different caches.
 */
const useEvents = (cacheId?: string) => {
  const { accessToken } = useAuth();
  const { openModal } = useModalsStore();

  const events = useEventsStore((state) => state.events);
  const setEvents = useEventsStore((state) => state.setEvents);
  const resetState = useEventsStore((state) => state.resetState);

  const status = useEventsStore((state) => state.status);
  const setStatus = useEventsStore((state) => state.setStatus);
  const deleteEvent = useEventsStore((state) => state.deleteEvent);

  // Create a state to store filtered events
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);

  // All filtering options
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<EventsFilter>(
    EventsFilter.NoFilter,
  );

  // The query to get events
  const query = useInfiniteQuery({
    queryKey: ["events", accessToken, cacheId],
    queryFn: async ({ pageParam = 0 }) => {
      return await eventsApi.getEvents({
        offset: pageParam,
      });
    },
    cacheTime: 0,
    getNextPageParam: (lastPage) => {
      const hasNextPage = lastPage.data.data.hasNextPage;

      if (!hasNextPage) return undefined;

      return lastPage.data.data.nextOffset;
    },
  });

  // Create a mutation to delete every pnm
  const massDeletionMutation = useMutation({
    mutationFn: async () => {
      return eventsApi.deleteEvents();
    },
    onSuccess: async () => {
      await resetState();

      await query.refetch();

      setStatus(EventsStatus.Idle);
    },
  });

  const singleDeletionMutation = useMutation({
    mutationFn: async (input: DeleteEventInput) => {
      return eventsApi.deleteEvent(input);
    },
  });

  // When the query loads, set the events
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
        openModal({
          name: "ERROR",
          props: {
            title: Content.confirmDeleteAllEvents.title,
            subtitle: Content.confirmDeleteAllEvents.subtitle,
            secondaryButtonText: "No, Cancel",
            primaryButtonText: "Yes, Delete",
            // When the "Confirm Delete" button is pressed, delete the PNM
            primaryButtonAction: () => {
              setStatus(EventsStatus.Loading);
              massDeletionMutation.mutate();
            },
          },
        });
        break;
      default:
        break;
    }
  };

  const onDeleteEvent = async (event: Event) => {
    let response;

    deleteEvent(event);

    try {
      response = await singleDeletionMutation.mutateAsync({
        id: event._id,
      });
    } catch (error) {
      errors.handleApiError(error);
    }

    if (!response) return;

    Toast.show({
      type: "success",
      text1: "Deleted Event",
      text2: `${event.title} has been deleted.`,
    });
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

    status,
    searchQuery,
    filterActions,
    otherActions,
    events: filteredEvents,

    onFilterPress,
    onOtherPress,
    setSearchQuery,
    onDeleteEvent,
  };
};

export default useEvents;
