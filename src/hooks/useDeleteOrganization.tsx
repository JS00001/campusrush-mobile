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
import organizationApi from "@/api/api/organization";

const useDeleteOrganization = () => {
  const { clearUserData } = useAuth();

  const mutation = useMutation({
    mutationFn: () => {
      return organizationApi.deleteOrganization();
    },
  });

  const onDeleteOrganization = async () => {
    // The response from the server
    let response;

    try {
      // Attempt to login the organization
      response = await mutation.mutateAsync();
    } catch (error) {
      errors.handleApiError(error);
    }
    // If there was an error, prevent the "success" code from running
    if (!response) return;

    clearUserData();

    Toast.show({
      type: "success",
      text1: "Organization deleted",
      text2: "Your organization has been deleted",
    });
  };

  return {
    ...mutation,
    onDeleteOrganization,
  };
};

export default useDeleteOrganization;
