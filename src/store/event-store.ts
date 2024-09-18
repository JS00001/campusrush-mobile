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
import { PersistStorage, persist } from 'zustand/middleware';

import type { IEvent } from '@/types';

import date from '@/lib/util/date';
import customAsyncStorage from '@/lib/async-storage';

interface IEventState {
  events: IEvent[];
}

interface IEventStore extends IEventState {
  /** Clear the store */
  clear: () => void;
  /** Set the events in the store */
  setEvents: (events: IEvent[]) => void;
  /** Get an event by id */
  getEvent: (id: string) => IEvent | undefined;
  /** Add or update an event in the store */
  addOrUpdateEvent: (event: IEvent) => void;
  /** Delete an event from the store */
  deleteEvent: (id: string) => void;
}

export const useEventStore = create<IEventStore>()(
  persist(
    (set, get) => {
      const initialState: IEventState = {
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
      const setEvents = (events: IEvent[]) => {
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
       * Add an event if it doesn't exist, or update it if it does
       */
      const addOrUpdateEvent = (event: IEvent) => {
        return set((state) => {
          const oldEvent = state.events.find((e) => e._id === event._id);

          if (oldEvent) {
            const updatedEvent = {
              ...oldEvent,
              ...event,
            };

            const newEvents = state.events.filter((e) => e._id !== event._id);

            return insertEvent({ ...state, events: newEvents }, updatedEvent);
          }

          return insertEvent(state, event);
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
        addOrUpdateEvent,
        deleteEvent,
      };
    },
    {
      name: 'event-store',
      storage: customAsyncStorage as PersistStorage<IEventStore>,
    },
  ),
);

const insertEvent = (state: IEventStore, event: IEvent) => {
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
