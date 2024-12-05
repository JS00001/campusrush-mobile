/*
 * Created on Tue Feb 27 2024
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
import { useNavigation } from "@react-navigation/native";

import type { IPNM } from "@/types";
import type { UseSheetFlowProps } from "@/hooks/useSheetFlow";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import Headline from "@/ui/Headline";
import FlatList from "@/ui/FlatList";
import Searchbox from "@/ui/Searchbox";
import Skeleton from "@/ui/Skeleton";
import format from "@/lib/util/format";
import { Action } from "@/ui/ActionList";
import ListItem from "@/ui/ListItems/ListItem";
import ListItemLoader from "@/ui/Loaders/ListItem";
import HeadlineLoader from "@/ui/Loaders/Headline";
import ErrorMessage from "@/components/ErrorMessage";

import useSearch from "@/hooks/useSearch";
import { useGetContacts } from "@/hooks/api/contacts";

const Landing: React.FC<UseSheetFlowProps> = ({
  close,
  snapToPosition,
  snapToIndex,
}) => {
  const navigation = useNavigation();
  const contactsQuery = useGetContacts();

  const all = contactsQuery.data?.all || [];
  const starred = contactsQuery.data?.favorited || [];
  const suggested = contactsQuery.data?.suggested || [];
  const uncontacted = contactsQuery.data?.uncontacted || [];

  const search = useSearch({
    data: all,
    fields: ["firstName", "lastName", "phoneNumber"],
  });

  // Error and Loading States
  if (contactsQuery.isLoading) return <LoadingState />;
  if (contactsQuery.error)
    return (
      <ErrorMessage
        error={contactsQuery.error}
        description="Failed to load contacts"
      />
    );

  /**
   * Helper function for mass messaging (all uncontacted, all favorites, etc)
   */
  // prettier-ignore
  const onMassMessage = (pnms: IPNM[], error: {title: string, message: string}) => {
    if (!pnms.length) {
      Toast.show({
        type: 'error',
        text1: error.title,
        text2: error.message
      })
    }

    // If only one pnm, open their direct message
    else if (pnms.length === 1) {
      navigation.navigate("Conversation", {
        screen: "Chat",
        params: {
          pnm: pnms[0],
        }
      })
    }

    // If multiple, open the new message screen to send a mass message
    else {
      navigation.navigate("Conversation", {
        screen: "Create",
        params: {
          pnms
        }
      })
    }

    close();
  }

  /**
   * When the user presses the message all button (option 2)
   */
  const onMessageAllPress = () => {
    onMassMessage(all, {
      title: "No PNMs",
      message: "You have no PNMs to message",
    });
  };

  /**
   * When the user presses the message favorites button (option 3)
   */
  const onMessageFavoritesPress = () => {
    onMassMessage(starred, {
      title: "No Favorited PNMs",
      message: "You have not favorited any PNMs",
    });
  };

  /**
   * When the user presses the message uncontacted button (option 4)
   */
  const onMessageUncontactedPress = () => {
    onMassMessage(uncontacted, {
      title: "No Uncontacted PNMs",
      message: "You have messaged all current PNMs",
    });
  };

  /**
   * When the user presses a suggested or searched contact
   */
  const onDirectMessagePress = (pnm: IPNM) => {
    navigation.navigate("Conversation", {
      screen: "Chat",
      params: {
        pnm,
      },
    });

    close();
  };

  const placeholder = `Search ${all.length || ""} contacts`;
  const directMessageHeader = search.query ? "Results" : "Suggested Contacts";
  const pnms = search.query ? search.data : suggested;

  return (
    <View style={tw`gap-y-6 flex-1`}>
      <Headline
        title="New Message"
        subtitle="Start a new message with potential members"
      />

      <Searchbox
        ph-label="search-contacts"
        autoCorrect={false}
        placeholder={placeholder}
        onChangeText={search.setQuery}
        onFocus={() => snapToPosition?.("95%")}
        onBlur={() => snapToIndex?.(0)}
      />

      {search.query.length === 0 && (
        <>
          <Text type="p4" style={tw`font-bold uppercase`}>
            Shortcuts
          </Text>

          <Action.List>
            <Action.Item
              title="Message All"
              icon="UsersFill"
              onPress={onMessageAllPress}
            />
            <Action.Item
              title="Message Favorites"
              icon="StarFill"
              onPress={onMessageFavoritesPress}
            />
            <Action.Item
              title="Message Uncontacted"
              icon="UserPlusFill"
              onPress={onMessageUncontactedPress}
            />
          </Action.List>
        </>
      )}

      <Text type="p4" style={tw`font-bold uppercase`}>
        {directMessageHeader}
      </Text>

      <FlatList
        scrollEnabled={false}
        data={pnms}
        emptyListTitle="No Contacts Found"
        emptyListSubtitle="Start by adding a new PNM"
        renderItem={({ item: pnm }) => (
          <ListItem
            key={pnm._id}
            title={pnm.displayName}
            subtitle={format.phoneNumber(pnm.phoneNumber)}
            icon={pnm.starred ? "StarFill" : undefined}
            iconColor={tw.color("yellow-500")}
            onPress={onDirectMessagePress.bind(null, pnm)}
          />
        )}
      />
    </View>
  );
};

const LoadingState = () => {
  return (
    <View style={tw`gap-y-6`}>
      <HeadlineLoader style={tw`pb-4`} />
      <Skeleton height={52} borderRadius={999} />
      <Skeleton height={16} width={"50%"} />
      <Skeleton height={200} />
      <Skeleton height={16} width={"50%"} />

      <View style={tw`gap-y-1`}>
        {new Array(5).fill(0).map((_, i) => (
          <ListItemLoader key={i} />
        ))}
      </View>
    </View>
  );
};

export default Landing;
