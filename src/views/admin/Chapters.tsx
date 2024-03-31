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
import TextInput from "@/ui/TextInput";
import IconButton from "@/ui/IconButton";
import useSearch from "@/hooks/useSearch";
import Menu, { MenuAction } from "@/ui/Menu";
import ChapterLoader from "@/ui/Loaders/Chapter";
import FlatList from "@/ui/FlatList";
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

        <Menu actions={filterMenu}>
          <IconButton
            color="secondary"
            iconName="filter-3-fill"
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
