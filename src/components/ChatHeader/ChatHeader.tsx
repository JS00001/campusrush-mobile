/*
 * Created on Sun Oct 15 2023
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
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, View, ScrollView } from "react-native";

import Text from "@/ui/Text";
import Badge from "@/ui/Badge";
import tw from "@/lib/tailwind";
import IconButton from "@/ui/IconButton";
import ProgressBar from "@/ui/ProgressBar";
import usePnmActions from "@/hooks/usePnmActions";

interface ChatHeaderProps {
  pnms: PNM[];
  loading?: boolean;
  onPnmRemove?: (pnm: PNM) => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  pnms,
  loading,
  onPnmRemove,
}) => {
  const navigation = useNavigation();

  const { actions, onActionPress } = usePnmActions(pnms[0]);

  // Whether or not the chat is a single PNM
  const isSinglePnm = pnms.length === 1;

  // Use the users name if it's a single PNM
  const header = isSinglePnm
    ? `${pnms[0].firstName} ${pnms[0].lastName}`
    : `New Message (${pnms.length} PNMs)`;

  // When the back arrow is pressed, go back to the previous screen
  const onBackArrowPress = () => navigation.goBack();

  // Styling
  const safeAreaStyles = tw.style(
    // Positioning and color
    "w-full border-b border-slate-200",
  );

  const headerStyles = tw.style(
    // Positioning and color
    "justify-between flex-row items-center px-6 py-3",
  );

  return (
    <SafeAreaView style={safeAreaStyles}>
      <View style={headerStyles}>
        <IconButton
          icon="ri-arrow-left-line"
          onPress={onBackArrowPress}
          size="sm"
        />

        <Text variant="body" style={tw`font-medium text-black`}>
          {header}
        </Text>

        <MenuView actions={actions} onPressAction={onActionPress}>
          <IconButton
            icon="ri-more-fill"
            onPress={() => {}}
            size="sm"
            disabled={!isSinglePnm}
            // Hide the button if it's not a single PNM
            style={tw.style("opacity-0", isSinglePnm && "opacity-100")}
          />
        </MenuView>
      </View>

      {!isSinglePnm && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={tw`flex-row gap-0.5 pl-6 pb-3`}
        >
          {pnms.map((pnm, index) => {
            const onPnmRemovePress = () => {
              if (onPnmRemove) {
                onPnmRemove(pnm);
              }
            };

            return (
              <Badge
                key={index}
                size="md"
                removable
                onRemove={onPnmRemovePress}
              >
                {pnm.firstName + " " + pnm.lastName}
              </Badge>
            );
          })}
        </ScrollView>
      )}

      <ProgressBar loading={loading} />
    </SafeAreaView>
  );
};

export default ChatHeader;
