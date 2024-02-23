/*
 * Created on Tue Dec 05 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import Toast from "react-native-toast-message";
import { useMutation } from "@tanstack/react-query";

import errors from "@/lib/errors";
import { useAuth } from "@/providers/Auth";
import chapterApi from "@/api/api/chapter";

const useDeleteChapter = () => {
  const { clearUserData } = useAuth();

  const mutation = useMutation({
    mutationFn: () => {
      return chapterApi.deleteChapter();
    },
  });

  const onDeleteChapter = async () => {
    // The response from the server
    let response;

    try {
      // Attempt to login the chapter
      response = await mutation.mutateAsync();
    } catch (error) {
      errors.handleApiError(error);
    }
    // If there was an error, prevent the "success" code from running
    if (!response) return;

    clearUserData();

    Toast.show({
      type: "success",
      text1: "Chapter deleted",
      text2: "Your chapter has been deleted",
    });
  };

  return {
    ...mutation,
    onDeleteChapter,
  };
};

export default useDeleteChapter;
