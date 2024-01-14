/*
 * Created on Tue 15 Aug 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import Layout from "@/ui/Layout";

import React from "react";

import ActionButton from "@/ui/ActionButton/ActionButton";
import Dropdown from "@/ui/Dropdown";

interface UITestingProps {}

// TESTING AUTOCOMPLETE
// const UITesting: React.FC<UITestingProps> = () => {
//   const form = useFormik({
//     initialValues: {
//       chapter: "",
//       school: "",
//     },
//     onSubmit: (values) => {},
//   });

const chapters = [
  "Acacia",
  "Alpha Chi Rho",
  "Alpha Chi Sigma",
  "Alpha Delta",
  "Alpha Delta Gamma",
  "Alpha Delta Phi",
  "Alpha Epsilon Pi",
  "Alpha Gamma Omega",
];

const schools = [
  "University of California, Berkeley",
  "University of California, Los Angeles",
  "University of California, San Diego",
  "University of California, Irvine",
  "University of California, Davis",
  "University of California, Santa Barbara",
  "University of California, Santa Cruz",
  "University of California, Riverside",
  "University of California, Merced",
  "University of California, San Francisco",
];

//   return (
//     <Layout>
//       <Autocomplete
//         placeholder="Chapter"
//         options={chapters}
//         value={form.values.chapter}
//         onChangeText={(text) => form.setFieldValue("chapter", text)}
//       ></Autocomplete>

//       <Autocomplete
//         placeholder="School"
//         options={schools}
//         value={form.values.school}
//         onChangeText={(text) => form.setFieldValue("school", text)}
//       ></Autocomplete>
//     </Layout>
//   );
// };

// TESTING NEW LAYOUT AND SEGMENTED CONTROL
const UITesting: React.FC<UITestingProps> = () => {
  const [selected, setSelected] = React.useState(0);

  const [chapter, setChapter] = React.useState("");
  const [school, setSchool] = React.useState("");

  return (
    <>
      <Layout scrollable keyboardAvoiding>
        <Layout.Header title="Test" subtitle="Test 2" hasBackButton />
        {/* <SegmentedControl
        values={["Monthly", "Yearly"]}
        selectedIndex={0}
        onChange={() => {}}
      /> */}
        {/* <SelectionCard
        selected={selected === 0}
        title="Basic Lifetime Plan"
        description="One-time Purchase"
        subtitle="$849.99"
        onPress={() => setSelected(0)}
      />
      <SelectionCard
        selected={selected === 1}
        title="Basic Monthly Plan"
        description="Monthly Subscription"
        subtitle="$9.99 /mo"
        onPress={() => setSelected(1)}
      /> */}
        {/* <ActionCard
          title="Test"
          subtitle="Test 2"
          icon="ri-building-2-fill"
          onPress={() => {}}
        />

        <View style={tw`flex-row gap-6 w-full`}>
          <ActionCard
            title="Test"
            subtitle="Test 2"
            icon="ri-building-2-fill"
            onPress={() => {}}
            size="sm"
          />
          <ActionCard
            title="Test"
            subtitle="Test 2"
            icon="ri-building-2-fill"
            onPress={() => {}}
            size="sm"
          />
        </View> */}
        <Dropdown
          searchable
          placeholder="Chapter"
          options={chapters}
          value={chapter}
          onValueChange={setChapter}
        />
        <Dropdown
          placeholder="School"
          options={schools}
          value={school}
          onValueChange={setSchool}
        />
      </Layout>

      <ActionButton icon="ri-add-line" onPress={() => {}} />
    </>
  );
};

export default UITesting;
