/*
 * Created on Sat Jan 06 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */
import Toast from "react-native-toast-message";
import { useMutation } from "@tanstack/react-query";

import errors from "@/lib/errors";
import eventsApi from "@/apiv1/api/events";
import useEventsStore from "@/statev1/events";

interface UseEvent {
  event: Event;
  loading: "deleting" | "none";

  delete: () => Promise<void>;
}

const useEvent = (eventId: string): UseEvent => {
  const event = useEventsStore((state) => state.getEvent(eventId));
  const deleteEvent = useEventsStore((state) => state.deleteEvent);

  const deletionMutation = useMutation({
    mutationFn: async (input: DeleteEventInput) => {
      return eventsApi.deleteEvent(input);
    },
  });

  const _delete = async () => {
    let response;

    try {
      response = await deletionMutation.mutateAsync({
        id: event._id,
      });
    } catch (error) {
      errors.handleApiError(error);
    }

    if (!response) return;

    deleteEvent(event);

    Toast.show({
      type: "success",
      text1: "Deleted Event",
      text2: `${event.title} has been deleted.`,
    });
  };

  const loading = deletionMutation.isLoading ? "deleting" : "none";

  return {
    event,
    loading,

    delete: _delete,
  };
};

export default useEvent;
