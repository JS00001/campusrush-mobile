/*
 * Created on Mon Aug 07 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import tw from "@/lib/tailwind";
import Layout from "@/ui/Layout";
import HomeView from "@/views/Home";
import HomeHeaderSvg from "@/assets/HomeHeaderSvg";

const HomeScreen = () => {
  return (
    <>
      <HomeHeaderSvg />

      <Layout
        scrollable
        removePadding
        style={tw`bg-transparent`}
        contentContainerStyle={tw`items-start`}
      >
        <HomeView />
      </Layout>
    </>
  );
};

export default HomeScreen;
