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
import Skeleton from "@/ui/Skeleton";
import ToggleChip from "@/ui/ToggleChip";
import ErrorMessage from "@/components/ErrorMessage";
import { useGetMetadata } from "@/hooks/api/external";

interface TagSelectorProps extends ViewProps {
  values: string[];
  style?: any;
  onChange: (values: string[]) => void;
}

const TagSelector: React.FC<TagSelectorProps> = ({
  values = [],
  style,
  onChange,
  ...props
}) => {
  const metadataQuery = useGetMetadata();
  const [selected, setSelected] = React.useState<string[]>(values);

  // Error and Loading States
  if (metadataQuery.isLoading) return <LoadingState />;
  if (metadataQuery.isError) {
    return (
      <ErrorMessage
        error={metadataQuery.error}
        description="Could not load tags"
      />
    );
  }

  const tagCategories = metadataQuery.data!.tags;

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
      {tagCategories.map((category) => (
        <React.Fragment key={category.id}>
          <Text type="h4">{category.name}</Text>
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

const LoadingState = () => {
  const containerStyles = tw.style("gap-y-3 w-full");

  return (
    <View style={containerStyles}>
      {/* All of the categories */}
      {new Array(3).fill(0).map((_, i) => (
        <React.Fragment key={i}>
          <Skeleton height={24} width={100} />
          <Skeleton height={96} width="100%" />
        </React.Fragment>
      ))}
    </View>
  );
};

export default TagSelector;
