/*
 * Created on Mon Jul 22 2024
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

import tw from "@/lib/tailwind";

interface StepperProps {
  stepCount: number;
  activeStep: number;
}

const Stepper: React.FC<StepperProps> = ({ activeStep, stepCount }) => {
  return (
    <View style={tw`gap-2 p-1 flex-row`}>
      {Array.from({ length: stepCount }).map((_, index) => {
        const stepStyles = tw.style(
          "h-1.5 w-1.5 rounded-full",
          index === activeStep - 1 ? "bg-primary" : "bg-slate-300",
        );

        return <View key={index} style={stepStyles} />;
      })}
    </View>
  );
};

export default Stepper;
