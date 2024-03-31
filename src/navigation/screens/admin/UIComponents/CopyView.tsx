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

import { Layout } from "@/ui/Layout";
import CopyView from "@/ui/CopyView";
import { Documentation } from "@/components/Documentation";

const options = [
  [
    {
      title: "Title",
      value: "Phone Number",
    },
    {
      title: "Content",
      value: "(706) 123-456",
    },
  ],
  [
    {
      title: "Title",
      value: "Email",
    },
    {
      title: "Content",
      value: "jonsnow@gmail.com",
    },
  ],
];

const CopyViewScreen = () => {
  return (
    <Layout.Root>
      <Layout.Header
        hasBackButton
        title="Copy View"
        subtitle="Shows what will be copied, and a copy button"
      />

      <Layout.Content scrollable gap={16}>
        {options.map((option, index) => (
          <Documentation.Section key={index} options={option}>
            <CopyView title={option[0].value} content={option[1].value} />
          </Documentation.Section>
        ))}
      </Layout.Content>
    </Layout.Root>
  );
};

export default CopyViewScreen;
