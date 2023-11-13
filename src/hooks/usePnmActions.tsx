/*
 * Created on Sat Sep 02 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { useMutation } from "@tanstack/react-query";
import { MenuAction } from "@react-native-menu/menu";
import { useNavigation } from "@react-navigation/native";

import Content from "@/constants/content";
import pnmsApi from "@/api/api/pnms";
import usePnmsStore from "@/state/pnms";
import useModalsStore from "@/state/modals";
import useStatisticsStore from "@/state/statistics";
import useConversationsStore from "@/state/conversations";

export enum PNMActions {
  EditPnm = "EDIT_PNM",
  Favorite = "FAVORITE",
  Unfavorite = "UNFAVORITE",
  DeletePnm = "DELETE_PNM",
}

const usePnmActions = (pnm: PNM) => {
  // Check if the PNM is in the store
  const storedPnm = usePnmsStore((state) => state.getPnm(pnm._id));

  // If there is a pnm in the store, use that instead
  pnm = storedPnm || pnm;

  // Pull navigation hook
  const navigation = useNavigation();

  // Store to open a modal, used to confirm deletion
  const { openModal } = useModalsStore();

  // Store to remove a pnm from the pnms store
  const deletePnm = usePnmsStore((state) => state.deletePnm);

  // Store to update a pnm in the pnms store
  const updatePnm = usePnmsStore((state) => state.updatePnm);

  // Store to remove a conversation from the conversations store
  const deleteConversation = useConversationsStore(
    (state) => state.deleteConversation,
  );

  // Store to update home statistics
  const decrementNumStarredPnms = useStatisticsStore(
    (state) => state.decrementNumStarredPnms,
  );
  const decrementNumPnms = useStatisticsStore(
    (state) => state.decrementNumPnms,
  );
  const incrementNumStarredPnms = useStatisticsStore(
    (state) => state.incrementNumStarredPnms,
  );
  const removeRecentPnm = useStatisticsStore((state) => state.removeRecentPnm);

  // Create a mutation to delete the PNM
  const deletionMutation = useMutation({
    mutationFn: async (input: DeletePnmInput) => {
      return pnmsApi.deletePnm(input);
    },
    onSuccess: async () => {
      navigation.goBack();

      // Remove the PNM from the store
      deletePnm(pnm);

      // Remove the PNM from recent PNMs
      removeRecentPnm(pnm);

      // Remove the conversation from the store
      deleteConversation(pnm._id);

      // Update the statistics
      decrementNumPnms();

      // Check if the PNM is favorited
      if (pnm.starred) {
        decrementNumStarredPnms();
      }
    },
  });

  // Create a mutation to mark the PNM as favorited
  const favoriteMutation = useMutation({
    mutationFn: async (input: UpdatePnmInput) => {
      return pnmsApi.updatePnm(input);
    },
    onSuccess: async () => {
      // Update the PNM in the store
      updatePnm({
        ...pnm,
        starred: true,
      });

      // Update the statistics
      incrementNumStarredPnms();
    },
  });

  // Create a mutation to mark the PNM as unfavorited
  const unfavoriteMutation = useMutation({
    mutationFn: async (input: UpdatePnmInput) => {
      return pnmsApi.updatePnm(input);
    },
    onSuccess: async () => {
      // Update the PNM in the store
      updatePnm({
        ...pnm,
        starred: false,
      });

      // Update the statistics
      decrementNumStarredPnms();
    },
  });

  // Handle the other menu press event
  const onActionPress = (e: any) => {
    const eventId = e.nativeEvent.event as PNMActions;

    switch (eventId) {
      /**
       * When the "Edit PNM" button is pressed, navigate to the PNM details
       */
      case PNMActions.EditPnm:
        (navigation.navigate as any)("PNMsTab", {
          screen: "PNMDetails",
          initial: false,
          params: { pnm },
        });
        break;
      /**
       * When the delete button is pressed, open the confirm delete modal
       */
      case PNMActions.DeletePnm:
        openModal({
          name: "ERROR",
          props: {
            message: Content.confirmDeletePNM,
            secondaryButtonText: "No, Cancel",
            primaryButtonText: "Yes, Delete",
            // When the "Confirm Delete" button is pressed, delete the PNM
            primaryButtonAction: () => {
              deletionMutation.mutate({
                id: pnm._id,
              });
            },
          },
        });
        break;
      /**
       * When the favorite button is pressed, favorite the PNM
       */
      case PNMActions.Favorite:
        favoriteMutation.mutate({
          id: pnm._id,
          starred: true,
        });
        break;
      /**
       * When the unfavorite button is pressed, unfavorite the PNM
       */
      case PNMActions.Unfavorite:
        unfavoriteMutation.mutate({
          id: pnm._id,
          starred: false,
        });
        break;
      /**
       * If the event id is not recognized, do nothing
       */
      default:
        break;
    }
  };

  // The actions for the menu
  const actions: MenuAction[] = [
    {
      id: PNMActions.EditPnm,
      title: "Edit PNM",
      image: "square.and.pencil",
    },
    {
      id: PNMActions.Favorite,
      title: "Favorite",
      image: "star",
      attributes: {
        hidden: pnm.starred,
      },
    },
    {
      id: PNMActions.Unfavorite,
      title: "Unfavorite",
      image: "star.slash",
      attributes: {
        hidden: !pnm.starred,
      },
    },
    {
      id: PNMActions.DeletePnm,
      title: "Delete PNM",
      image: "trash",
      attributes: {
        destructive: true,
      },
    },
  ];

  return {
    actions,
    onActionPress,
    isLoading:
      deletionMutation.isLoading ||
      favoriteMutation.isLoading ||
      unfavoriteMutation.isLoading,
  };
};

export default usePnmActions;
