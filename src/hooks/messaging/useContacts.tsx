/*
 * Created on Wed Oct 4 2023
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

import { useAuth } from "@/providers/Auth";
import messagingApi from "@/api/api/messaging";

const useContacts = () => {
  // Get access token so that we can cache the query
  const { accessToken } = useAuth();

  // Create a state variable to store the filtered PNMs and the PNMs
  const [allPnms, setAllPnms] = useState<PNM[]>([]);
  const [filteredPnms, setFilteredPnms] = useState<PNM[]>([]);

  // The string to search for
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Create a query to get the organization statistics
  const query = useQuery({
    // Use access token as the query key so response is cached on a per-user basis
    queryKey: ["contacts", accessToken],
    // This is so we can call the query when the bottom sheet is opened
    enabled: false,
    queryFn: async () => {
      return messagingApi.getContacts();
    },
  });

  // Extract the data from the query
  const favoritedPnms = query.data?.data?.data?.favorited ?? [];
  const suggestedPnms = query.data?.data?.data?.suggested ?? [];
  const uncontactedPnms = query.data?.data?.data?.uncontacted ?? [];

  useEffect(() => {
    if (query.data) {
      const formattedPnms = query.data.data.data.all;

      setAllPnms(formattedPnms);
    }
  }, [query.data]);

  // Filter the PNMs based on the search query
  useEffect(() => {
    if (searchQuery === "") {
      setFilteredPnms(suggestedPnms);
    } else {
      const matchedPnms = allPnms.filter((pnm) => {
        const fullName = `${pnm.firstName} ${pnm.lastName}`;

        // Return true if the full name or phone number includes the search query
        return (
          fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          pnm.phoneNumber.includes(searchQuery)
        );
      });

      setFilteredPnms(matchedPnms);
    }
  }, [searchQuery, allPnms]);

  // Show a list of suggested PNMs if the search query is empty
  // else show a list of filtered PNMs from all PNMs
  const directMessageHeader =
    searchQuery === "" ? "Suggested Contacts" : "Results";

  return {
    ...query,
    allPnms,
    searchQuery,
    filteredPnms,
    favoritedPnms,
    uncontactedPnms,
    directMessageHeader,
    setSearchQuery,
  };
};

export default useContacts;
