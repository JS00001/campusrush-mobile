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

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import date from "@/lib/util/date";
import Skeleton from "@/ui/Skeleton";
import DetailView from "@/ui/DetailView";
import { BottomSheet } from "@/ui/BottomSheet";
import BottomSheetContainer from "@/ui/BottomSheet/Container";
import { useGetAdminChapter } from "@/hooks/api/admin";
import { formatPhoneNumber } from "@/lib/util/string";

const ChapterSheet: React.FC<BottomSheetProps> = ({ innerRef }) => {
  return (
    <BottomSheet
      innerRef={innerRef}
      children={(data) => {
        const chapterId = data?.data.chapterId;

        const chapterQuery = useGetAdminChapter(chapterId);
        const chapter = chapterQuery.chapter;

        if (!chapter) {
          return <LoadingState />;
        }

        return (
          <BottomSheetContainer>
            <View style={tw`mb-2 flex-row justify-between items-center`}>
              <View style={tw`shrink`}>
                <Text variant="title">{chapter.name}</Text>
                <Text variant="body">{chapter.school}</Text>
              </View>
            </View>

            <DetailView>
              <DetailView.Section title="Email" content={chapter.email} />
              <DetailView.Section
                title="First Name"
                content={chapter.firstName}
              />
              <DetailView.Section
                title="Last Name"
                content={chapter.lastName}
              />
              <DetailView.Section
                title="PNM Count"
                content={`${chapter.pnms.length || "--"}`}
              />
              <DetailView.Section
                title="Entitlements"
                content={chapter.entitlements.join(", ") || "--"}
              />
              <DetailView.Section
                title="Custom Phone Number"
                content={formatPhoneNumber(chapter.phoneNumber) || "--"}
              />
              <DetailView.Section
                title="Last Seen"
                content={date.timeAgo(chapter.lastOnline)}
              />
              <DetailView.Section
                title="Created On"
                content={date.toString(chapter.createdAt)}
              />
            </DetailView>
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
