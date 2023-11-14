/*
 * Created on Sun Sep 10 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { View } from "react-native";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import BottomSheetBackdrop from "./Components/BottomSheetBackdrop";

import Text from "@/ui/Text";
import date from "@/lib/date";
import Badge from "@/ui/Badge";
import tw from "@/lib/tailwind";
import Layout from "@/ui/Layout";
import Skeleton from "@/ui/Skeleton";
import contentApi from "@/api/content";

interface PrivacyPolicyProps {
  innerRef: React.RefObject<any>;
  handleCloseModalPress: () => void;
  handleSnapToIndex: (index: number) => void;
  handleSnapToPosition: (position: string) => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ innerRef }) => {
  const snapPoints = useMemo(() => ["90%"], []);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Create a query to get the organization statistics
  const query = useQuery({
    queryKey: ["PrivacyPolicy"],
    enabled: isModalOpen,
    queryFn: async () => {
      return contentApi.getTermsOfService();
    },
  });

  // When the bottom sheet modal is open
  const onBottomSheetChange = (index: number) => {
    if (index === 0) {
      setIsModalOpen(true);
      return;
    }

    setIsModalOpen(false);
  };

  // The last updated date
  const lastUpdated = useMemo(() => {
    const queryDate =
      query.data?.date_updated || query.data?.date_created || new Date();

    return date.timeAgo(queryDate);
  }, [query.data?.date_updated, query.data?.date_created]);

  return (
    <BottomSheetModal
      ref={innerRef}
      index={0}
      onChange={onBottomSheetChange}
      snapPoints={snapPoints}
      style={tw`flex-1`}
      backgroundStyle={tw`bg-slate-100`}
      backdropComponent={BottomSheetBackdrop}
    >
      <Layout
        gap={8}
        scrollable
        style={tw`bg-slate-100`}
        contentContainerStyle={tw`pb-6 items-start bg-slate-100`}
      >
        {query.isLoading && <PrivacyPolicySkeleton />}

        {query.isFetched && !query.isLoading && (
          <>
            <Badge size="md">Last Updated: {lastUpdated}</Badge>
            <Text variant="header" style={tw`text-primary mb-4`}>
              Privacy Policy
            </Text>

            <View
              style={tw`items-center w-full bg-white p-4 rounded-xl shadow-sm`}
            >
              <Text variant="body">{query.data?.content}</Text>
            </View>
          </>
        )}
      </Layout>
    </BottomSheetModal>
  );
};

/**
 * The loading component for the bottom sheet
 */
const PrivacyPolicySkeleton: React.FC = () => {
  const array = useMemo(() => Array.from({ length: 25 }), []);

  return (
    <>
      <Badge size="md">Loading...</Badge>
      <Text variant="header" style={tw`text-primary mb-4`}>
        Privacy Policy
      </Text>

      <View style={tw`items-center w-full bg-white p-4 rounded-xl`}>
        {array.map((_, index) => (
          <Skeleton key={index} style={tw`mb-2`} />
        ))}
      </View>
    </>
  );
};

export default PrivacyPolicy;
