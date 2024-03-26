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
import DateTimePicker from "@/ui/DateTimePicker";
import { Documentation } from "@/components/Documentation";

const options = [
  [
    {
      title: "Mode",
      value: "date",
    },
  ],
  [
    {
      title: "Mode",
      value: "time",
    },
  ],
  [
    {
      title: "Mode",
      value: "datetime",
    },
  ],
];

const DateTimePickerScreen = () => {
  return (
    <Layout.Root>
      <Layout.Header
        hasBackButton
        title="Date Time Picker"
        subtitle="A date and time picker for user input"
      />

      <Layout.Content scrollable gap={16}>
        {options.map((option, index) => (
          <Documentation.Section key={index} options={option}>
            <DateTimePicker
              value={new Date()}
              label={"Date Picker"}
              mode={option[0].value as any}
            />
          </Documentation.Section>
        ))}
      </Layout.Content>
    </Layout.Root>
  );
};

export default DateTimePickerScreen;
