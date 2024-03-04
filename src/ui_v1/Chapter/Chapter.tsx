/*
 * Created on Mon Mar 04 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { TouchableOpacity, View } from "react-native";
import RemixIcon from "react-native-remix-icon";

import Text from "@/ui_v1/Text";
import tw from "@/lib/tailwind";
import dateUtil from "@/lib/util/date";
import { useBottomSheets } from "@/providers/BottomSheet";

interface ChapterProps {
  chapter: Chapter;
}

const Chapter: React.FC<ChapterProps> = ({ chapter }) => {
  const { openBottomSheet } = useBottomSheets();

  const containerStyles = tw.style("bg-slate-100 rounded-xl p-5 gap-y-3");

  const onPress = () => {
    openBottomSheet("CHAPTER", { chapterId: chapter._id });
  };

  return (
    <TouchableOpacity style={containerStyles} onPress={onPress}>
      <View>
        <Text variant="title">{chapter.name}</Text>
        <Text>Created {dateUtil.toString(chapter.createdAt)}</Text>
      </View>

      <View style={tw`flex-row items-center gap-2`}>
        <View style={tw`p-2 rounded-full bg-slate-200`}>
          <RemixIcon
            name="government-fill"
            size={16}
            color={tw.color("primary")}
          />
        </View>

        <Text variant="body">{chapter.school}</Text>
      </View>

      <View style={tw`flex-row items-center gap-2`}>
        <View style={tw`p-2 rounded-full bg-slate-200`}>
          <RemixIcon name="time-fill" size={16} color={tw.color("primary")} />
        </View>

        <Text variant="body">
          Last Seen {dateUtil.timeAgo(chapter.lastOnline)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Chapter;
