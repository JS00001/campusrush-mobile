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
import { useNavigation } from "@react-navigation/native";

import useSearch from "@/hooks/useSearch";
import { UseSheetFlowProps } from "@/hooks/useSheetFlow";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import FlatList from "@/ui/FlatList";
import ListItem from "@/ui/ListItem";
import TextInput from "@/ui/TextInput";
import { formatPhoneNumber } from "@/lib/util/string";
import { useGetContacts } from "@/hooks/api/messaging";

const DirectMessage: React.FC<UseSheetFlowProps> = ({
  handleClose,
  snapToPosition,
}) => {
  const navigation = useNavigation();
  const { all, suggested, isLoading } = useGetContacts();

  const search = useSearch({
    data: all,
    fields: ["firstName", "lastName", "phoneNumber"],
  });

  const onPnmPress = (pnm: PNM) => {
    (navigation.navigate as any)("Chat", {
      pnm,
    });

    handleClose();
  };

  const placeholder = `Search ${all.length || ""} contacts`;

  const directMessageHeader = search.query ? "Results" : "Suggested Contacts";

  const pnms = search.query ? search.data : suggested;

  return (
    <View style={tw`gap-y-4 flex-1`}>
      <View>
        <Text type="h2">Begin Typing</Text>
        <Text>Search for a PNM to message</Text>
      </View>

      <TextInput
        autoCorrect={false}
        icon="search-line"
        value={search.query}
        placeholder={placeholder}
        onChangeText={search.setQuery}
        onFocus={() => {
          snapToPosition?.("95%");
        }}
      />

      <View style={tw`gap-y-3 flex-1`}>
        <Text type="p3">{directMessageHeader}</Text>

        <FlatList
          data={pnms}
          loading={isLoading}
          emptyListTitle="No Contacts Found"
          emptyListSubtitle="Start by adding a new PNM"
          renderItem={({ item: pnm }) => (
            <ListItem
              key={pnm._id}
              iconColor={tw.color("yellow")}
              icon={pnm.starred ? "star-fill" : undefined}
              title={`${pnm.firstName} ${pnm.lastName}`}
              subtitle={formatPhoneNumber(pnm.phoneNumber)}
              onPress={onPnmPress.bind(null, pnm)}
            />
          )}
        />
      </View>
    </View>
  );
};

export default DirectMessage;
