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

import React from "react";
import { View, ViewProps } from "react-native";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import ToggleChip from "@/ui/ToggleChip";
import { useMetadataStore } from "@/store";

interface TagSelectorProps extends ViewProps {
  values?: string[];
  style?: any;
  onChange?: (values: string[]) => void;
}

const TagSelector: React.FC<TagSelectorProps> = ({
  values = [],
  style,
  onChange,
  ...props
}) => {
  const tags = useMetadataStore((state) => state.metadata.tags);
  const [selected, setSelected] = React.useState<string[]>(values);

  /**
   * When a tag is selected, check if it is already in the selected array.
   * If it is, remove it. If it is not, add it, then pass the data to the
   * onChange callback.
   */
  const handleSelect = (tag: string) => {
    if (selected.includes(tag)) {
      const updatedState = selected.filter((t) => t !== tag);

      setSelected(updatedState);
      onChange?.(updatedState);
      return;
    }

    const updatedState = [...selected, tag];

    setSelected(updatedState);
    onChange?.(updatedState);
  };

  const containerStyles = tw.style("gap-y-3 w-full", style);

  return (
    <View style={containerStyles} {...props}>
      {/* All of the categories */}
      {tags?.map((category) => (
        <React.Fragment key={category.id}>
          <Text type="h2">{category.name}</Text>
          <View style={tw`flex-row gap-1 flex-wrap`}>
            {/* All of the tags in each category */}
            {category.tags.map((tag) => {
              const isSelected = selected.includes(tag);

              const onChange = () => {
                handleSelect(tag);
              };

              return (
                <ToggleChip
                  key={tag}
                  size="lg"
                  value={isSelected}
                  onChange={onChange}
                >
                  {tag}
                </ToggleChip>
              );
            })}
          </View>
        </React.Fragment>
      ))}
    </View>
  );
};

export default TagSelector;
