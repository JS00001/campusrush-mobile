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

import { useMemo } from "react";
import { View } from "react-native";

import { BottomSheetProps } from "./@types";

import Text from "@/ui/Text";
import Badge from "@/ui/Badge";
import tw from "@/lib/tailwind";
import date from "@/lib/util/date";
import Skeleton from "@/ui/Skeleton";
import { BottomSheet } from "@/ui/BottomSheet";
import { useGetPrivacyPolicy } from "@/hooks/api/content";
import BottomSheetContainer from "@/ui/BottomSheet/Container";

const PrivacyPolicySheet: React.FC<BottomSheetProps> = ({ innerRef }) => {
  const query = useGetPrivacyPolicy();

  const lastUpdated = useMemo(() => {
    const queryDate =
      query.data?.date_updated || query.data?.date_created || new Date();

    return date.timeAgo(queryDate);
  }, [query.data?.date_updated, query.data?.date_created]);

  const contentContainerStyle = tw.style(
    "w-full p-4",
    "items-center bg-white rounded-xl shadow-sm",
  );

  return (
    <BottomSheet
      innerRef={innerRef}
      backgroundStyle={tw`bg-slate-100`}
      children={() => (
        <BottomSheetContainer
          style={tw`bg-slate-100`}
          contentContainerStyle={tw`bg-slate-100`}
        >
          {query.isLoading && <PrivacyPolicySkeleton />}

          {query.isFetched && !query.isLoading && (
            <>
              <Badge size="md" style={tw`self-start`}>
                Last Updated: {lastUpdated}
              </Badge>
              <Text variant="header" style={tw`text-primary mb-4`}>
                Privacy Policy
              </Text>

              <View style={contentContainerStyle}>
                <Text variant="body">
                  {query.data?.content.split("**").map((item, index) => {
                    const isFirstOccurrance = index % 2 === 0;

                    if (isFirstOccurrance) {
                      return item;
                    }

                    return (
                      <Text
                        key={index}
                        variant="body"
                        style={tw`text-primary font-bold`}
                      >
                        {item}
                      </Text>
                    );
                  })}
                </Text>
              </View>
            </>
          )}
        </BottomSheetContainer>
      )}
    />
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

export default PrivacyPolicySheet;
