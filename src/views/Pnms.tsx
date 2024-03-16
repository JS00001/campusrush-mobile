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

import tw from "@/lib/tailwind";
import TextInput from "@/ui/TextInput";
import IconButton from "@/ui/IconButton";
import useSearch from "@/hooks/useSearch";
import Content from "@/constants/content";
import Menu, { MenuAction } from "@/ui/Menu";
import PnmsList from "@/components/PnmsList";
import { useGlobalStore, useModalStore } from "@/store";
import { useDeletePnms, useGetPnms } from "@/hooks/api/pnms";

const PnmsView = () => {
  const globalStore = useGlobalStore();
  const { openModal } = useModalStore();

  const pnmsQuery = useGetPnms();
  const deleteAllPnmsMutation = useDeletePnms();

  const search = useSearch({
    data: pnmsQuery.pnms,
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
        openModal("error", {
          title: Content.confirmDeleteAllPNMs.title,
          subtitle: Content.confirmDeleteAllPNMs.subtitle,
          primaryActionLabel: "Yes, Delete",
          secondaryActionLabel: "No, Cancel",
          onPrimaryAction: async () => {
            await deleteAllPnmsMutation.mutateAsync();
            await pnmsQuery.refetch();

            globalStore.resetPnmStores();
          },
        });
      },
    },
  ];

  const placeholder = `Search ${pnmsQuery.pnms.length || 0} PNMs`;

  const onRefetch = async () => {
    await pnmsQuery.refetch();
  };

  return (
    <>
      <View style={tw`flex-row w-full gap-x-1`}>
        <TextInput
          autoCorrect={false}
          icon="search-line"
          placeholder={placeholder}
          value={search.query}
          onChangeText={search.setQuery}
          contentContainerStyle={tw`flex-shrink`}
        />

        <Menu title="Filter By" actions={filterMenu}>
          <IconButton
            color="secondary"
            iconName="filter-3-fill"
            style={tw`flex-grow`}
          />
        </Menu>

        <Menu actions={moreMenu}>
          <IconButton
            color="secondary"
            iconName="more-fill"
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
