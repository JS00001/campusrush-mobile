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
import RemixIcon from "react-native-remix-icon";

import BottomSheet from "./Components/BottomSheet";
import BottomSheetContainer from "./Components/BottomSheetContainer";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import Information from "@/ui/Information";
import useEntitlementsStore from "@/state/entitlements";

interface PlanComparisonProps {
  innerRef: React.RefObject<any>;
  handleCloseModalPress: () => void;
}

const PlanComparison: React.FC<PlanComparisonProps> = ({ innerRef }) => {
  // Import the product data
  const entitlementDetails = useEntitlementsStore(
    (state) => state.entitlementDetails,
  );

  // Get the product display names
  const productDisplayNames = useMemo(() => {
    const { products } = entitlementDetails || {};
    // Return the product display names
    // prettier-ignore
    return Object.values(products || {}).map((product) => product?.DISPLAY_NAME);
  }, [entitlementDetails]);

  return (
    <BottomSheet
      innerRef={innerRef}
      children={() => (
        <BottomSheetContainer style={tw`px-0`}>
          <View style={tw`items-center gap-y-2 p-6`}>
            <Text variant="title">Plan Comparison</Text>
            <Text variant="body" style={tw`text-center`}>
              CampusRush offers the best recruitment experience for greek
              chapters of all sizes.
            </Text>
          </View>

          {/* The plan comparison table */}
          <View style={tw`flex-1 w-full`}>
            {/* The header row of the table */}
            <FeatureRow
              feature={{ name: "Feature", header: true }}
              values={productDisplayNames}
            />

            {Object.keys(entitlementDetails?.productPerks || {}).map(
              (perkKey, i) => {
                // The perk itself, has a name and description
                // prettier-ignore
                const perk = entitlementDetails?.productPerks[perkKey as ProductPerkIds];

                // The values of the perk, for each product
                // prettier-ignore
                const values = Object.keys(entitlementDetails?.products || {}).map((productKey) => {
                  // prettier-ignore
                  const product = entitlementDetails?.products[productKey as ProductId];
                  // prettier-ignore
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
              },
            )}
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
  // Styling for the container
  const containerClasses = tw.style(
    `w-full p-4 flex-1 flex-row items-center`,
    index % 2 === 0 ? `bg-white` : "bg-slate-100",
    // Add a border bottom to all rows, add a border top to the header row
    feature.header
      ? `border-t border-b border-slate-200`
      : `border-b border-slate-200`,
  );

  // The text variant for the feature name, if its the table header, use body, otherwise use text
  const featureNameTextVariant = feature.header ? "body" : "text";

  // Whether to show a check or an x for the boolean values
  const booleanComponents = {
    true: (
      <RemixIcon
        name="ri-checkbox-circle-line"
        size={20}
        color={tw.color(`green-500`)}
      />
    ),
    false: (
      <RemixIcon
        name="ri-close-circle-line"
        size={20}
        color={tw.color(`slate-400`)}
      />
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
        <Text
          variant={featureNameTextVariant}
          style={tw`text-slate-500 font-medium`}
        >
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
            <Text variant={featureNameTextVariant} style={tw`text-center`}>
              {value}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

export default PlanComparison;
