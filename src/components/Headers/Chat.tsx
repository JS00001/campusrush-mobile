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

import { ScrollView } from "react-native";

import Badge from "@/ui/Badge";
import tw from "@/lib/tailwind";
import Header from "@/ui/Header";
import usePnmActions from "@/hooksv1/pnms/usePnmActions";

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
  // TODO: REPLACE
  const { actions, onActionPress, isLoading } = usePnmActions(pnms[0]);

  // Whether or not the chat is a single PNM
  const isSinglePnm = pnms.length === 1;

  // Use the users name if it's a single PNM
  const title = isSinglePnm
    ? `${pnms[0].firstName} ${pnms[0].lastName}`
    : `New Message (${pnms.length} PNMs)`;

  return (
    <Header
      hasBackButton
      hasMenuButton={isSinglePnm}
      title={title}
      loading={loading}
      menuButton={{
        actions,
        loading: isLoading,
        onPressAction: onActionPress,
      }}
    >
      {!isSinglePnm && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={tw`flex-row gap-0.5 pl-6 pb-3`}
        >
          {pnms.map((pnm, index) => {
            const onPnmRemovePress = () => {
              if (onPnmRemove && pnms.length > 2) {
                onPnmRemove(pnm);
              }
            };

            return (
              <Badge
                key={index}
                size="md"
                removable={pnms.length > 2}
                onRemove={onPnmRemovePress}
              >
                {pnm.firstName + " " + pnm.lastName}
              </Badge>
            );
          })}
        </ScrollView>
      )}
    </Header>
  );
};

export default ChatHeader;
