/*
 * Created on Fri Mar 15 2024
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

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";

interface EventDateProps {
  month: string;
  day: string;
  weekday: string;
}

const EventDate: React.FC<EventDateProps> = ({ month, day, weekday }) => {
  const containerStyles = tw.style(
    "bg-white border border-slate-200 shadow w-14",
    "pt-1 rounded-xl items-center",
  );

  const monthStyles = tw.style(
    "text-[10px] text-slate-500 uppercase leading-4",
  );

  const weekdayContainerStyles = tw.style(
    "bg-slate-100 border-t border-slate-200 ",
    "mt-0.5 py-0.5 w-full rounded-b-xl",
  );

  const weekdayStyles = tw.style(
    "text-[10px] text-slate-500 uppercase text-center",
  );

  return (
    <View style={containerStyles}>
      <Text style={monthStyles}>{month}</Text>

      <Text type="h3" style={tw`leading-6`}>
        {day}
      </Text>

      <View style={weekdayContainerStyles}>
        <Text style={weekdayStyles}>{weekday}</Text>
      </View>
    </View>
  );
};

export default EventDate;
