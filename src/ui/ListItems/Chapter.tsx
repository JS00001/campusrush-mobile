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

import type { IChapter } from "@/types";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import dateUtil from "@/lib/util/date";
import IconLabel from "@/ui/IconLabel";
import { useBottomSheet } from "@/providers/BottomSheet";

interface ChapterProps extends TouchableOpacityProps {
  chapter: IChapter;
}

const Chapter: React.FC<ChapterProps> = ({ chapter }) => {
  const { openBottomSheet } = useBottomSheet();

  const containerStyles = tw.style("bg-gray-100 rounded-xl p-5 gap-y-3");

  const onPress = () => {
    openBottomSheet("CHAPTER", { chapterId: chapter._id });
  };

  return (
    <TouchableOpacity style={containerStyles} onPress={onPress}>
      <View>
        <Text type="h3">{chapter.name}</Text>
        <Text>{chapter.school}</Text>
      </View>

      <IconLabel
        size="md"
        color="tertiary"
        iconName="Envelope"
        title="Email"
        subtitle={chapter.email}
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
