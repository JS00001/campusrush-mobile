/*
 * Created on Sat Nov 30 2024
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
import { Layout } from "@/ui/Layout";
import FlatList from "@/ui/FlatList";
import TextInput from "@/ui/TextInput";
import Form from "@/ui/ListItems/Form";
import IconButton from "@/ui/IconButton";
import useSearch from "@/hooks/useSearch";
import FormLoader from "@/ui/Loaders/Form";
import Menu, { MenuAction } from "@/ui/Menu";
import ActionButton from "@/ui/ActionButton";
import { useBottomSheetStore } from "@/store";
import { useDeleteForms, useGetForms } from "@/hooks/api/forms";

const FormsScreen = () => {
  const query = useGetForms();
  const deleteFormsMutation = useDeleteForms();
  const bottomSheetStore = useBottomSheetStore();

  const forms = query.data?.forms ?? [];
  const search = useSearch({ data: forms });

  /**
   * Create the more menu actions
   */
  const moreMenu: MenuAction[] = [
    {
      id: "DELETE_ALL",
      title: "Delete All Forms",
      image: "trash",
      attributes: { destructive: true },
      onPress: () => {
        alert({
          title: "Are you sure?",
          message: "All forms and their responses will be permanently deleted",
          buttons: [
            {
              style: "cancel",
              text: "No, Cancel",
            },
            {
              text: "Yes, Delete",
              style: "destructive",
              onPress: async () => {
                const formCount = forms.length;
                await deleteFormsMutation.mutateAsync({});
                Toast.show({
                  type: "success",
                  text1: "All Forms Deleted",
                  text2: `${formCount} forms have been deleted`,
                });
              },
            },
          ],
        });
      },
    },
  ];

  const placeholder = `Search ${forms.length} Forms`;

  const onNewFormPress = () => {
    bottomSheetStore.open("FORM_EDITOR");
  };

  const onRefresh = async () => {
    await query.refetch();
  };

  return (
    <Layout.Root>
      <Layout.Header title="Forms" subtitle="Manage and share your Forms" />

      <Layout.Content gap={8} contentContainerStyle={tw`pb-0`}>
        <View style={tw`flex-row w-full gap-x-1 relative`}>
          <TextInput
            ph-label="search-forms"
            autoCorrect={false}
            icon="MagnifyingGlass"
            placeholder={placeholder}
            value={search.query}
            onChangeText={search.setQuery}
            contentContainerStyle={tw`flex-shrink`}
          />
          <Menu actions={moreMenu}>
            <IconButton
              color="secondary"
              iconName="DotsThree"
              style={tw`flex-grow`}
            />
          </Menu>
        </View>

        <FlatList
          data={forms}
          onRefresh={onRefresh}
          error={query.error}
          errorDescription="Could not fetch forms"
          emptyListTitle="No Forms Found"
          emptyListSubtitle="Try creating a new form"
          loading={query.isLoading}
          loadingComponent={<FormLoader />}
          renderItem={({ item: form }) => <Form form={form} />}
        />

        <ActionButton
          ph-label="create-form"
          icon="Plus"
          onPress={onNewFormPress}
        />
      </Layout.Content>
    </Layout.Root>
  );
};

export default FormsScreen;
