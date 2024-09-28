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
import HomeView from "@/views/Home";
import { Layout } from "@/ui/Layout";
import HomeBackground from "@/components/Backgrounds/Home";

const HomeScreen = () => {
  return (
    <>
      <HomeBackground />
      <Layout.Root>
        <Layout.Content
          removePadding
          safeAreaPosition="top"
          style={tw`bg-transparent`}
        >
          <HomeView />
        </Layout.Content>
      </Layout.Root>
    </>
  );
};

export default HomeScreen;
