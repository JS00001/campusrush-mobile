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

import type { IconType } from "@/constants/icons";
import type { BottomSheetProps, SheetData } from "./@types";

import Tabs from "@/ui/Tabs";
import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import Headline from "@/ui/Headline";
import ListItem from "@/ui/ListItems/ListItem";
import Skeleton from "@/ui/Skeleton";
import format from "@/lib/util/format";
import { BottomSheet } from "@/ui/BottomSheet";
import { useGetEvent } from "@/hooks/api/events";
import ListItemLoader from "@/ui/Loaders/ListItem";
import ErrorMessage from "@/components/ErrorMessage";
import BottomSheetContainer from "@/ui/BottomSheet/Container";

const EventResponsesContent: React.FC<SheetData<"EVENT_RESPONSES">> = ({
  data,
}) => {
  const { eventId } = data;

  const eventQuery = useGetEvent(eventId);
  const [activeTab, setActiveTab] = useState(0);

  if (eventQuery.isLoading) return <LoadingState />;
  if (eventQuery.error)
    return (
      <ErrorMessage
        error={eventQuery.error}
        description="Could not load event responses"
      />
    );

  const responses = eventQuery.data!.responses;
  const event = format.event(eventQuery.data!.event);

  responses.sort((a, b) => {
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

  const dataMap = {
    0: responses,
    1: yesResponses,
    2: maybeResponses,
    3: noResponses,
  };
  const dataToDisplay = dataMap[activeTab];

  const getIcon = (response: "yes" | "no" | "maybe") => {
    const icon = {
      yes: "Check",
      no: "X",
      maybe: "QuestionMark",
    }[response];

    return icon as IconType;
  };

  return (
    <BottomSheetContainer style={tw`px-0`} contentContainerStyle={tw`gap-y-6`}>
      <Text type="h2" style={tw`px-6`} numberOfLines={2}>
        {event.title}
      </Text>
      <Tabs
        tabs={tabsOptions}
        currentIndex={activeTab}
        onChange={setActiveTab}
        contentContainerStyle={tw`px-6`}
      />
      <View style={tw`px-6`}>
        {!dataToDisplay?.length && (
          <Headline
            centerText
            style={tw`py-12`}
            title="No Responses"
            subtitle="There are no responses yet for this event"
          />
        )}
        {dataToDisplay && (
          <View style={tw`gap-y-2`}>
            {dataToDisplay.map((response, index) => (
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
};

const EventResponsesSheet: React.FC<BottomSheetProps> = ({ innerRef }) => {
  return (
    <BottomSheet
      innerRef={innerRef}
      enablePanDownToClose={false}
      children={(props?: SheetData<"EVENT_RESPONSES">) => {
        return <EventResponsesContent data={props!.data} />;
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
