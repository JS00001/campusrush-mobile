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

import { useEffect, useState } from "react";
import { MenuAction } from "@react-native-menu/menu";
import { useMutation, useQuery } from "@tanstack/react-query";

import pnmsApi from "@/apiv1/api/pnms";
import useZustandStore from "src/statev1";
import Content from "@/constants/content";
import { useAuth } from "@/providers/Auth";
import useModalsStore from "@/statev1/modals";
import usePnmsStore, { PnmsStatus } from "@/statev1/pnms";

export enum PNMFilter {
  NoFilter = "NO_FILTER",
  Starred = "STARRED",
  NotStarred = "NOT_STARRED",
}

export enum PNMOtherOption {
  DeleteAll = "DELETE_ALL",
}

const usePnms = () => {
  // Get access token so that we can cache the query
  const { accessToken } = useAuth();

  // Store to open a modal, used to confirm deletion
  const { openModal } = useModalsStore();

  // Store to reset the state
  const { resetPnmState } = useZustandStore();

  // Create a state variable to store the filtered PNMs and the PNMs
  const { pnms, setPnms } = usePnmsStore();
  const [filteredPnms, setFilteredPnms] = useState<PNM[]>([]);

  // Store to get and update the pnms store status
  const status = usePnmsStore((state) => state.status);
  const setStatus = usePnmsStore((state) => state.setStatus);

  // All filtering options
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<PNMFilter>(
    PNMFilter.NoFilter,
  );

  // Create a query to get the chapter statistics
  const query = useQuery({
    queryKey: ["listPnms", accessToken],
    queryFn: async () => {
      return pnmsApi.getPnms();
    },
    keepPreviousData: true,
  });

  // Create a mutation to delete the PNMs
  const deletionMutation = useMutation({
    mutationFn: async () => {
      return pnmsApi.deletePnms();
    },
    onSuccess: async () => {
      // Delete all the data from stores
      await resetPnmState();

      // Refetch the query
      await query.refetch();

      // Set the status to idle
      setStatus(PnmsStatus.Idle);
    },
  });

  // When the query loads, set the PNMs
  useEffect(() => {
    if (query.data) {
      const formattedPnms = query.data.data.data.pnms;

      setPnms(formattedPnms);
    }
  }, [query.data]);

  // When the query first loads, or when the search query or selected filter changes, filter the PNMs
  useEffect(() => {
    // First, filter all the PNMs based on the search query, by full name or phone number
    const matchedPnms = pnms.filter((pnm) => {
      const fullName = `${pnm.firstName} ${pnm.lastName}`;

      // Return true if the full name or phone number includes the search query
      return (
        fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pnm.phoneNumber.includes(searchQuery)
      );
    });

    // Then, filter the matched PNMs based on the selected filter
    switch (selectedFilter) {
      case PNMFilter.Starred:
        const starredPnms = matchedPnms.filter((pnm) => pnm.starred);
        setFilteredPnms(starredPnms);
        break;
      case PNMFilter.NotStarred:
        const notStarredPnms = matchedPnms.filter((pnm) => !pnm.starred);
        setFilteredPnms(notStarredPnms);
        break;
      case PNMFilter.NoFilter:
        setFilteredPnms(matchedPnms);
        break;
      default:
        break;
    }
  }, [searchQuery, selectedFilter, pnms]);

  // Handle the filter press event
  const onFilterPress = (e: any) => {
    const eventId = e.nativeEvent.event as PNMFilter;

    setSelectedFilter(eventId);
  };

  // Handle the other menu press event
  const onOtherPress = (e: any) => {
    const eventId = e.nativeEvent.event as PNMOtherOption;

    switch (eventId) {
      /**
       * When the delete button is pressed, open the confirm delete modal
       */
      case PNMOtherOption.DeleteAll:
        openModal({
          name: "ERROR",
          props: {
            title: Content.confirmDeleteAllPNMs.title,
            subtitle: Content.confirmDeleteAllPNMs.subtitle,
            secondaryButtonText: "No, Cancel",
            primaryButtonText: "Yes, Delete",
            // When the "Confirm Delete" button is pressed, delete the PNM
            primaryButtonAction: () => {
              setStatus(PnmsStatus.Loading);
              deletionMutation.mutate();
            },
          },
        });
        break;
      default:
        break;
    }
  };

  // On refetch, refresh the query
  const onRefetch = async () => {
    await query.refetch();
  };

  // The actions for the filter menu
  const filterActions: MenuAction[] = [
    {
      id: PNMFilter.NoFilter,
      title: "No Filters",
      image: "xmark",
      state: selectedFilter === PNMFilter.NoFilter ? "on" : "off",
    },
    {
      id: PNMFilter.Starred,
      title: "Favorites",
      image: "star",
      state: selectedFilter === PNMFilter.Starred ? "on" : "off",
    },
    {
      id: PNMFilter.NotStarred,
      title: "Not Favorited",
      image: "star.slash",
      state: selectedFilter === PNMFilter.NotStarred ? "on" : "off",
    },
  ];

  // The actions for the other menu
  const otherActions: MenuAction[] = [
    {
      id: PNMOtherOption.DeleteAll,
      title: "Delete All PNMs",
      image: "trash",
      attributes: {
        destructive: true,
      },
    },
  ];

  return {
    ...query,
    pnms: filteredPnms,
    status,
    searchQuery,
    filterActions,
    otherActions,
    onRefetch,
    onFilterPress,
    onOtherPress,
    setSearchQuery,
  };
};

export default usePnms;
