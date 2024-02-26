/*
 * Created on Sat Feb 24 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { create } from 'zustand';
import { useEffect } from 'react';
import { PersistStorage, persist } from 'zustand/middleware';

import customAsyncStorage from '@/lib/asyncStorage';
import { useGetEvent, useGetEvents } from '@/hooks/api/events';
import date from '@/lib/util/date';

interface IEventStore {
  events: Event[];

  clear: () => void;
  setEvents: (events: Event[]) => void;
  getEvent: (id: string) => Event | undefined;
  addEvent: (event: Event) => void;
  updateEvent: (event: Event) => void;
  deleteEvent: (id: string) => void;
}

export const useEventZustandStore = create<IEventStore>()(
  persist(
    (set, get) => {
      /**
       * Initial state of the store
       */
      const initialState = {
        events: [],
      };
      /**
       * Clears the store
       */
      const clear = () => {
        return set(initialState);
      };

      /**
       * Set the events in the store
       */
      const setEvents = (events: Event[]) => {
        return set({ events });
      };

      /**
       * Get an event by id
       */
      const getEvent = (id: string) => {
        const event = get().events.find((e) => e._id === id);

        return event;
      };

      /**
       * Add an event to the store (if it's id doesn't exist)
       */
      const addEvent = (event: Event) => {
        return set((state) => {
          return insertEvent(state, event);
        });
      };

      /**
       * Update an event in the store
       */
      const updateEvent = (event: Event) => {
        return set((state) => {
          const oldEvent = state.events.find((e) => e._id === event._id);

          if (!oldEvent) return state;

          const updatedEvent = {
            ...oldEvent,
            ...event,
          };

          const newEvents = state.events.filter((e) => e._id !== event._id);

          return insertEvent({ ...state, events: newEvents }, updatedEvent);
        });
      };

      /**
       * Delete a PNM from the store
       */
      const deleteEvent = (id: string) => {
        const events = get().events.filter((e) => e._id !== id);

        return set({ events });
      };

      return {
        ...initialState,
        clear,
        setEvents,
        getEvent,
        addEvent,
        updateEvent,
        deleteEvent,
      };
    },
    {
      name: 'event-store',
      storage: customAsyncStorage as PersistStorage<IEventStore>,
    },
  ),
);

const insertEvent = (state: IEventStore, event: Event) => {
  // Don't insert the event if it already exists
  if (state.events.find((e) => e._id === event._id)) {
    return state;
  }

  /**
   * Find the first event that has a start date greater than
   * the event we are trying to insert. This allows us to insert
   * the event in the correct order of start dates
   */
  const insertIndex = state.events.findIndex(
    (e) => e.startDate > event.startDate,
  );

  // If there is a valid index, we are in the correct order of start dates
  // so we can insert the event at the index
  if (insertIndex !== -1) {
    return {
      events: [
        ...state.events.slice(0, insertIndex),
        event,
        ...state.events.slice(insertIndex),
      ],
    };
  }

  /**
   * If there are no events with a later start date, we need to find the first event
   * that has a start date that has passed. This allows us to insert the event
   * in the correct order of start dates
   */
  const newInsertIndex = state.events.findIndex((e) =>
    date.hasPassed(e.startDate),
  );

  // If there is a valid index, we are in the correct order of start dates
  if (newInsertIndex !== -1) {
    return {
      events: [
        ...state.events.slice(0, newInsertIndex),
        event,
        ...state.events.slice(newInsertIndex),
      ],
    };
  }

  // If there are no events that have passed, just add the event to the end of the list
  return {
    events: [...state.events, event],
  };
};

export const useEventStore = () => {
  const query = useGetEvents();
  const store = useEventZustandStore();

  useEffect(() => {
    if (!query.data) return;

    const combinedEvents = query.data.pages.flatMap((page) => {
      if ('error' in page) return [];

      return page.data.events;
    });

    store.setEvents(combinedEvents);
  }, [query.data]);

  return {
    ...query,
    ...store,
  };
};

export const useEvent = (id: string) => {
  const query = useGetEvent(id);
  const store = useEventZustandStore();

  const event = store.getEvent(id);

  useEffect(() => {
    if (!query.data || 'error' in query.data) return;

    store.updateEvent(query.data.data.event);
  }, [query.data]);

  return {
    event,
    ...query,
    ...store,
  };
};
