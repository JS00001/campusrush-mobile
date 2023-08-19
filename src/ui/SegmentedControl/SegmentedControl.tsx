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

import tw from "@/lib/tailwind";
import RNSegmentedControl from "@react-native-segmented-control/segmented-control";

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
      style={tw.style("w-full h-10")}
      tintColor={tw.color("primary")}
      fontStyle={{
        color: tw.color("slate-600"),
        fontSize: 14,
      }}
      activeFontStyle={{
        color: tw.color("white"),
        fontSize: 14,
      }}
      backgroundColor={tw.color("slate-100")}
    />
  );
};

export default SegmentedControl;
