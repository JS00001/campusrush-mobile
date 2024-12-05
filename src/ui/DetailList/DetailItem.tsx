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

export type DetailItemLayout = "horizontal" | "vertical";

interface DetailItemProps {
  title: string;
  value: string | React.ReactNode;
  layout?: DetailItemLayout;
}

const DetailItem: React.FC<DetailItemProps> = ({
  title,
  value,
  layout = "horizontal",
}) => {
  const containerStyles = tw.style(
    "bg-gray-100 p-4 justify-between",
    layout === "vertical" && "flex-col gap-1",
    layout === "horizontal" && "flex-row gap-4",
  );

  const titleStyles = tw.style("text-primary");

  const valueStyles = tw.style(
    "shrink",
    layout === "vertical" && "text-left",
    layout === "horizontal" && "flex-1 text-right",
  );

  const isValueText = typeof value === "string";

  return (
    <View style={containerStyles}>
      <Text type="p3" style={titleStyles}>
        {title}
      </Text>

      {isValueText && (
        <Text type="p3" style={valueStyles}>
          {value}
        </Text>
      )}

      {!isValueText && value}
    </View>
  );
};

export default DetailItem;
