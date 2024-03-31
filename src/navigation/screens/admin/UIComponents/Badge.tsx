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

import { useState } from "react";

import Badge from "@/ui/Badge";
import Switch from "@/ui/Switch";
import { Layout } from "@/ui/Layout";
import { Documentation } from "@/components/Documentation";

const options = [
  [
    {
      title: "Size",
      value: "sm",
    },
  ],
  [
    {
      title: "Size",
      value: "md",
    },
  ],
  [
    {
      title: "Size",
      value: "lg",
    },
  ],
];

const BadgeScreen = () => {
  const [removable, setRemovable] = useState(false);

  return (
    <Layout.Root>
      <Layout.Header
        hasBackButton
        title="Badge"
        subtitle="A chip to display a small amount of information"
      />

      <Layout.Content scrollable gap={16}>
        <Documentation.Header
          options={[
            {
              title: "Removable",
              value: <Switch value={removable} onValueChange={setRemovable} />,
            },
          ]}
        />

        {options.map((option, index) => (
          <Documentation.Section key={index} options={option}>
            <Badge removable={removable}>Badge</Badge>
          </Documentation.Section>
        ))}
      </Layout.Content>
    </Layout.Root>
  );
};

export default BadgeScreen;
