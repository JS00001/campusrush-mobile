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

import { useCallback } from "react";

import tw from "@/lib/tailwind";
import HomeView from "@/views/Home";
import { Layout } from "@/ui/Layout";
import { useUser } from "@/providers/User";
import { useBottomSheetStore } from "@/store";
import HomeBackground from "@/components/Backgrounds/Home";

const HomeScreen = () => {
  const { chapter } = useUser();
  const bottomSheetStore = useBottomSheetStore();

  /**
   * When the page loads, if the user is recently a pro user
   * and they don't have a phone number, open the purchase phone number
   * sheet so they can confirm their phone number.
   */
  const onScreenLoad = useCallback(() => {
    if (chapter.isPro && !chapter.phoneNumber) {
      bottomSheetStore.open("PURCHASE_PHONE_NUMBER");
    }
  }, [chapter]);

  return (
    <>
      <HomeBackground />
      <Layout.Root ref={onScreenLoad}>
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
