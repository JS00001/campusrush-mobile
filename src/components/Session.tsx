/*
 * Created on Sun Aug 11 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { TouchableOpacity, View, ViewProps } from "react-native";

import Icon from "@/ui/Icon";
import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import date from "@/lib/util/date";

interface SessionProps extends ViewProps {
  session: RefreshToken;
  style?: any;
  onRemove: () => void;
}

const Session: React.FC<SessionProps> = ({
  session,
  style,
  onRemove,
  ...props
}) => {
  const containerStyles = tw.style(
    "bg-slate-100 rounded-xl gap-4",
    "px-7 py-4 justify-between items-center flex-row w-full",
    style,
  );

  const contentContainerStyles = tw.style(
    "shrink",
    "flex-row gap-x-5 items-center",
  );

  return (
    <View style={containerStyles} {...props}>
      <View style={contentContainerStyles}>
        <Icon name="smartphone-fill" size={24} color={tw.color("primary")} />

        <View style={tw`shrink`}>
          <Text type="p2" style={tw`text-primary`}>
            {session.deviceType}
          </Text>
          <Text type="p3" numberOfLines={1}>
            {session.location}
          </Text>
          <Text type="p3" numberOfLines={1}>
            Created {date.timeAgo(session.createdAt)}
          </Text>
        </View>
      </View>

      <TouchableOpacity onPress={onRemove}>
        <Icon name="close-fill" size={24} color={tw.color("red")} />
      </TouchableOpacity>
    </View>
  );
};

export default Session;
