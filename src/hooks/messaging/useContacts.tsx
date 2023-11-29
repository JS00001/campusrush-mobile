/*
 * Created on Mon Nov 27 2023
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
import useContactsStore from "@/state/messaging/contacts";

const useContacts = () => {
  const { accessToken } = useAuth();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredPnms, setFilteredPnms] = useState<PNM[]>([]);

  // Accessing state management functions from local stores
  const allPnms = useContactsStore((s) => s.allPnms);
  const suggestedPnms = useContactsStore((s) => s.suggestedPnms);
  const starredPnms = useContactsStore((s) => s.starredPnms);
  const uncontactedPnms = useContactsStore((s) => s.uncontactedPnms);
  const setContacts = useContactsStore((s) => s.setContacts);

  const contactsQuery = useQuery({
    // This is so we can call the query when the bottom sheet is opened
    enabled: false,
    queryKey: ["contacts", accessToken],
    queryFn: async () => {
      return messagingApi.getContacts();
    },
  });

  // When the query data is updated, update the state
  useEffect(() => {
    if (contactsQuery.data) {
      handleQueryData(contactsQuery.data);
    }
  }, [contactsQuery.data]);

  // Update the filtered PNMs when the search query is updated
  useEffect(() => {
    updateFilteredPnms();
  }, [searchQuery]);

  const handleQueryData = (data: GetContactsAPIResponse) => {
    if (data) {
      const { all, favorited, suggested, uncontacted } = data.data.data;

      setContacts("allPnms", all);
      setContacts("starredPnms", favorited);
      setContacts("suggestedPnms", suggested);
      setContacts("uncontactedPnms", uncontacted);
    }
  };

  const updateFilteredPnms = () => {
    if (!searchQuery) {
      setFilteredPnms(suggestedPnms);
      return;
    }

    // Check if the search query matches the PNM's full name or phone number
    const filtered = suggestedPnms.filter((pnm) => {
      const fullName = `${pnm.firstName} ${pnm.lastName}`;

      const matchesFullName = fullName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesPhoneNumber = pnm.phoneNumber
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      return matchesFullName || matchesPhoneNumber;
    });

    setFilteredPnms(filtered);
  };

  const directMessageHeader = !searchQuery ? "Suggested Contacts" : "Results";

  return {
    ...contactsQuery,
    allPnms,
    searchQuery,
    filteredPnms,
    uncontactedPnms,
    directMessageHeader,
    favoritedPnms: starredPnms,
    setSearchQuery,
  };
};

export default useContacts;
