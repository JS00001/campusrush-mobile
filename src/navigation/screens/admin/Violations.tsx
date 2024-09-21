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
import FlatList from "@/ui/FlatList";
import ListItemLoader from "@/ui/Loaders/ListItem";
import { useGetViolations } from "@/hooks/api/admin";
import { useBottomSheet } from "@/providers/BottomSheet";

const Violations = () => {
  const query = useGetViolations();
  const { openBottomSheet } = useBottomSheet();

  const getIcon = (count: number) => {
    if (count <= 2) {
      return "check-fill";
    } else if (count <= 5) {
      return "error-warning-fill";
    } else {
      return "alert-fill";
    }
  };

  const getIconColor = (count: number) => {
    if (count <= 2) {
      return tw.color("green");
    } else if (count <= 5) {
      return tw.color("yellow");
    } else {
      return tw.color("red");
    }
  };

  const onRefresh = async () => {
    await query.refetch();
  };

  return (
    <Layout.Root>
      <Layout.Header
        title="Violations"
        subtitle="View all content violations"
      />

      <Layout.Content contentContainerStyle={tw`p-0`}>
        <FlatList
          data={query.violations}
          style={tw`p-6`}
          numColumns={2}
          onRefresh={onRefresh}
          columnWrapperStyle={{ gap: 8 }}
          loadingComponent={<ListItemLoader size="lg" />}
          loading={query.isLoading}
          renderItem={({ item }) => {
            const onPress = () => {
              openBottomSheet("VIOLATIONS", { violations: item.violations });
            };

            return (
              <ListItem
                size="lg"
                title={`${item.chapter.firstName} ${item.chapter.lastName}`}
                subtitle={`${item.violations.length} Violations\nClick to View`}
                icon={getIcon(item.violations.length)}
                iconColor={getIconColor(item.violations.length)}
                onPress={onPress}
              />
            );
          }}
        />
      </Layout.Content>
    </Layout.Root>
  );
};

export default Violations;
