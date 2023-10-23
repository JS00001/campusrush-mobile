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

import { useMemo } from "react";
import { SectionList, View } from "react-native";
import { MenuView } from "@react-native-menu/menu";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import ListItem from "@/ui/ListItem";

interface AdminOrganizationListProps {
  organizations: Organization[];
  loading?: boolean;
}

const AdminOrganizationList: React.FC<AdminOrganizationListProps> = ({
  organizations,
  loading,
}) => {
  // When organizations change, create a new list like this
  const data = useMemo(() => {
    // Reduce the organizations to an object with keys of the first letter of the name
    const reduction = organizations.reduce(
      (acc, organization) => {
        // Check if the organization has an entitlements array
        if (organization.entitlements.length > 0) {
          // If yes, add it to the "Paying Organizations" data array
          (acc.paying.data as any).push(organization);
        } else {
          // Otherwise, add it to the "Non-Paying Organizations" data array
          (acc.nonPaying.data as any).push(organization);
        }
        return acc;
      },
      {
        // Initialize the reduction object with two categories
        paying: {
          title: "Paying Organizations",
          data: [],
        },
        nonPaying: {
          title: "Non-Paying Organizations",
          data: [],
        },
      },
    );

    // Filter out the categories that are empty (no data)
    const filtered = Object.values(reduction).filter(
      (section) => section.data.length > 0,
    );

    return filtered;
  }, [organizations]);

  // The components for each item in teh section list
  const ItemComponent = ({ item: organization }: { item: Organization }) => {
    const subtitle = `School: ${organization.school}\nEmail: ${organization.email}\nVerified: ${organization.verified}\nNum Pnms: ${organization.pnms.length}`;

    return (
      <MenuView
        title="Organization Actions"
        actions={[
          {
            id: "copy-id",
            title: "Copy ID",
          },
        ]}
        shouldOpenOnLongPress
      >
        <ListItem
          pressable={false}
          key={organization._id}
          title={organization.name}
          subtitle={subtitle}
        />
      </MenuView>
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
            No Organizations found
          </Text>
          <Text>This will update when organizations sign up</Text>
        </>
      );
    }
  };

  return (
    <View>
      <SectionList
        sections={data}
        contentContainerStyle={tw`gap-y-2`}
        showsVerticalScrollIndicator={false}
        renderItem={ItemComponent}
        ListEmptyComponent={ListEmptyComponent}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={tw`bg-white w-full font-medium`}>{title}</Text>
        )}
      />
    </View>
  );
};

export default AdminOrganizationList;
