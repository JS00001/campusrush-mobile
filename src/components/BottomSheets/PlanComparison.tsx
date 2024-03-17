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

import { useMemo } from "react";
import { View } from "react-native";

import type { BottomSheetProps } from "./@types";

import Icon from "@/ui/Icon";
import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import Headline from "@/ui/Headline";
import Information from "@/ui/Information";
import { useEntitlementStore } from "@/store";
import { BottomSheet } from "@/ui/BottomSheet";
import BottomSheetContainer from "@/ui/BottomSheet/Container";

const PlanComparisonSheet: React.FC<BottomSheetProps> = ({ innerRef }) => {
  const entitlements = useEntitlementStore((state) => state.entitlements);

  const packageDisplayNames = useMemo(() => {
    const products = entitlements?.products;

    if (!products) return [];

    const displayNames = Object.values(products).map(
      (product) => product.DISPLAY_NAME,
    );

    return displayNames;
  }, [entitlements]);

  return (
    <BottomSheet
      innerRef={innerRef}
      children={() => (
        <BottomSheetContainer style={tw`px-0`}>
          <Headline
            centerText
            style={tw`p-6`}
            title="Plan Comparison"
            subtitle="CampusRush offers the best recruitment experience for greek chapters of all sizes."
          />

          <View style={tw`flex-1 w-full`}>
            {/* The header row of the table */}
            <FeatureRow
              feature={{ name: "Feature", header: true }}
              values={packageDisplayNames}
            />

            {Object.keys(entitlements?.productPerks || {}).map((perkKey, i) => {
              // prettier-ignore
              const perk = entitlements?.productPerks[perkKey as ProductPerkIds];

              // prettier-ignore
              const values = Object.keys(entitlements?.products || {}).map((productKey) => {
                  const product = entitlements?.products[productKey as ProductId];
                  return product?.ALL_PERKS?.[perkKey as ProductPerkIds] || false;
                });

              if (!perk) return null;

              return (
                <FeatureRow
                  key={perkKey}
                  index={i}
                  feature={{ name: perk.name, description: perk.description }}
                  values={values}
                />
              );
            })}
          </View>
        </BottomSheetContainer>
      )}
    />
  );
};

interface FeatureRowProps {
  index?: number;
  feature: {
    name: string;
    header?: boolean;
    description?: string;
  };
  values: (boolean | string | number)[];
}

const FeatureRow: React.FC<FeatureRowProps> = ({
  feature,
  values,
  index = 1,
}) => {
  const isEvenRow = index % 2 === 0;

  const containerClasses = tw.style(
    `w-full p-4 flex-1 flex-row items-center`,
    isEvenRow ? `bg-white` : "bg-slate-100",
    // Add a border bottom to all rows, add a border top to the header row
    feature.header
      ? `border-t border-b border-slate-200`
      : `border-b border-slate-200`,
  );

  const featureNameTextType = feature.header ? "p2" : "p3";

  const booleanComponents = {
    true: (
      <Icon size={20} name="checkbox-circle-line" color={tw.color(`green`)} />
    ),
    false: (
      <Icon size={20} name="close-circle-line" color={tw.color(`slate-400`)} />
    ),
  };

  return (
    <View style={containerClasses}>
      {/* The feature and its information */}
      <View style={tw`flex-3 flex-row items-center gap-x-2 mr-2`}>
        {/* If there is a description, show it */}
        {feature.description && (
          <Information tooltip={feature.description} size="sm" />
        )}
        <Text type={featureNameTextType} style={tw`text-slate-500 font-medium`}>
          {feature.name}
        </Text>
      </View>

      {values.map((value, i) => {
        // If the value is a boolean, show the boolean component
        if (typeof value === "boolean") {
          return (
            <View key={i} style={tw`flex-1 items-center`}>
              {booleanComponents[value.toString() as "true" | "false"]}
            </View>
          );
        }

        // If the value is a string or a number, show the value
        return (
          <View key={i} style={tw`flex-1 items-center`}>
            <Text type={featureNameTextType} style={tw`text-center`}>
              {value}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

export default PlanComparisonSheet;
