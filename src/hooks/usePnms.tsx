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
import { useQuery } from "@tanstack/react-query";
import { MenuAction } from "@react-native-menu/menu";

import pnmsApi from "@/api/api/pnms";
import { useAuth } from "@/providers/Auth";

export enum PNMFilter {
  NoFilter = "NO_FILTER",
  ReceivedBid = "RECEIVED_BID",
  NotReceivedBid = "NOT_RECEIVED_BID",
}

const usePnms = () => {
  // The default page size for pagination
  const PAGE = 1;
  const PAGE_SIZE = 700;

  // Get access token so that we can cache the query
  const { accessToken } = useAuth();

  // Create a state variable to store the filtered PNMs and the PNMs
  const [pnms, setPnms] = useState<PNM[]>([]);
  const [filteredPnms, setFilteredPnms] = useState<PNM[]>([]);

  // All filtering options
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<PNMFilter>(
    PNMFilter.NoFilter,
  );

  // Create a query to get the organization statistics
  const query = useQuery({
    queryKey: ["listPnms", PAGE, accessToken],
    queryFn: async () => {
      return pnmsApi.getPnms({
        page: PAGE,
        pageSize: PAGE_SIZE,
      });
    },
    keepPreviousData: true,
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
      case PNMFilter.ReceivedBid:
        const pnmsWithBids = matchedPnms.filter((pnm) => pnm.receivedBid);
        setFilteredPnms(pnmsWithBids);
        break;
      case PNMFilter.NotReceivedBid:
        const pnmsWithoutBid = matchedPnms.filter((pnm) => !pnm.receivedBid);
        setFilteredPnms(pnmsWithoutBid);
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
      id: PNMFilter.ReceivedBid,
      title: "Received Bid",
      image: "person.badge.plus",
      state: selectedFilter === PNMFilter.ReceivedBid ? "on" : "off",
    },
    {
      id: PNMFilter.NotReceivedBid,
      title: "Has Not Received Bid",
      image: "person.badge.minus",
      state: selectedFilter === PNMFilter.NotReceivedBid ? "on" : "off",
    },
  ];

  return {
    ...query,
    pnms: filteredPnms,
    searchQuery,
    selectedFilter,
    filterActions,
    onRefetch,
    onFilterPress,
    setSearchQuery,
  };
};

export default usePnms;
