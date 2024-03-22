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
import Toast from "react-native-toast-message";

import {
  useGetAdminChapter,
  useGetAdminChapterEntitlements,
  useRevokeAdminChapterEntitlement,
} from "@/hooks/api/admin";
import useCopy from "@/hooks/useCopy";
import { UseSheetFlowProps } from "@/hooks/useSheetFlow";

import tw from "@/lib/tailwind";
import date from "@/lib/util/date";
import Headline from "@/ui/Headline";
import Skeleton from "@/ui/Skeleton";
import { Detail } from "@/ui/DetailView";
import IconButton from "@/ui/IconButton";
import Menu, { MenuAction } from "@/ui/Menu";
import { formatPhoneNumber, titleCase } from "@/lib/util/string";

interface LandingProps extends UseSheetFlowProps {
  chapterId: string;
}

const Landing: React.FC<LandingProps> = ({ chapterId, nextView }) => {
  const copy = useCopy();

  const chapterQuery = useGetAdminChapter(chapterId);
  const entitlementQuery = useGetAdminChapterEntitlements(chapterId);
  const revokeEntitlementMutation = useRevokeAdminChapterEntitlement();

  const chapter = chapterQuery.chapter;
  const entitlements = entitlementQuery.entitlements.filter(
    (entitlement) => entitlement.active,
  );

  const informationMenu: MenuAction[] = [
    {
      id: "COPY_ID",
      title: "Copy User ID",
      image: "doc.on.clipboard",
      onPress: () => copy(chapterId, "Chapter ID"),
    },
    {
      id: "COPY_CUSTOMER_ID",
      title: "Copy Customer ID",
      image: "doc.on.clipboard",
      onPress: () => copy(chapter?.customerId || "", "Customer ID"),
    },
    {
      id: "GRANT_ENTITLEMENTS",
      title: "Grant Entitlements",
      image: "creditcard.fill",
      onPress: () => nextView(),
    },
  ];

  const handleRevocation = async (entitlementId: string) => {
    const res = await revokeEntitlementMutation.mutateAsync({
      id: chapterId,
      entitlementId,
    });

    if ("error" in res) return;

    await entitlementQuery.refetch();

    Toast.show({
      type: "success",
      text1: "Entitlement Revoked",
      text2: "The entitlement has been successfully revoked",
    });
  };

  if (!chapter || !entitlements) {
    return <LoadingState />;
  }

  return (
    <View style={tw`gap-y-4`}>
      <View style={tw`flex-row justify-between items-center`}>
        <Headline
          style={tw`shrink`}
          title={chapter.name}
          subtitle={chapter.school}
        />

        <Menu actions={informationMenu}>
          <IconButton size="sm" color="secondary" iconName="more-fill" />
        </Menu>
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

      <Headline
        title="Billing Information"
        subtitle="Long press to revoke an entitlement"
      />

      {!entitlements.length && (
        <Headline
          centerText
          title="No Entitlements Found"
          subtitle="Grant one to get started"
        />
      )}

      {entitlements.map((entitlement) => {
        const entitlementActions = [
          {
            id: "REVOKE_ENTITLEMENT",
            title: "Revoke Entitlement",
            image: "trash.fill",
            attributes: {
              destructive: true,
              disabled: entitlement.source !== "manual",
            },
            onPress: () => {
              handleRevocation(entitlement.id);
            },
          },
        ];

        return (
          <Menu key={entitlement.id} actions={entitlementActions}>
            <Detail.View>
              <Detail.Item
                title="Entitlement ID"
                value={titleCase(entitlement.id)}
              />
              <Detail.Item
                title="Expires At"
                value={date.toString(new Date(entitlement.expires * 1000))}
              />
              <Detail.Item
                title="Source"
                value={titleCase(entitlement.source)}
              />
              <Detail.Item
                title="Revokeable?"
                value={entitlement.source === "manual" ? "Yes" : "No"}
              />
            </Detail.View>
          </Menu>
        );
      })}
    </View>
  );
};

const LoadingState = () => {
  return (
    <View style={tw`gap-y-4`}>
      <View style={tw`flex-row justify-between items-center gap-2`}>
        <View style={tw`flex-1 gap-2`}>
          <Skeleton height={24} />
          <Skeleton width={"75%"} height={16} />
        </View>

        <View style={tw`flex-row gap-1`}>
          <Skeleton width={48} height={48} borderRadius={999} />
        </View>
      </View>

      <Skeleton height={400} />

      <View style={tw`flex-1 gap-2`}>
        <Skeleton height={24} />
        <Skeleton width={"75%"} height={16} />
      </View>

      <Skeleton height={200} />
    </View>
  );
};

export default Landing;
