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

import { create } from "zustand";
import { PersistStorage, persist } from "zustand/middleware";

import date from "@/lib/util/date";
import customAsyncStorage from "@/lib/asyncStorage";

export enum EventsStatus {
  Idle = "IDLE",
  Loading = "LOADING",
}

const defaultState = {
  events: [],
  status: EventsStatus.Idle,
};

interface EventsState {
  events: Event[];
  status: EventsStatus;

  resetState: () => void;

  getEvent: (id: string) => Event;
  addEvent: (event: Event) => void;
  updateEvent: (event: Event) => void;
  deleteEvent: (event: Event) => void;

  setEvents: (events: Event[]) => void;
  setStatus: (status: EventsStatus) => void;
}

const useEventsStore = create<EventsState>()(
  persist(
    (set) => ({
      /**
       * The default state of the store
       */
      ...defaultState,
      /**
       * Sets the status of the events store
       */
      setStatus: (status) =>
        set(() => ({
          status,
        })),
      /**
       * Gets an event from the store by its id
       */
      getEvent: (id) => {
        const state: EventsState = useEventsStore.getState();

        return state.events.find((e) => e._id === id) as Event;
      },
      /**
       * Adds an event to the store if its id does not exist
       */
      addEvent: (event) =>
        set((state) => {
          return insertEvent(state, event);
        }),
      /**
       * Sets the list of events in the store
       */
      setEvents: (events) =>
        set(() => ({
          events,
        })),
      /**
       * Updates an event in the store if its id exists
       */
      updateEvent: (event) =>
        set((state) => {
          // Find the event in the store
          const oldEvent = state.events.find((e) => e._id === event._id);

          // If the event doesn't exist, just return the current state
          if (!oldEvent) return state;

          // If the event does exist, update it
          const updatedEvent = {
            ...oldEvent,
            ...event,
          };

          // Remove the old event
          const newEvents = state.events.filter((e) => e._id !== event._id);

          // Insert the updated event
          return insertEvent({ ...state, events: newEvents }, updatedEvent);
        }),
      /**
       * Deletes an event from the store if its id exists
       */
      deleteEvent: (event) =>
        set((state) => ({
          events: state.events.filter((e) => e._id !== event._id),
        })),
      /**
       * Resets the state to the default state
       */
      resetState: () => set(() => defaultState),
    }),
    {
      name: "events-store",
      storage: customAsyncStorage as PersistStorage<EventsState>,
    },
  ),
);

const insertEvent = (state: EventsState, event: Event) => {
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

export default useEventsStore;
