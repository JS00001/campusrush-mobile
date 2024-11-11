/*
 * Created on Sun Feb 25 2024
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

import type { BottomSheetProps } from "./@types";

import Icon from "@/ui/Icon";
import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import Skeleton from "@/ui/Skeleton";
import Information from "@/ui/Information";
import { BottomSheet } from "@/ui/BottomSheet";
import ErrorMessage from "@/components/ErrorMessage";
import { useGetMetadata } from "@/hooks/api/external";
import BottomSheetContainer from "@/ui/BottomSheet/Container";

const PlanComparisonSheet: React.FC<BottomSheetProps> = ({ innerRef }) => {
  return (
    <BottomSheet
      innerRef={innerRef}
      children={() => {
        const metadataQuery = useGetMetadata();

        // Loading and Error states
        if (metadataQuery.isLoading) return <LoadingState />;
        if (metadataQuery.error)
          return (
            <ErrorMessage
              error={metadataQuery.error}
              description="Could not fetch feature comparison data"
            />
          );

        const entitlements = metadataQuery.data?.entitlements;

        return (
          <BottomSheetContainer style={tw`px-0`}>
            <View style={tw`items-center p-6 gap-y-1`}>
              <Text type="h1">Features</Text>
              <Text type="p1">
                CampusRush offers the best recruitment experience for greek
                chapters of all sizes.
              </Text>
            </View>

            <View style={tw`flex-1 w-full`}>
              {(entitlements?.perks.all || []).map((perk, i) => {
                return <FeatureRow key={i} index={i} feature={perk} />;
              })}
            </View>
          </BottomSheetContainer>
        );
      }}
    />
  );
};

interface FeatureRowProps {
  index?: number;
  feature: {
    title: string;
    description: string;
    value: string | number | boolean;
  };
}

const FeatureRow: React.FC<FeatureRowProps> = ({ feature, index = 1 }) => {
  const isOddRow = index % 2 === 1;

  const containerClasses = tw.style(
    `w-full p-4 flex-1 flex-row items-center`,
    isOddRow ? `bg-white` : "bg-gray-100",
    // Add a border bottom to all rows, add a border top to the header row
    index === 0
      ? `border-t border-b border-gray-200`
      : `border-b border-gray-200`,
  );

  const booleanComponents = {
    true: <Icon size={20} icon="CheckCircle" color={tw.color(`green`)} />,
    false: <Icon size={20} icon="XCircle" color={tw.color(`gray-400`)} />,
  };

  return (
    <View style={containerClasses}>
      {/* The feature and its information */}
      <View style={tw`flex-3 flex-row items-center gap-x-2 mr-2`}>
        {/* If there is a description, show it */}
        {feature.description && (
          <Information tooltip={feature.description} size="sm" />
        )}
        <Text type="p3" style={tw`text-gray-500 font-medium`}>
          {feature.title}
        </Text>
      </View>

      {typeof feature.value === "boolean" ? (
        <View style={tw`flex-1 items-center`}>
          {booleanComponents[feature.value.toString() as "true" | "false"]}
        </View>
      ) : (
        <View style={tw`flex-1 items-center`}>
          <Text type="p3" style={tw`text-center`}>
            {feature.value}
          </Text>
        </View>
      )}
    </View>
  );
};

const LoadingState = () => {
  return (
    <BottomSheetContainer style={tw`px-4`}>
      <View style={tw`items-center p-6 gap-y-1`}>
        <Skeleton height={48} width={200} />
        <Skeleton height={54} width="100%" />
      </View>

      <Skeleton height={500} width="100%" />
    </BottomSheetContainer>
  );
};

export default PlanComparisonSheet;
