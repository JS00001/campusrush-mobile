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
import useContactsStore from "@/state/contacts";

const useContacts = () => {
  // Get access token so that we can cache the query
  const { accessToken } = useAuth();

  // Create a state variable to store the filtered PNMs and the PNMs
  const [filteredPnms, setFilteredPnms] = useState<PNM[]>([]);

  // The string to search for
  const [searchQuery, setSearchQuery] = useState<string>("");

  const allPnms = useContactsStore((s) => s.allPnms);
  const uncontactedPnms = useContactsStore((s) => s.uncontactedPnms);
  const suggestedPnms = useContactsStore((s) => s.suggestedPnms);
  const starredPnms = useContactsStore((s) => s.starredPnms);

  const setContacts = useContactsStore((s) => s.setContacts);

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

  useEffect(() => {
    if (query.data) {
      const resAllPnms = query.data.data.data.all;
      const resStarredPnms = query.data.data.data.favorited;
      const resSuggestedPnms = query.data.data.data.suggested;
      const resUncontactedPnms = query.data.data.data.uncontacted;

      setContacts("allPnms", resAllPnms);
      setContacts("uncontactedPnms", resUncontactedPnms);
      setContacts("suggestedPnms", resSuggestedPnms);
      setContacts("starredPnms", resStarredPnms);
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
    setSearchQuery,
    uncontactedPnms,
    directMessageHeader,
    favoritedPnms: starredPnms,
  };
};

export default useContacts;
