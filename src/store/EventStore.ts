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

import { useGetEvents } from '@/hooks/api/events';
import customAsyncStorage from '@/lib/asyncStorage';

interface IEventStore {
  events: Event[];

  clear: () => void;
  setEvents: (events: Event[]) => void;
  getEvent: (id: string) => Event | undefined;
  addEvent: (event: Event) => void;
  updateEvent: (event: Event) => void;
  deleteEvent: (id: string) => void;
}

const useStore = create<IEventStore>()(
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
        const eventExists = get().events.some((e) => e._id === event._id);

        if (eventExists) return;

        return set({ events: [...get().events, event] });
      };

      /**
       * Update an event in the store
       */
      const updateEvent = (event: Event) => {
        const events = get().events.map((e) =>
          e._id === event._id ? event : e,
        );

        return set({ events });
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

export const useEventStore = () => {
  const store = useStore();
  const query = useGetEvents();

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
