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

import RNSegmentedControl, {
  SegmentedControlProps as RNSegmentedControlProps,
} from "@react-native-segmented-control/segmented-control";

import tw from "@/lib/tailwind";

interface SegmentedControlProps extends RNSegmentedControlProps {
  values: string[];
  selectedIndex: number;
  onChange: (event: any) => void;
  style?: any;
}

const SegmentedControl: React.FC<SegmentedControlProps> = ({
  values,
  selectedIndex,
  style,
  onChange,
  ...props
}) => {
  const segmentedControlStyles = tw.style("w-full h-9", style);

  return (
    <RNSegmentedControl
      values={values}
      selectedIndex={selectedIndex}
      onChange={onChange}
      style={segmentedControlStyles}
      tintColor={tw.color("primary")}
      fontStyle={{
        color: tw.color("slate-500"),
        fontSize: 14,
      }}
      activeFontStyle={{
        color: "white",
        fontSize: 14,
      }}
      {...props}
    />
  );
};

export default SegmentedControl;
