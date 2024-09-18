/*
 * Created on Fri Aug 30 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import tw from "@/lib/tailwind";
import { Layout } from "@/ui/Layout";
import ListItem from "@/ui/ListItem";
import { useGetAdminStatistics } from "@/hooks/api/admin";
import FlatList from "@/ui/FlatList";
import ListItemLoader from "@/ui/Loaders/ListItem";

const Statistics = () => {
  const statistics = useGetAdminStatistics();

  const iconName = (change: number) => {
    if (change > 0) {
      return "arrow-up-line";
    } else if (change < 0) {
      return "arrow-down-line";
    } else {
      return "arrow-right-line";
    }
  };

  const iconColor = (change: number) => {
    if (change > 0) {
      return tw.color("green");
    } else if (change < 0) {
      return tw.color("red");
    } else {
      return tw.color("slate-500");
    }
  };

  const upOrDown = (change: number) => {
    if (change > 0) {
      return `up ${change}`;
    } else if (change < 0) {
      return `down ${change}`;
    } else {
      return "no change";
    }
  };

  const data = [
    {
      title: `PNMs\n(${upOrDown(statistics.pnms.change)})`,
      current: statistics.pnms.current,
      change: statistics.pnms.change,
    },
    {
      title: `Avg PNMs per Chapter\n(${upOrDown(statistics.avgPnmsPerChapter.change)})`,
      current: statistics.avgPnmsPerChapter.current,
      change: statistics.avgPnmsPerChapter.change,
    },
    {
      title: `Conversations\n(${upOrDown(statistics.conversations.change)})`,
      current: statistics.conversations.current,
      change: statistics.conversations.change,
    },
    {
      title: `Avg Conversations per Chapter\n(${upOrDown(statistics.avgConversationsPerChapter.change)})`,
      current: statistics.avgConversationsPerChapter.current,
      change: statistics.avgConversationsPerChapter.change,
    },
    {
      title: `Messages\n(${upOrDown(statistics.messages.change)})`,
      current: statistics.messages.current,
      change: statistics.messages.change,
    },
    {
      title: `Avg Messages per Conversation\n(${upOrDown(statistics.avgMessagesPerConversation.change)})`,
      current: statistics.avgMessagesPerConversation.current,
      change: statistics.avgMessagesPerConversation.change,
    },
    {
      title: `Chapters\n(${upOrDown(statistics.chapters.change)})`,
      current: statistics.chapters.current,
      change: statistics.chapters.change,
    },
    {
      title: `Pro Chapters\n(${upOrDown(statistics.proChapters.change)})`,
      current: statistics.proChapters.current,
      change: statistics.proChapters.change,
    },
  ];

  const onRefresh = async () => {
    await statistics.refetch();
  };

  return (
    <Layout.Root>
      <Layout.Header
        hasBackButton
        title="Statistics"
        subtitle="View all statistics for the application"
      />

      <Layout.Content contentContainerStyle={tw`p-0`}>
        <FlatList
          data={data}
          style={tw`p-6`}
          numColumns={2}
          onRefresh={onRefresh}
          columnWrapperStyle={{ gap: 8 }}
          loadingComponent={<ListItemLoader size="lg" />}
          loading={statistics.isLoading}
          renderItem={({ item }) => {
            return (
              <ListItem
                size="sm"
                titleStyle={tw`text-[32px] font-semibold leading-9`}
                pressable={false}
                title={item.current.toString()}
                subtitle={item.title}
                icon={iconName(item.change)}
                iconColor={iconColor(item.change)}
              />
            );
          }}
        />
      </Layout.Content>
    </Layout.Root>
  );
};

export default Statistics;
