/*
 * Created on Wed Dec 20 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import React from "react";
import { View } from "react-native";

import Text from "@/ui_v1/Text";
import tw from "@/lib/tailwind";

interface DetailViewProps {
  style?: any;
  children: React.ReactNode;
}

interface DetailViewComponents {
  Section: React.FC<DetailViewSectionProps>;
}

const DetailView: React.FC<DetailViewProps> & DetailViewComponents = ({
  style,
  children,
}) => {
  // Find the section components from the children
  const DetailViewSections = React.Children.toArray(children).filter(
    (child) =>
      React.isValidElement(child) &&
      (child as any).type.displayName == "DetailView.Section",
  );

  const DetailViewSectionChildren = React.Children.toArray(
    DetailViewSections,
  ) as React.ReactElement<DetailViewSectionProps>[];

  // If there is only one section, add a 8px border radius to it,
  // otherwise add a 8px border radius to the top of the first and the bottom of the last section
  const DetailViewSectionChildrenWithBorderRadius =
    DetailViewSectionChildren.map((section, index) => {
      if (DetailViewSectionChildren.length == 1) {
        return React.cloneElement(section, {
          style: tw`rounded-xl`,
        });
      } else {
        if (index == 0) {
          return React.cloneElement(section, {
            style: tw`rounded-t-xl`,
          });
        } else if (index == DetailViewSectionChildren.length - 1) {
          return React.cloneElement(section, {
            style: tw`rounded-b-xl`,
          });
        } else {
          return section;
        }
      }
    });

  const containerClasses = tw.style("w-full", style);

  return (
    <View style={containerClasses}>
      {DetailViewSectionChildrenWithBorderRadius}
    </View>
  );
};

interface DetailViewSectionProps {
  style?: any;
  alternate?: boolean;
  title: string;
  content: string;
}

const DetailViewSection: React.FC<DetailViewSectionProps> = ({
  style,
  alternate,
  title,
  content,
}) => {
  const containerClasses = tw.style(
    "items-center bg-slate-100 p-4 ",
    alternate && "flex-col items-start",
    !alternate && "flex-row",
    style,
  );

  return (
    <View style={containerClasses}>
      <View style={tw``}>
        <Text style={tw`text-primary`}>{title}</Text>
      </View>
      <View style={tw`flex-1 items-end`}>
        <Text style={tw`text-slate-500`}>{content}</Text>
      </View>
    </View>
  );
};

DetailViewSection.displayName = "DetailView.Section";
DetailView.Section = DetailViewSection;

export default DetailView;
