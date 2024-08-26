/*
 * Created on Fri Mar 08 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */
import { View, TouchableOpacity, ViewProps } from "react-native";

import Icon from "@/ui/Icon";
import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import useCopy from "@/hooks/useCopy";

interface CopyViewProps extends ViewProps {
  /** The title of the content to be copied (I.E "User Id") */
  title: string;
  /** The content to copy */
  content: string;
  /** The styling of the view */
  style?: any;
}

const CopyView: React.FC<CopyViewProps> = ({
  title,
  content,
  style,
  ...props
}) => {
  const label = props["ph-label"] || `copy_view_${title}`;
  const copy = useCopy();

  const containerStyles = tw.style(
    "bg-slate-100 w-full rounded-xl p-4 pl-8",
    "flex-row items-center justify-between gap-x-2",
    style,
  );

  const iconContainerStyles = tw.style("p-2 bg-slate-200 rounded-xl");

  const onPress = () => {
    copy(content);
  };

  return (
    <View style={containerStyles} {...props}>
      <View style={tw`shrink`}>
        <Text numberOfLines={1} style={tw`text-primary`}>
          {title}
        </Text>
        <Text type="p3" numberOfLines={1} style={tw`text-slate-500`}>
          {content}
        </Text>
      </View>

      <TouchableOpacity
        style={iconContainerStyles}
        onPress={onPress}
        ph-label={label}
      >
        <Icon name="file-copy-line" size={20} color={tw.color("primary")} />
      </TouchableOpacity>
    </View>
  );
};

export default CopyView;
