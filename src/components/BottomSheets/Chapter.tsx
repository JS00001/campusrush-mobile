/*
 * Created on Mon Feb 26 2024
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

import { BottomSheetProps } from "./@types";

import tw from "@/lib/tailwind";
import date from "@/lib/util/date";
import Skeleton from "@/ui/Skeleton";
import Headline from "@/ui/Headline";
import useCopy from "@/hooks/useCopy";
import { Detail } from "@/ui/DetailView";
import IconButton from "@/ui/IconButton";
import { BottomSheet } from "@/ui/BottomSheet";
import { formatPhoneNumber } from "@/lib/util/string";
import { useGetAdminChapter } from "@/hooks/api/admin";
import BottomSheetContainer from "@/ui/BottomSheet/Container";

const ChapterSheet: React.FC<BottomSheetProps> = ({ innerRef }) => {
  return (
    <BottomSheet
      innerRef={innerRef}
      children={(data) => {
        const copy = useCopy();
        const chapterId = data?.data.chapterId;

        const chapterQuery = useGetAdminChapter(chapterId);
        const chapter = chapterQuery.chapter;

        const copyId = () => {
          copy(chapterId, "Chapter ID");
        };

        if (!chapter) {
          return <LoadingState />;
        }

        return (
          <BottomSheetContainer>
            <View style={tw`mb-2 flex-row justify-between items-center`}>
              <Headline
                style={tw`shrink`}
                title={chapter.name}
                subtitle={chapter.school}
              />

              <IconButton
                size="sm"
                color="secondary"
                label="Copy ID"
                iconName="file-copy-2-line"
                onPress={copyId}
              />
            </View>

            <Detail.View>
              <Detail.Item title="Email" value={chapter.email} />
              <Detail.Item title="First Name" value={chapter.firstName} />
              <Detail.Item title="Last Name" value={chapter.lastName} />
              <Detail.Item
                title="PNM Count"
                value={`${chapter.pnms.length || "--"}`}
              />
              <Detail.Item
                title="Entitlements"
                value={chapter.entitlements.join(", ")}
              />
              <Detail.Item
                title="Custom Phone Number"
                value={formatPhoneNumber(chapter.phoneNumber) || "--"}
              />
              <Detail.Item
                title="Last Seen"
                value={date.timeAgo(chapter.lastOnline)}
              />
              <Detail.Item
                title="Created On"
                value={date.toString(chapter.createdAt)}
              />
            </Detail.View>
          </BottomSheetContainer>
        );
      }}
    />
  );
};

const LoadingState = () => {
  return (
    <BottomSheetContainer>
      <View style={tw`mb-2 flex-row justify-between items-center gap-2`}>
        <View style={tw`flex-1 gap-2`}>
          <Skeleton height={24} />
          <Skeleton width={"75%"} height={16} />
        </View>

        <View style={tw`flex-row gap-1`}>
          <Skeleton width={72} height={48} borderRadius={999} />
        </View>
      </View>

      <Skeleton height={400} />
    </BottomSheetContainer>
  );
};

export default ChapterSheet;
