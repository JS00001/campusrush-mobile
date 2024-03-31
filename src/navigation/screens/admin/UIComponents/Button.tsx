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

import Button from "@/ui/Button";
import Switch from "@/ui/Switch";
import { Layout } from "@/ui/Layout";
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
      value: "lg",
    },
    {
      title: "Color",
      value: "secondary",
    },
  ],
  [
    {
      title: "Size",
      value: "sm",
    },
    {
      title: "Color",
      value: "tertiary",
    },
  ],
  [
    {
      title: "Size",
      value: "lg",
    },
    {
      title: "Color",
      value: "tertiary",
    },
  ],
];

const ButtonScreen = () => {
  const [iconLeft, setIconLeft] = useState(false);
  const [iconRight, setIconRight] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <Layout.Root>
      <Layout.Header
        hasBackButton
        title="Button"
        subtitle="A pressable button for user interaction"
      />

      <Layout.Content scrollable gap={16}>
        <Documentation.Header
          options={[
            {
              title: "Icon Left",
              value: <Switch value={iconLeft} onValueChange={setIconLeft} />,
            },
            {
              title: "Icon Right",
              value: <Switch value={iconRight} onValueChange={setIconRight} />,
            },
            {
              title: "Disabled",
              value: <Switch value={disabled} onValueChange={setDisabled} />,
            },
            {
              title: "Loading",
              value: <Switch value={loading} onValueChange={setLoading} />,
            },
          ]}
        />

        {options.map((option, index) => (
          <Documentation.Section key={index} options={option}>
            <Button
              size={option[0].value as any}
              color={option[1].value as any}
              iconLeft={iconLeft ? "add-fill" : undefined}
              iconRight={iconRight ? "add-fill" : undefined}
              disabled={disabled}
              loading={loading}
            >
              Button
            </Button>
          </Documentation.Section>
        ))}
      </Layout.Content>
    </Layout.Root>
  );
};

export default ButtonScreen;
