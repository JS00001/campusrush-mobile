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
import TextInput from "@/ui_v1/TextInput";
import IconButton from "@/ui_v1/IconButton";
import useSearch from "@/hooks/useSearch";
import Menu, { MenuAction } from "@/ui_v1/Menu";
import ChapterLoader from "@/ui_v1/Chapter/Loaders";
import InfiniteList from "@/components/InfiniteList";
import { useGetAdminChapters } from "@/hooks/api/admin";

const ChaptersView = () => {
  const getAdminChaptersQuery = useGetAdminChapters();

  const search = useSearch({
    data: getAdminChaptersQuery.chapters,
    filters: [
      {
        id: "ACTIVE_SUBSCRIPTIONS",
        filterFn: (data) =>
          data.filter((chapter) => chapter.entitlements.length > 0),
      },
      {
        id: "NO_SUBSCRIPTIONS",
        filterFn: (data) =>
          data.filter((chapter) => chapter.entitlements.length === 0),
      },
      {
        id: "PRO_SUBSCRIPTIONS",
        filterFn: (data) =>
          data.filter((chapter) =>
            chapter.entitlements.some((entitlement) => entitlement === "pro"),
          ),
      },
      {
        id: "BASIC_SUBSCRIPTIONS",
        filterFn: (data) =>
          data.filter((chapter) =>
            chapter.entitlements.some((entitlement) => entitlement === "basic"),
          ),
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
    {
      id: "PRO_SUBSCRIPTIONS",
      title: "Pro Subscriptions",
      image: "checkmark",
      state: search.filter === "PRO_SUBSCRIPTIONS" ? "on" : "off",
      onPress: () => search.setFilter("PRO_SUBSCRIPTIONS"),
    },
    {
      id: "BASIC_SUBSCRIPTIONS",
      title: "Basic Subscriptions",
      image: "checkmark",
      state: search.filter === "BASIC_SUBSCRIPTIONS" ? "on" : "off",
      onPress: () => search.setFilter("BASIC_SUBSCRIPTIONS"),
    },
  ];

  const onRefresh = async () => {
    await getAdminChaptersQuery.refetch();
  };

  const inputPlaceholder = `Search ${search.data.length || 0} chapters`;

  return (
    <>
      <View style={tw`flex-row w-full gap-x-1`}>
        <TextInput
          autoCorrect={false}
          icon="ri-search-line"
          variant="alternate"
          placeholder={inputPlaceholder}
          value={search.query}
          onChangeText={search.setQuery}
          containerStyle={tw`flex-shrink`}
        />

        <Menu actions={filterMenu}>
          <IconButton icon="ri-filter-3-fill" style={tw`flex-grow`} />
        </Menu>
      </View>

      <InfiniteList
        data={search.data}
        onRefresh={onRefresh}
        onEndReached={async () => {}}
        loadingComponent={<ChapterLoader />}
        emptyListTitle="No Conversations Found"
        emptyListSubtitle="Try changing your filters or sending a new message"
        renderItem={({ item: chapter }) => <Chapter chapter={chapter} />}
        loading={
          getAdminChaptersQuery.isLoading &&
          !getAdminChaptersQuery.chapters.length
        }
      />
    </>
  );
};

export default ChaptersView;
