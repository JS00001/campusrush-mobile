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

import Button from "@/ui/Button";
import { Layout } from "@/ui/Layout";
import ButtonGroup from "@/ui/ButtonGroup";
import { Documentation } from "@/components/Documentation";

const ButtonGroupScreen = () => {
  return (
    <Layout.Root>
      <Layout.Header
        hasBackButton
        title="Button Group"
        subtitle="Groups buttons and makes them evenly spaced and sized"
      />

      <Layout.Content scrollable gap={16}>
        <Documentation.Section options={[{ title: "Button Count", value: 2 }]}>
          <ButtonGroup>
            <Button size="sm" color="secondary">
              Button 1
            </Button>
            <Button size="sm" color="primary">
              Button 2
            </Button>
          </ButtonGroup>
        </Documentation.Section>
      </Layout.Content>
    </Layout.Root>
  );
};

export default ButtonGroupScreen;
