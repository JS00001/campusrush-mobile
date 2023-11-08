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
import { SectionList } from "react-native";

import Text from "@/ui/Text";
import date from "@/lib/date";
import tw from "@/lib/tailwind";
import ListItem from "@/ui/ListItem";
import Copyable from "@/ui/Copyable";
import { formatPhoneNumber } from "@/lib/format";

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
    const subtitle = [
      `School: ${organization.school}`,
      `Email: ${organization.email}`,
      `Num Pnms: ${organization.pnms.length}`,
      `Verified: ${organization.verified}`,
      `Entitlements: ${organization.entitlements.join(", ") || "None"}`,
      `Notifications Enabled: ${organization.notificationsEnabled}`,
      `Created On: ${date.toString(organization.createdAt)}`,
      `Updated On: ${date.toString(organization.updatedAt)}`,
      `-----------------------`,
      `Phone Number: ${formatPhoneNumber(organization.phoneNumber) || "None"}`,
      `Phone Number ID: ${organization.phoneNumberId || "None"}`,
      `Phone Number Created On: ${
        date.toString(organization.phoneNumberCreatedAt) || "None"
      }`,
    ].join("\n");

    return (
      <Copyable title="Copy Organization ID" copyText={organization._id}>
        <ListItem
          pressable={false}
          key={organization._id}
          title={organization.name}
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
            No Organizations found
          </Text>
          <Text>This will update when organizations sign up</Text>
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
    />
  );
};

export default AdminOrganizationList;
