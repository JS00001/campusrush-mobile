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
import { titleCase } from "@/lib/util/string";
import { BottomSheetProps, SheetData } from "./@types";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import date from "@/lib/util/date";
import ListItem from "@/ui/ListItem";
import CopyAction from "@/ui/CopyAction";
import { BottomSheet } from "@/ui/BottomSheet";
import BottomSheetContainer from "@/ui/BottomSheet/Container";

const ViolationsSheet: React.FC<BottomSheetProps> = ({ innerRef }) => {
  return (
    <BottomSheet
      innerRef={innerRef}
      enablePanDownToClose={false}
      children={(props?: SheetData<"VIOLATIONS">) => {
        const { violations } = props!.data;

        const getIcon = (violation: string) => {
          switch (violation.toLowerCase()) {
            case "nudity":
              return "body-scan-fill";
            case "drugs":
              return "syringe-fill";
            case "gore":
              return "emotion-unhappy-fill";
            case "weapon":
              return "knife-blood-fill";
            case "minors":
              return "parent-fill";
            default:
              return "question-fill";
          }
        };

        return (
          <BottomSheetContainer contentContainerStyle={tw`gap-y-6`}>
            <View>
              <Text type="h1">Violations ({violations.length})</Text>
              <Text>
                The following content has been flagged by the system for
                violating S.H.A.F.T. guidelines.
              </Text>
            </View>

            <View style={tw`gap-2`}>
              {violations.map((violation, i) => (
                <CopyAction
                  key={i}
                  title="Copy Media ID"
                  content={violation.mediaId}
                >
                  <ListItem
                    size="lg"
                    pressable={false}
                    icon={getIcon(violation.type)}
                    title={`Content Contained: ${titleCase(violation.type)}`}
                    subtitle={`${date.toString(violation.createdAt)}\n${violation.mediaId}`}
                  />
                </CopyAction>
              ))}
            </View>
          </BottomSheetContainer>
        );
      }}
    />
  );
};

export default ViolationsSheet;
