/*
 * Created on Tue Nov 07 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */
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
import { Layout } from "@/ui/Layout";
import PhoneNumberView from "@/views/settings/PhoneNumber";

const PhoneNumberScreen = () => {
  return (
    <Layout.Root>
      <Layout.Header
        hasBackButton
        title="Phone Number"
        subtitle="We have assigned you a phone number that PNMs can use to contact you."
      />

      <Layout.Content
        gap={12}
        scrollable
        contentContainerStyle={tw`items-start`}
      >
        <PhoneNumberView />
      </Layout.Content>
    </Layout.Root>
  );
};

export default PhoneNumberScreen;
