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

import Autocomplete from "@/ui/Autocomplete/Autocomplete";
import Layout from "@/ui/Layout";
import SegmentedControl from "@/ui/SegmentedControl";
import SelectionCard from "@/ui/SelectionCard/SelectionCard";
import { useFormik } from "formik";
import React from "react";

interface UITestingProps {}

// TESTING AUTOCOMPLETE
// const UITesting: React.FC<UITestingProps> = () => {
//   const form = useFormik({
//     initialValues: {
//       organization: "",
//       school: "",
//     },
//     onSubmit: (values) => {},
//   });

//   const organizations = [
//     "Acacia",
//     "Alpha Chi Rho",
//     "Alpha Chi Sigma",
//     "Alpha Delta",
//     "Alpha Delta Gamma",
//     "Alpha Delta Phi",
//     "Alpha Epsilon Pi",
//     "Alpha Gamma Omega",
//   ];

//   const schools = [
//     "University of California, Berkeley",
//     "University of California, Los Angeles",
//     "University of California, San Diego",
//     "University of California, Irvine",
//     "University of California, Davis",
//     "University of California, Santa Barbara",
//     "University of California, Santa Cruz",
//     "University of California, Riverside",
//     "University of California, Merced",
//     "University of California, San Francisco",
//   ];

//   return (
//     <Layout>
//       <Autocomplete
//         placeholder="Organization"
//         options={organizations}
//         value={form.values.organization}
//         onChangeText={(text) => form.setFieldValue("organization", text)}
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

  return (
    <Layout>
      <Layout.Header title="Test" subtitle="Test 2" hasBackButton />
      {/* <SegmentedControl
        values={["Monthly", "Yearly"]}
        selectedIndex={0}
        onChange={() => {}}
      /> */}
      '
      <SelectionCard
        selected={selected === 0}
        title="Basic Lifetime Plan"
        description="One-time Purchase"
        subtitle="$849.99"
        onPress={() => setSelected(0)}
      />
      <SelectionCard
        selected={selected === 1}
        title="Test"
        description="Test 2"
        subtitle="Test 3"
        onPress={() => setSelected(1)}
      />
    </Layout>
  );
};

export default UITesting;
