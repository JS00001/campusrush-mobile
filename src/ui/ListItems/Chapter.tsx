/*
 * Created on Fri Mar 08 2024
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

import type { IAdminChapter } from "@/types";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import dateUtil from "@/lib/util/date";
import IconLabel from "@/ui/IconLabel";
import { useBottomSheetStore } from "@/store";

interface ChapterProps extends TouchableOpacityProps {
  chapter: IAdminChapter;
}

const Chapter: React.FC<ChapterProps> = ({ chapter }) => {
  const bottomSheetStore = useBottomSheetStore();

  const containerStyles = tw.style("bg-gray-100 rounded-xl p-5 gap-y-3");

  const onPress = () => {
    bottomSheetStore.open("CHAPTER", { chapterId: chapter._id });
  };

  return (
    <TouchableOpacity style={containerStyles} onPress={onPress}>
      <View>
        <Text type="h4">{chapter.name}</Text>
        <Text>{chapter.school}</Text>
      </View>

      <IconLabel
        size="md"
        color="tertiary"
        iconName="Envelope"
        title="Email"
        subtitle={chapter.owner.email}
      />
      <IconLabel
        size="md"
        color="tertiary"
        iconName="Clock"
        title="Last Seen"
        subtitle={dateUtil.timeAgo(chapter.lastOnline)}
      />
    </TouchableOpacity>
  );
};

export default Chapter;
