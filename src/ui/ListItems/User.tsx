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

import { TouchableOpacity, TouchableOpacityProps, View } from "react-native";

import Icon from "@/ui/Icon";
import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import dateUtil from "@/lib/util/date";
import StatusBadge from "@/ui/StatusBadge";
import { useBottomSheetStore } from "@/store";
import { titleCase } from "@/lib/util/string";
import { ChapterRole, IUser } from "@/@types";

interface UserProps extends TouchableOpacityProps {
  user: IUser;
}

const User: React.FC<UserProps> = ({ user }) => {
  const bottomSheetStore = useBottomSheetStore();

  const containerStyles = tw.style(
    "bg-gray-100 flex-row items-center justify-between rounded-xl p-5 gap-y-3",
  );

  const roleColor = {
    [ChapterRole.Owner]: "info" as const,
    [ChapterRole.Admin]: "success" as const,
    [ChapterRole.Editor]: "warning" as const,
    [ChapterRole.Viewer]: "danger" as const,
  }[user.chapterRole];

  const onPress = () => {
    bottomSheetStore.open("MANAGE_USER", { user });
  };

  return (
    <TouchableOpacity style={containerStyles} onPress={onPress}>
      <View>
        <Text style={tw`text-primary font-medium`}>
          {user.firstName} {user.lastName}
        </Text>
        <Text type="p3">Active {dateUtil.timeAgo(user.lastOnline)}</Text>
      </View>

      <View style={tw`flex-row gap-2 items-center`}>
        <StatusBadge style={tw`self-center`} color={roleColor}>
          {titleCase(user.chapterRole)}
        </StatusBadge>
        <Icon size={16} icon="CaretRight" />
      </View>
    </TouchableOpacity>
  );
};

export default User;
