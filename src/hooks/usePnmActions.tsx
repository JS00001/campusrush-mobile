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

import Content from "@/lib/content";
import pnmsApi from "@/api/api/pnms";
import usePnmsStore from "@/state/pnms";
import useModalsStore from "@/state/modals";
import useStatisticsStore from "@/state/statistics";
import useConversationsStore from "@/state/conversations";

export enum PNMActions {
  EditPnm = "EDIT_PNM",
  ExtendBid = "EXTEND_BID",
  DeletePnm = "DELETE_PNM",
}

const usePnmActions = (pnm: PNM) => {
  // Pull navigation hook
  const navigation = useNavigation();

  // Store to open a modal, used to confirm deletion
  const { openModal } = useModalsStore();

  // Store to remove a pnm from the pnms store
  const deletePnm = usePnmsStore((state) => state.deletePnm);

  // Store to remove a conversation from the conversations store
  const deleteConversation = useConversationsStore(
    (state) => state.deleteConversation,
  );

  // Store to update home statistics once all PNMs are deleted
  const numBids = useStatisticsStore((state) => state.numBids);
  const numPnms = useStatisticsStore((state) => state.numPnms);
  const setNumBids = useStatisticsStore((state) => state.setNumBids);
  const setCurrentPnms = useStatisticsStore((state) => state.setNumPnms);

  // Create a mutation to delete the PNM
  const deletionMutation = useMutation({
    mutationFn: async (input: DeletePnmInput) => {
      return pnmsApi.deletePnm(input);
    },
    onSuccess: async () => {
      navigation.goBack();

      // Remove the PNM from the store
      deletePnm(pnm);

      // Remove the conversation from the store
      deleteConversation(pnm._id);

      // Update the statistics
      setCurrentPnms(numPnms - 1);

      // Check if the PNM has a bid
      if (pnm.receivedBid) {
        setNumBids(numBids - 1);
      }
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
          params: { pnmId: pnm._id },
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
       * When the extend bid button is pressed, open the extend bid modal
       */
      case PNMActions.ExtendBid:
        break;

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
      id: PNMActions.ExtendBid,
      title: "Extend Bid",
      image: "checkmark.shield",
      attributes: {
        disabled: true,
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
  };
};

export default usePnmActions;
