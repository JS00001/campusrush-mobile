/*
 * Created on Mon Dec 16 2024
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
import FlatList from "@/ui/FlatList";
import { Layout } from "@/ui/Layout";
import Searchbox from "@/ui/Searchbox";
import { ChapterRole } from "@/@types";
import User from "@/ui/ListItems/User";
import IconButton from "@/ui/IconButton";
import useSearch from "@/hooks/useSearch";
import UserLoader from "@/ui/Loaders/User";
import Menu, { MenuAction } from "@/ui/Menu";
import ActionButton from "@/ui/ActionButton";
import { useBottomSheetStore } from "@/store";
import RoleGuard from "@/components/RoleGuard";
import { useGetChapterUsers } from "@/hooks/api/chapter";

const ManageUsersScreen: React.FC = () => {
  const query = useGetChapterUsers();
  const bottomSheetStore = useBottomSheetStore();

  const users = query.data?.users ?? [];
  const placeholder = `Search ${users.length} users`;

  const search = useSearch({
    data: users,
    filters: [
      {
        id: "OWNER",
        filterFn: (data) =>
          data.filter((user) => user.chapterRole === ChapterRole.Owner),
      },
      {
        id: "ADMIN",
        filterFn: (data) =>
          data.filter((user) => user.chapterRole === ChapterRole.Admin),
      },
      {
        id: "EDITOR",
        filterFn: (data) =>
          data.filter((user) => user.chapterRole === ChapterRole.Editor),
      },
      {
        id: "VIEWER",
        filterFn: (data) =>
          data.filter((user) => user.chapterRole === ChapterRole.Viewer),
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
      id: "OWNER",
      title: "Owner",
      image: "person.crop.circle.badge.checkmark",
      state: search.filter === "OWNER" ? "on" : "off",
      onPress: () => search.setFilter("OWNER"),
    },
    {
      id: "ADMIN",
      title: "Admin",
      image: "shield",
      state: search.filter === "ADMIN" ? "on" : "off",
      onPress: () => search.setFilter("ADMIN"),
    },
    {
      id: "EDITOR",
      title: "Editor",
      image: "pencil.and.outline",
      state: search.filter === "EDITOR" ? "on" : "off",
      onPress: () => search.setFilter("EDITOR"),
    },
    {
      id: "VIEWER",
      title: "Viewer",
      image: "eye",
      state: search.filter === "VIEWER" ? "on" : "off",
      onPress: () => search.setFilter("VIEWER"),
    },
  ];

  const onCreateUserPress = () => {
    bottomSheetStore.open("MANAGE_USER");
  };

  const onRefresh = async () => {
    await query.refetch();
  };

  return (
    <Layout.Root>
      <Layout.Header
        title="Manage Users"
        subtitle="Manage your chapter's users"
      />

      <Layout.Content gap={8} contentContainerStyle={tw`pb-0`}>
        <View style={tw`flex-row relative w-full gap-x-1`}>
          <Searchbox
            ph-label="search-forms"
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
        </View>

        <FlatList
          data={search.data}
          onRefresh={onRefresh}
          error={query.error}
          errorDescription="Could not fetch users"
          emptyListTitle="No Users Found"
          emptyListSubtitle="Try creating a new user"
          loading={query.isLoading}
          loadingComponent={<UserLoader />}
          renderItem={({ item: user }) => <User user={user} />}
        />

        <RoleGuard role={ChapterRole.Admin}>
          <ActionButton
            ph-label="create-user"
            icon="Plus"
            onPress={onCreateUserPress}
          />
        </RoleGuard>
      </Layout.Content>
    </Layout.Root>
  );
};

export default ManageUsersScreen;
