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
          if (state.events.find((e) => e._id === event._id)) {
            return state;
          }

          return {
            events: [event, ...state.events],
          };
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
        set((state) => ({
          events: state.events.map((e) => {
            if (e._id === event._id) {
              return {
                ...e,
                ...event,
              };
            }
            return e;
          }),
        })),
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

export default useEventsStore;
