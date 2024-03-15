/*
 * Created on Mon Aug 07 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import RNSegmentedControl from "@react-native-segmented-control/segmented-control";

import tw from "@/lib/tailwind";

interface SegmentedControlProps {
  values: string[];
  selectedIndex: number;
  onChange: (event: any) => void;
}

const SegmentedControl: React.FC<SegmentedControlProps> = ({
  values,
  selectedIndex,
  onChange,
}) => {
  return (
    <RNSegmentedControl
      values={values}
      selectedIndex={selectedIndex}
      onChange={onChange}
      style={tw.style("w-full h-9")}
      tintColor={tw.color("primary")}
      fontStyle={{
        color: tw.color("slate-500"),
        fontSize: 14,
      }}
      activeFontStyle={{
        color: "white",
        fontSize: 14,
      }}
    />
  );
};

export default SegmentedControl;
