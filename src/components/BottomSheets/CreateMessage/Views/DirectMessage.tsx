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

import Text from "@/ui_v1/Text";
import tw from "@/lib/tailwind";
import TextInput from "@/ui_v1/TextInput";
import RecentPnms from "@/components/RecentPnms";
import { useGetContacts } from "@/hooks/api/messaging";

const DirectMessage: React.FC<UseSheetFlowProps> = ({
  handleClose,
  handleSnapToPosition,
}) => {
  const navigation = useNavigation();
  const { all, isLoading } = useGetContacts();
  const search = useSearch({ data: all });

  const onPnmPress = (pnm: PNM) => {
    (navigation.navigate as any)("Chat", {
      pnm,
    });

    handleClose();
  };

  const directMessageHeader = search.query ? "Results" : "Suggested Contacts";

  return (
    <View style={tw`gap-y-4 flex-1`}>
      <View>
        <Text variant="title">Begin Typing</Text>
        <Text variant="body">Search for a PNM to message</Text>
      </View>

      <TextInput
        autoCorrect={false}
        icon="ri-search-line"
        variant="alternate"
        placeholder="Search"
        value={search.query}
        onChangeText={search.setQuery}
        onFocus={() => {
          handleSnapToPosition?.("95%");
        }}
      />

      <View style={tw`gap-y-3 flex-1`}>
        <Text variant="text">{directMessageHeader}</Text>
        <RecentPnms
          pnms={search.data}
          loading={isLoading}
          onPress={onPnmPress}
        />
      </View>
    </View>
  );
};

export default DirectMessage;
