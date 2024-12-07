/*
 * Created on Thu Apr 25 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import Text from "@/ui/Text";
import Badge from "@/ui/Badge";
import tw from "@/lib/tailwind";
import { TouchableOpacity, TouchableOpacityProps, View } from "react-native";

interface TagViewProps extends TouchableOpacityProps {
  tags: string[];
  hideContainer?: boolean;
  style?: any;
}

const TagView: React.FC<TagViewProps> = ({
  tags,
  style,
  hideContainer,
  ...props
}) => {
  const isEmpty = tags.length === 0;

  const containerStyles = tw.style(
    "w-full",
    !hideContainer && "px-5 py-2 rounded-xl bg-gray-100",
    isEmpty ? "gap-y-0" : "gap-y-2",
    style,
  );

  return (
    <TouchableOpacity style={containerStyles} {...props}>
      {!hideContainer && (
        <Text type="p4" style={tw`text-gray-500`}>
          Tags
        </Text>
      )}

      <View style={tw`gap-1 flex-row flex-wrap`}>
        {tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </View>

      {isEmpty && (
        <Text type="p2" style={tw`text-primary`}>
          N/A
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default TagView;
