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

import { TouchableOpacity, TouchableOpacityProps } from "react-native";

import tw from "@/lib/tailwind";
import Headline from "@/ui/Headline";
import dateUtil from "@/lib/util/date";
import IconLabel from "@/ui/IconLabel";
import { useBottomSheet } from "@/providers/BottomSheet";

interface ChapterProps extends TouchableOpacityProps {
  chapter: Chapter;
}

const Chapter: React.FC<ChapterProps> = ({ chapter }) => {
  const { openBottomSheet } = useBottomSheet();

  const containerStyles = tw.style("bg-slate-100 rounded-xl p-5 gap-y-3");

  const onPress = () => {
    openBottomSheet("CHAPTER", { chapterId: chapter._id });
  };

  return (
    <TouchableOpacity style={containerStyles} onPress={onPress}>
      <Headline title={chapter.name} subtitle={chapter.school} />

      <IconLabel
        size="xs"
        color="tertiary"
        iconName="mail-fill"
        title="Email"
        subtitle={chapter.email}
      />
      <IconLabel
        size="xs"
        color="tertiary"
        iconName="time-fill"
        title="Last Seen"
        subtitle={dateUtil.timeAgo(chapter.lastOnline)}
      />
      <IconLabel
        size="xs"
        color="tertiary"
        iconName="calendar-fill"
        title="Created On"
        subtitle={dateUtil.toString(chapter.createdAt)}
      />
    </TouchableOpacity>
  );
};

export default Chapter;
