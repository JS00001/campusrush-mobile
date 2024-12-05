/*
 * Created on Sat Feb 24 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { View } from "react-native";
import Toast from "react-native-toast-message";

import tw from "@/lib/tailwind";
import { alert } from "@/lib/util";
import Searchbox from "@/ui/Searchbox";
import IconButton from "@/ui/IconButton";
import useSearch from "@/hooks/useSearch";
import PnmsList from "@/components/PnmsList";
import Menu, { MenuAction } from "@/ui/Menu";
import { useDeletePnms, useGetPnms } from "@/hooks/api/pnms";

const PnmsView = () => {
  const pnmsQuery = useGetPnms();
  const deleteAllPnmsMutation = useDeletePnms();

  const pnms = pnmsQuery.data?.pnms || [];

  const search = useSearch({
    data: pnms,
    fields: ["firstName", "lastName", "phoneNumber"],
    filters: [
      {
        id: "STARRED",
        filterFn: (data) => data.filter((pnm) => pnm.starred),
      },
      {
        id: "NOT_STARRED",
        filterFn: (data) => data.filter((pnm) => !pnm.starred),
      },
    ],
  });

  /**
   * Create the filter menu actions
   */
  const filterMenu: MenuAction[] = [
    {
      id: "NO_FILTER",
      title: "No Filters",
      image: "xmark",
      state: search.filter === "NO_FILTER" ? "on" : "off",
      onPress: () => search.setFilter("NO_FILTER"),
    },
    {
      id: "STARRED",
      title: "Favorites",
      image: "star",
      state: search.filter === "STARRED" ? "on" : "off",
      onPress: () => search.setFilter("STARRED"),
    },
    {
      id: "NOT_STARRED",
      title: "Not Favorited",
      image: "star.slash",
      state: search.filter === "NOT_STARRED" ? "on" : "off",
      onPress: () => search.setFilter("NOT_STARRED"),
    },
  ];

  /**
   * Create the more menu actions
   */
  const moreMenu: MenuAction[] = [
    {
      id: "DELETE_ALL",
      title: "Delete All PNMs",
      image: "trash",
      attributes: {
        destructive: true,
      },
      onPress: () => {
        alert({
          title: "Are you sure?",
          message: "All PNMs will be permanently deleted.",
          buttons: [
            {
              style: "cancel",
              text: "No, Cancel",
            },
            {
              text: "Yes, Delete",
              style: "destructive",
              onPress: async () => {
                const pnmCount = pnms.length;
                await deleteAllPnmsMutation.mutateAsync({});
                Toast.show({
                  type: "success",
                  text1: "Deleted All PNMs",
                  text2: `${pnmCount} PNMs have been deleted.`,
                });
              },
            },
          ],
        });
      },
    },
  ];

  const placeholder = `Search ${pnms.length || ""} PNMs`;

  const onRefetch = async () => {
    await pnmsQuery.refetch();
  };

  return (
    <>
      <View style={tw`flex-row w-full gap-x-1`}>
        <Searchbox
          ph-label="search-pnms"
          autoCorrect={false}
          placeholder={placeholder}
          value={search.query}
          onChangeText={search.setQuery}
          contentContainerStyle={tw`flex-shrink`}
        />

        <Menu title="Filter By" actions={filterMenu}>
          <IconButton
            size="lg"
            color="secondary"
            iconName="FunnelSimple"
            style={tw`flex-grow`}
          />
        </Menu>

        <Menu actions={moreMenu}>
          <IconButton
            size="lg"
            color="secondary"
            iconName="DotsThree"
            style={tw`flex-grow`}
          />
        </Menu>
      </View>

      <PnmsList
        pnms={search.data}
        loading={pnmsQuery.isLoading}
        onRefetch={onRefetch}
      />
    </>
  );
};

export default PnmsView;
