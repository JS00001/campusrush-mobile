/*
 * Created on Mon Sep 02 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { RefreshControl, ScrollView, ScrollViewProps } from "react-native";

interface RefreshControlViewProps extends ScrollViewProps {
  /** The color of the refresh control */
  tintColor?: string;
  /** The refreshing state of the refresh control */
  refreshing: boolean;
  /** The on refresh function of the refresh control */
  onRefresh: () => void;
}

const RefreshControlView: React.FC<RefreshControlViewProps> = ({
  tintColor,
  refreshing,
  onRefresh,
  style,
  contentContainerStyle,
  ...props
}) => {
  return (
    <ScrollView
      style={style}
      contentContainerStyle={contentContainerStyle}
      refreshControl={
        <RefreshControl
          tintColor={tintColor}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
      {...props}
    />
  );
};

export default RefreshControlView;
