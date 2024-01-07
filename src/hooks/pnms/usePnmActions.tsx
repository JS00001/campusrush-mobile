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

import { Keyboard } from "react-native";
import Toast from "react-native-toast-message";
import { MenuAction } from "@react-native-menu/menu";
import { useNavigation } from "@react-navigation/native";

import usePnm from "@/hooks/pnms/usePnm";
import Content from "@/constants/content";
import useModalsStore from "@/state/modals";
import { useBottomSheets } from "@/providers/BottomSheet";

export enum PNMActions {
  EditPnm = "EDIT_PNM",
  Favorite = "FAVORITE",
  Unfavorite = "UNFAVORITE",
  DeletePnm = "DELETE_PNM",
}

const usePnmActions = (pnm: PNM) => {
  const navigation = useNavigation();
  const { openModal } = useModalsStore();
  const { handlePresentModalPress } = useBottomSheets();
  const { pnm: storedPnm, ...pnmActions } = usePnm(pnm._id);

  // If there is a pnm in the store, use that instead of the passed in pnm
  pnm = storedPnm || pnm;

  /**
   * When an action is pressed, handle the action
   */
  const onActionPress = (e: any) => {
    const eventId = e.nativeEvent.event as PNMActions;

    switch (eventId) {
      // Edit the PNM
      case PNMActions.EditPnm:
        Keyboard.dismiss();
        handlePresentModalPress("UPDATE_PNM", {
          pnmId: pnm._id,
        });
        break;

      // Delete the PNM
      case PNMActions.DeletePnm:
        openModal({
          name: "ERROR",
          props: {
            message: Content.confirmDeletePNM,
            secondaryButtonText: "No, Cancel",
            primaryButtonText: "Yes, Delete",
            // When the "Confirm Delete" button is pressed, delete the PNM
            primaryButtonAction: async () => {
              await pnmActions.delete();

              navigation.goBack();

              Toast.show({
                type: "success",
                text1: "Deleted PNM",
                text2: `${pnm.firstName} ${pnm.lastName} has been deleted.`,
              });
            },
          },
        });
        break;

      // Favorite the PNM
      case PNMActions.Favorite:
        (async () => {
          await pnmActions.favorite();

          Toast.show({
            type: "success",
            text1: "Added to Favorites",
            text2: `${pnm.firstName} ${pnm.lastName} has been added to your favorites.`,
          });
        })();
        break;

      // Unfavorite the PNM
      case PNMActions.Unfavorite:
        (async () => {
          await pnmActions.favorite();

          Toast.show({
            type: "success",
            text1: "Removed from Favorites",
            text2: `${pnm.firstName} ${pnm.lastName} has been removed from your favorites.`,
          });
        })();
        break;
    }
  };

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
    isLoading: pnmActions.loading !== "none",
  };
};

export default usePnmActions;
