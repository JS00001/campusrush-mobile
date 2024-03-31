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

import { View } from "react-native";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import { Layout } from "@/ui/Layout";
import CopyAction from "@/ui/CopyAction";
import { Documentation } from "@/components/Documentation";

const options = [
  [
    {
      title: "Title",
      value: "Copy ID",
    },
    {
      title: "Content",
      value: "123456",
    },
  ],
  [
    {
      title: "Title",
      value: "Copy Name",
    },
    {
      title: "Content",
      value: "John Doe",
    },
  ],
  [
    {
      title: "Title",
      value: "Copy Email",
    },
    {
      title: "Content",
      value: "jonsnow@gmail.com",
    },
  ],
];

const CopyActionScreen = () => {
  return (
    <Layout.Root>
      <Layout.Header
        hasBackButton
        title="Copy Action"
        subtitle="Holding down on a message will show a copy action"
      />

      <Layout.Content scrollable gap={16}>
        {options.map((option, index) => (
          <Documentation.Section key={index} options={option}>
            <CopyAction title={option[0].value} content={option[1].value}>
              <View
                style={tw`w-full rounded-xl px-4 py-8 bg-slate-100 items-center`}
              >
                <Text type="h2">Long press me</Text>
              </View>
            </CopyAction>
          </Documentation.Section>
        ))}
      </Layout.Content>
    </Layout.Root>
  );
};

export default CopyActionScreen;
