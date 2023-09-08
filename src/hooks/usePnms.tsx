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

import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import pnmsApi from "@/api/api/pnms";
import { useAuth } from "@/providers/Auth";

const usePnms = () => {
  // The default page size for pagination
  const PAGE = 1;
  const PAGE_SIZE = 700;

  // Get access token so that we can cache the query
  const { accessToken } = useAuth();

  // Create a state variable to store the filtered PNMs
  const [filteredPnms, setFilteredPnms] = useState<PNM[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("");

  // Create a query to get the organization statistics
  const query = useQuery({
    // Use access token as the query key so response is cached on a per-user basis
    queryKey: ["listPnms", PAGE, accessToken],
    queryFn: async () => {
      return pnmsApi.getPnms({
        page: PAGE,
        pageSize: PAGE_SIZE,
      });
    },
    keepPreviousData: true,
  });

  const form = useFormik({
    initialValues: {
      searchQuery: "",
    },
    onSubmit: (values) => {},
  });

  useEffect(() => {
    if (query.data?.data?.data) {
      setFilteredPnms(query.data.data.data.pnms || []);
    }
  }, [query.data]);

  const pnms = query.data?.data?.data?.pnms || [];

  // Filter the PNMs based on the filter selected
  const filterByPnmsWithBid = () => {
    const filtered = pnms.filter((pnm) => pnm.receivedBid);
    setFilteredPnms(filtered);
  };

  // Filter the PNMs based on the filter selected
  const filterByPnmsWithoutBid = () => {
    const filtered = pnms.filter((pnm) => !pnm.receivedBid);
    setFilteredPnms(filtered);
  };

  // Remove all filters from the PNMs
  const removeFilters = () => {
    setFilteredPnms(pnms);
  };

  // Handle the filter press event
  const onFilterPress = (e: any) => {
    const eventId = e.nativeEvent.event;

    switch (eventId) {
      case "filter-by-received-bid":
        filterByPnmsWithBid();
        setSelectedFilter("filter-by-received-bid");
        break;
      case "filter-by-not-received-bid":
        filterByPnmsWithoutBid();
        setSelectedFilter("filter-by-not-received-bid");
        break;
      case "remove-filters":
        removeFilters();
        setSelectedFilter("");
        break;
      default:
        break;
    }
  };

  // When refresh control is triggered, refetch the query
  const onRefetch = async () => {
    await query.refetch();
  };

  // Use lodash debounce to search the PNMs after 1 second of inactivity
  const setSearchQuery = (query: string) => {
    form.setFieldValue("searchQuery", query);

    const filtered = pnms.filter((pnm) => {
      const fullName = `${pnm.firstName} ${pnm.lastName}`;

      // If there is no query, return all PNMs
      if (query === "") {
        return true;
      }

      return (
        fullName.toLowerCase().includes(query.toLowerCase()) ||
        pnm.phoneNumber.includes(query)
      );
    });

    setFilteredPnms(filtered);
  };

  return {
    ...query,
    selectedFilter,
    onFilterPress,
    onRefetch,
    pnms: filteredPnms,
    // Search form
    setSearchQuery,
    searchQuery: form.values.searchQuery,
  };
};

export default usePnms;
