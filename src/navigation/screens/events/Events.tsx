/*
 * Created on Wed Dec 20 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { View } from "react-native";
import { MenuView } from "@react-native-menu/menu";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import Event from "@/ui/Event";
import tw from "@/lib/tailwind";
import Layout from "@/ui/Layout";
import TextInput from "@/ui/TextInput";
import IconButton from "@/ui/IconButton";
import ActionButton from "@/ui/ActionButton";
import useEventsList from "@/hooks/useEventsList";
import InfiniteList from "@/components/InfiniteList";

interface EventsProps {
  navigation: NativeStackNavigationProp<any>;
}

const Events: React.FC<EventsProps> = () => {
  const {
    events,
    isLoading,
    searchQuery,
    otherActions,
    filterActions,

    refetch,
    fetchNextPage,
    onFilterPress,
    onOtherPress,
    setSearchQuery,
  } = useEventsList();

  const onNewEventPress = () => {};

  const onRefresh = async () => {
    await refetch();
  };

  const onEndReached = async () => {
    await fetchNextPage();
  };

  // Define a placeholder of how many events are being searched
  // prettier-ignore
  const searchPlaceholder = `Search ${events.length ? `${events.length} ` : ""}Events`;

  return (
    <>
      {/* The floating action button in bottom right */}
      <ActionButton icon="ri-add-line" onPress={onNewEventPress} />

      <Layout gap={8}>
        <Layout.Header title="Events" subtitle="Manage and share your events" />

        <View style={tw`flex-row w-full gap-x-1`}>
          <TextInput
            autoCorrect={false}
            icon="ri-search-line"
            variant="alternate"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChangeText={setSearchQuery}
            containerStyle={tw`flex-shrink`}
          />

          <MenuView
            title="Filter By"
            onPressAction={onFilterPress}
            actions={filterActions}
          >
            <IconButton icon="ri-filter-3-fill" style={tw`flex-grow`} />
          </MenuView>

          <MenuView actions={otherActions} onPressAction={onOtherPress}>
            <IconButton icon="ri-more-fill" style={tw`flex-grow`} />
          </MenuView>
        </View>

        <InfiniteList
          loading={isLoading}
          data={events}
          onRefresh={onRefresh}
          onEndReached={onEndReached}
          renderItem={({ item: event }) => <Event event={event} />}
        />
      </Layout>
    </>
  );
};

export default Events;
