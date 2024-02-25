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

import { MenuView } from "@react-native-menu/menu";
import { ActivityIndicator, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import Event from "@/ui/Event";
import tw from "@/lib/tailwind";
import Layout from "@/ui/Layout";
import TextInput from "@/ui/TextInput";
import StatusIcon from "@/ui/StatusIcon";
import IconButton from "@/ui/IconButton";
import ActionButton from "@/ui/ActionButton";
import { EventsStatus } from "@/statev1/events";
import InfiniteList from "@/components/InfiniteList";
import { DefaultEventLoader } from "@/ui/Event/Loaders";
import useEventsList from "@/hooksv1/events/useEventsList";
import { useBottomSheets } from "@/providers/BottomSheetv1";

interface EventsProps {
  navigation: NativeStackNavigationProp<any>;
}

const Events: React.FC<EventsProps> = () => {
  const {
    events,
    status,
    isLoading,
    searchQuery,
    otherActions,
    filterActions,

    refetch,
    fetchNextPage,
    onFilterPress,
    onOtherPress,
    setSearchQuery,
    onDeleteEvent,
  } = useEventsList("cache-1");

  const { openBottomSheet } = useBottomSheets();

  const onNewEventPress = () => {
    openBottomSheet("ADD_EVENT");
  };

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
      {status != EventsStatus.Idle && (
        <StatusIcon>
          <StatusIcon.Icon>
            {status == EventsStatus.Loading && (
              <ActivityIndicator size="large" color="white" />
            )}
          </StatusIcon.Icon>
        </StatusIcon>
      )}

      {/* The floating action button in bottom right */}
      <ActionButton icon="ri-add-line" onPress={onNewEventPress} />

      <Layout gap={8}>
        <Layout.Header
          beta
          title="Events"
          subtitle="Manage and share your events"
        />

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
          elementsDeletable
          data={events}
          loading={isLoading}
          onRefresh={onRefresh}
          onEndReached={onEndReached}
          onDeleteElement={onDeleteEvent}
          loadingComponent={<DefaultEventLoader />}
          emptyListTitle="No Events Found"
          emptyListSubtitle="Try changing your filters or creating a new event"
          renderItem={({ item: event }) => <Event event={event} />}
        />
      </Layout>
    </>
  );
};

export default Events;
