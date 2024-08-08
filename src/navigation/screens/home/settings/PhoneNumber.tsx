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
import CopyView from "@/ui/CopyView";
import Headline from "@/ui/Headline";
import format from "@/lib/util/format";
import { useAuth } from "@/providers/Auth";

const PhoneNumber = () => {
  const { chapter } = useAuth();

  return (
    <Layout.Root>
      <Layout.Header
        hasBackButton
        title="Phone Number"
        subtitle="We have assigned you a phone number that PNMs can use to contact you."
      />

      <Layout.Content
        gap={16}
        scrollable
        contentContainerStyle={tw`items-start`}
      >
        <Headline
          title="Phone Information"
          subtitle="All messages to this phone number will show up in your 'Messages' inbox."
        />

        <CopyView
          title="Phone Number"
          content={format.phoneNumber(chapter.phoneNumber)}
        />

        <CopyView title="Phone Number ID" content={chapter?.phoneNumberId} />
      </Layout.Content>
    </Layout.Root>
  );
};

export default PhoneNumber;
