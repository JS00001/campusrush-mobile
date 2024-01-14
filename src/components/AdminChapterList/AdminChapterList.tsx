/*
 * Created on Thu Sep 21 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { useMemo, useState } from "react";
import { SectionList, ActivityIndicator } from "react-native";

import Text from "@/ui/Text";
import date from "@/lib/util/date";
import tw from "@/lib/tailwind";
import ListItem from "@/ui/ListItem";
import Copyable from "@/ui/Copyable";
import { formatPhoneNumber } from "@/lib/util/string";

interface AdminChapterListProps {
  chapters: Chapter[];
  loading?: boolean;
  refetchChapters?: () => Promise<void>;
}

const AdminChapterList: React.FC<AdminChapterListProps> = ({
  chapters,
  loading,
  refetchChapters,
}) => {
  const [refreshing, setRefreshing] = useState(false);

  // When chapters change, create a new list like this
  const data = useMemo(() => {
    // Reduce the chapters to an object with keys of the first letter of the name
    const reduction = chapters.reduce(
      (acc, chapter) => {
        // Check if the chapter has an entitlements array
        if (chapter.entitlements.length > 0) {
          // If yes, add it to the "Paying Chapters" data array
          (acc.paying.data as any).push(chapter);
        } else {
          // Otherwise, add it to the "Non-Paying Chapters" data array
          (acc.nonPaying.data as any).push(chapter);
        }
        return acc;
      },
      {
        // Initialize the reduction object with two categories
        paying: {
          title: "Subscribed Chapters",
          data: [],
        },
        nonPaying: {
          title: "Non-Subscribed Chapters",
          data: [],
        },
      },
    );

    // Filter out the categories that are empty (no data)
    const filtered = Object.values(reduction).filter(
      (section) => section.data.length > 0,
    );

    // Update the titles to include the number of chapters in each category
    filtered.forEach((section) => {
      section.title = `${section.title} (${section.data.length})`;
    });

    return filtered;
  }, [chapters]);

  // The components for each item in teh section list
  const ItemComponent = ({ item: chapter }: { item: Chapter }) => {
    const subtitle = [
      ``,
      `School: ${chapter.school}`,
      `Email: ${chapter.email}`,
      `Num Pnms: ${chapter.pnms.length}`,
      `Verified: ${chapter.verified}`,
      `Entitlements: ${chapter.entitlements.join(", ") || "None"}`,
      `Notifications Enabled: ${chapter.notificationsEnabled}`,
      ``,
      `Created On: ${date.toString(chapter.createdAt)}`,
      `Updated On: ${date.toString(chapter.updatedAt)}`,
      ``,
      `Phone Number: ${formatPhoneNumber(chapter.phoneNumber) || "None"}`,
      `Phone Number ID: ${chapter.phoneNumberId || "None"}`,
      `Phone Number Created On: ${
        date.toString(chapter.phoneNumberCreatedAt) || "None"
      }`,
    ].join("\n");

    return (
      <Copyable title="Copy Chapter ID" copyText={chapter._id}>
        <ListItem
          pressable={false}
          key={chapter._id}
          title={`${chapter.name} at ${chapter.school}`}
          subtitle={subtitle}
        />
      </Copyable>
    );
  };

  const ListEmptyComponent = () => {
    if (loading) {
      return new Array(20)
        .fill(0)
        .map((_, i) => (
          <ListItem key={i} title="" subtitle="" loading pressable={false} />
        ));
    } else {
      return (
        <>
          <Text variant="title" style={tw`text-center mt-16`}>
            No Chapters found
          </Text>
          <Text>This will update when chapters sign up</Text>
        </>
      );
    }
  };

  return (
    <SectionList
      sections={data}
      style={tw`w-full`}
      contentContainerStyle={tw`gap-y-2 pb-6`}
      showsVerticalScrollIndicator={false}
      renderItem={ItemComponent}
      ListEmptyComponent={ListEmptyComponent}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={tw`bg-white w-full font-medium`}>{title}</Text>
      )}
      refreshing={refreshing}
      onRefresh={async () => {
        setRefreshing(true);
        await refetchChapters?.();
        setRefreshing(false);
      }}
    />
  );
};

export default AdminChapterList;
