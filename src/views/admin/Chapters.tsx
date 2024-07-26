/*
 * Created on Mon Mar 04 2024
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
import Chapter from "@/ui/Chapter";
import FlatList from "@/ui/FlatList";
import TextInput from "@/ui/TextInput";
import IconButton from "@/ui/IconButton";
import useSearch from "@/hooks/useSearch";
import Menu, { MenuAction } from "@/ui/Menu";
import ChapterLoader from "@/ui/Loaders/Chapter";
import { useGetAdminChapters } from "@/hooks/api/admin";

const ChaptersView = () => {
  const getAdminChaptersQuery = useGetAdminChapters();

  const search = useSearch({
    data: getAdminChaptersQuery.chapters,
    filters: [
      {
        id: "ACTIVE_SUBSCRIPTIONS",
        filterFn: (data) => data.filter((chapter) => chapter.isPro),
      },
      {
        id: "NO_SUBSCRIPTIONS",
        filterFn: (data) => data.filter((chapter) => !chapter.isPro),
      },
    ],
    sortingMethods: [
      {
        id: "CREATED_AT_DESC",
        key: "createdAt",
        direction: "desc",
      },
      {
        id: "CREATED_AT_ASC",
        key: "createdAt",
        direction: "asc",
      },
      {
        id: "LAST_ONLINE_DESC",
        key: "lastOnline",
        direction: "desc",
      },
      {
        id: "LAST_ONLINE_ASC",
        key: "lastOnline",
        direction: "asc",
      },
    ],
  });

  /**
   * Create the filter menu actions
   */
  const filterMenu: MenuAction[] = [
    {
      id: "NO_FILTER",
      title: "No Filter",
      image: "xmark",
      state: search.filter === "NO_FILTER" ? "on" : "off",
      onPress: () => search.setFilter("NO_FILTER"),
    },
    {
      id: "ACTIVE_SUBSCRIPTIONS",
      title: "Active Subscriptions",
      image: "checkmark",
      state: search.filter === "ACTIVE_SUBSCRIPTIONS" ? "on" : "off",
      onPress: () => search.setFilter("ACTIVE_SUBSCRIPTIONS"),
    },
    {
      id: "NO_SUBSCRIPTIONS",
      title: "No Subscriptions",
      image: "xmark",
      state: search.filter === "NO_SUBSCRIPTIONS" ? "on" : "off",
      onPress: () => search.setFilter("NO_SUBSCRIPTIONS"),
    },
  ];

  /**
   * Create the sort by menu actions
   */
  const sortingMenu: MenuAction[] = [
    {
      id: "NO_SORT",
      title: "No Sort",
      image: "xmark",
      state: search.sortingMethod === "NO_SORT" ? "on" : "off",
      onPress: () => search.setSortingMethod("NO_SORT"),
    },
    {
      id: "CREATED_AT_DESC",
      title: "Created At (Desc)",
      image: "calendar",
      state: search.sortingMethod === "CREATED_AT_DESC" ? "on" : "off",
      onPress: () => search.setSortingMethod("CREATED_AT_DESC"),
    },
    {
      id: "CREATED_AT_ASC",
      title: "Created At (Asc)",
      image: "calendar",
      state: search.sortingMethod === "CREATED_AT_ASC" ? "on" : "off",
      onPress: () => search.setSortingMethod("CREATED_AT_ASC"),
    },
    {
      id: "LAST_ONLINE_DESC",
      title: "Last Online (Desc)",
      image: "clock",
      state: search.sortingMethod === "LAST_ONLINE_DESC" ? "on" : "off",
      onPress: () => search.setSortingMethod("LAST_ONLINE_DESC"),
    },
    {
      id: "LAST_ONLINE_ASC",
      title: "Last Online (Asc)",
      image: "clock",
      state: search.sortingMethod === "LAST_ONLINE_ASC" ? "on" : "off",
      onPress: () => search.setSortingMethod("LAST_ONLINE_ASC"),
    },
  ];

  const onRefresh = async () => {
    await getAdminChaptersQuery.refetch();
  };

  const inputPlaceholder = `Search ${search.data.length || ""} chapters`;

  return (
    <>
      <View style={tw`flex-row w-full gap-x-1`}>
        <TextInput
          autoCorrect={false}
          icon="search-line"
          placeholder={inputPlaceholder}
          value={search.query}
          onChangeText={search.setQuery}
          contentContainerStyle={tw`shrink`}
        />

        <Menu title="Filter By" actions={filterMenu}>
          <IconButton
            color="secondary"
            iconName="filter-3-fill"
            style={tw`flex-grow`}
          />
        </Menu>
        <Menu title="Sort By" actions={sortingMenu}>
          <IconButton
            color="secondary"
            iconName="sort-number-asc"
            style={tw`flex-grow`}
          />
        </Menu>
      </View>
      <FlatList
        data={search.data}
        onRefresh={onRefresh}
        loadingComponent={<ChapterLoader />}
        loading={getAdminChaptersQuery.isLoading}
        emptyListTitle="No Chapters Found"
        emptyListSubtitle="Try changing your filters"
        renderItem={({ item: chapter }) => <Chapter chapter={chapter} />}
      />
    </>
  );
};

export default ChaptersView;
