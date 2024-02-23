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
import pnmsApi from "@/api/api/pnms";
import useZustandStore from "@/state";
import usePnmsStore from "@/state/pnms";

interface UsePnm {
  pnm: PNM;
  loading: "deleting" | "favoriting" | "none";

  favorite: () => Promise<void>;
  delete: () => Promise<void>;
}

const usePnm = (pnmId: string): UsePnm => {
  const globalStore = useZustandStore();

  const pnm = usePnmsStore((state) => state.getPnm(pnmId));

  const deletionMutation = useMutation({
    mutationFn: async (input: DeletePnmInput) => {
      return pnmsApi.deletePnm(input);
    },
  });

  // Create a mutation to mark the PNM as favorited
  const favoriteMutation = useMutation({
    mutationFn: async (input: UpdatePnmInput) => {
      return pnmsApi.updatePnm(input);
    },
  });

  const _favorite = async () => {
    const starred = !pnm.starred;

    let response;

    try {
      response = await favoriteMutation.mutateAsync({
        id: pnm._id,
        starred,
      });
    } catch (error) {
      errors.handleApiError(error);
    }

    if (!response) return;

    if (starred) {
      globalStore.favoritePnm(pnm);
    } else {
      globalStore.unfavoritePnm(pnm);
    }
  };

  const _delete = async () => {
    let response;

    try {
      response = await deletionMutation.mutateAsync({
        id: pnm._id,
      });
    } catch (error) {
      errors.handleApiError(error);
    }

    if (!response) return;

    globalStore.deletePnm(pnm);

    Toast.show({
      type: "success",
      text1: "Deleted PNM",
      text2: `${pnm.firstName} ${pnm.lastName} has been deleted.`,
    });
  };

  const loading = deletionMutation.isLoading
    ? "deleting"
    : favoriteMutation.isLoading
      ? "favoriting"
      : "none";

  return {
    pnm,
    loading,

    delete: _delete,
    favorite: _favorite,
  };
};

export default usePnm;
