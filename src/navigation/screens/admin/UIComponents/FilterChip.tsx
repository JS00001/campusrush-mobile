/*
 * Created on Wed Apr 24 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { Layout } from "@/ui/Layout";
import FilterChip from "@/ui/FilterChip";
import { Documentation } from "@/components/Documentation";

const options = [
  [
    {
      title: "Size",
      value: "sm",
    },
    {
      title: "Color",
      value: "primary",
    },
  ],
  [
    {
      title: "Size",
      value: "md",
    },
    {
      title: "Color",
      value: "primary",
    },
  ],
  [
    {
      title: "Size",
      value: "lg",
    },
    {
      title: "Color",
      value: "primary",
    },
  ],
  [
    {
      title: "Size",
      value: "sm",
    },
    {
      title: "Color",
      value: "secondary",
    },
  ],
  [
    {
      title: "Size",
      value: "md",
    },
    {
      title: "Color",
      value: "secondary",
    },
  ],
  [
    {
      title: "Size",
      value: "lg",
    },
    {
      title: "Color",
      value: "secondary",
    },
  ],
];

const FilterChipScreen = () => {
  return (
    <Layout.Root>
      <Layout.Header
        hasBackButton
        title="Filter Chip"
        subtitle="A chip to display a small amount of information (can be removed)"
      />

      <Layout.Content scrollable gap={16}>
        {options.map((option, index) => (
          <Documentation.Section key={index} options={option}>
            <FilterChip
              color={option[1].value as any}
              size={option[0].value as any}
            >
              Filter Chip
            </FilterChip>
          </Documentation.Section>
        ))}
      </Layout.Content>
    </Layout.Root>
  );
};

export default FilterChipScreen;
