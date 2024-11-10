/*
 * Created on Fri Aug 23 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { useState } from "react";
import { View } from "react-native";
import type { RemixIconType } from "@campusrush/remixicon-native";

import type { BottomSheetProps, SheetData } from "./@types";

import Tabs from "@/ui/Tabs";
import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import Headline from "@/ui/Headline";
import ListItem from "@/ui/ListItem";
import Skeleton from "@/ui/Skeleton";
import format from "@/lib/util/format";
import { BottomSheet } from "@/ui/BottomSheet";
import { useGetEvent } from "@/hooks/api/events";
import ListItemLoader from "@/ui/Loaders/ListItem";
import BottomSheetContainer from "@/ui/BottomSheet/Container";

const EventResponsesSheet: React.FC<BottomSheetProps> = ({ innerRef }) => {
  return (
    <BottomSheet
      innerRef={innerRef}
      enablePanDownToClose={false}
      children={(props?: SheetData<"EVENT_RESPONSES">) => {
        const { eventId } = props!.data;

        const eventQuery = useGetEvent(eventId);
        const [activeTab, setActiveTab] = useState(0);

        // PR_TODO: Loading and Error States
        if (eventQuery.isLoading) return <LoadingState />;
        if (eventQuery.isError) return <Text>Error</Text>;

        const event = format.event(eventQuery.data!.event);
        // Get all responses, and ensure they are sorted by yes, maybe, no
        const responses = eventQuery.data!.responses.sort((a, b) => {
          const order = { yes: 0, maybe: 1, no: 2 };
          return order[a.response] - order[b.response];
        });

        const yesResponses = responses.filter((r) => r.response === "yes");
        const noResponses = responses.filter((r) => r.response === "no");
        const maybeResponses = responses.filter((r) => r.response === "maybe");

        const tabsOptions = [
          `All (${responses.length})`,
          `Yes (${yesResponses.length})`,
          `Maybe (${maybeResponses.length})`,
          `No (${noResponses.length})`,
        ];

        const data = {
          0: responses,
          1: yesResponses,
          2: maybeResponses,
          3: noResponses,
        }[activeTab];

        const getIcon = (response: "yes" | "no" | "maybe") => {
          const icon = {
            yes: "check-fill",
            no: "close-fill",
            maybe: "question-mark",
          }[response];

          return icon as RemixIconType;
        };

        if (!event || !responses) return <LoadingState />;

        return (
          <BottomSheetContainer
            style={tw`px-0`}
            contentContainerStyle={tw`gap-y-6`}
          >
            <Text type="h1" style={tw`px-6`} numberOfLines={2}>
              {event.title}
            </Text>

            <Tabs
              options={tabsOptions}
              currentIndex={activeTab}
              onChange={setActiveTab}
              contentContainerStyle={tw`px-6`}
            />

            <View style={tw`px-6`}>
              {!data?.length && (
                <Headline
                  centerText
                  style={tw`py-12`}
                  title="No Responses"
                  subtitle="There are no responses yet for this event"
                />
              )}

              {data && (
                <View style={tw`gap-y-2`}>
                  {data.map((response, index) => (
                    <ListItem
                      key={index}
                      size="md"
                      pressable={false}
                      title={response.pnm.displayName}
                      subtitle={format.phoneNumber(response.pnm.phoneNumber)}
                      icon={getIcon(response.response)}
                    />
                  ))}
                </View>
              )}
            </View>
          </BottomSheetContainer>
        );
      }}
    />
  );
};

const LoadingState = () => {
  return (
    <BottomSheetContainer contentContainerStyle={tw`gap-y-6`}>
      <Skeleton height={42} width={200} />
      <Skeleton height={36} width={"100%"} />

      <View style={tw`gap-y-2`}>
        {new Array(5).fill(0).map((_, index) => (
          <ListItemLoader size="md" key={index} />
        ))}
      </View>
    </BottomSheetContainer>
  );
};

export default EventResponsesSheet;
