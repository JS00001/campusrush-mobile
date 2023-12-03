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

import { View } from "react-native";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import Layout from "@/ui/Layout";
import CopyItem from "@/ui/CopyItem";
import { WEB_URL } from "@/api/constants";
import { useAuth } from "@/providers/Auth";
import useSettings from "@/hooks/useSettings";
import { formatPhoneNumber } from "@/lib/string";
import SelectionCard from "@/ui/SelectionCard/SelectionCard";

const ContactDetails = () => {
  const { organization } = useAuth();

  const { isLoading, linkSharingEnabled, setLinkSharingEnabled } =
    useSettings();

  const onLinkSharingEnabledPress = () => {
    setLinkSharingEnabled(true);
  };

  const onLinkSharingDisabledPress = () => {
    setLinkSharingEnabled(false);
  };

  const linkSharingEnabledSubtitle = linkSharingEnabled
    ? "Currently Enabled"
    : "Click to enable link sharing";

  const linkSharingDisabledSubtitle = !linkSharingEnabled
    ? "Currently Disabled"
    : "Click to disable link sharing";

  return (
    <Layout gap={8} scrollable contentContainerStyle={tw`items-start pb-6`}>
      <Layout.Header
        hasBackButton
        title="Contact Sharing"
        subtitle="Share your contact information with PNMs"
      />

      <View>
        <Text variant="title">Link Sharing</Text>
        <Text variant="body">
          Send a link to PNMs that they can use to add themselves or friends to
          your recruitment list.
        </Text>
      </View>

      <CopyItem
        label="Link Sharing URL"
        value={`${WEB_URL}/${organization.linkSharingCode}`}
      />

      <View style={tw`gap-2 w-full`}>
        <SelectionCard
          loading={isLoading}
          selected={linkSharingEnabled}
          title="Enable Link Sharing"
          description="Enable link sharing to allow PNMs to manually add themselves to your recruitment list via the link below."
          subtitle={linkSharingEnabledSubtitle}
          onPress={onLinkSharingEnabledPress}
        />
        <SelectionCard
          loading={isLoading}
          selected={!linkSharingEnabled}
          title="Disable Link Sharing"
          description="Disable link sharing to prevent PNMs from manually adding themselves to your recruitment list."
          subtitle={linkSharingDisabledSubtitle}
          onPress={onLinkSharingDisabledPress}
        />
      </View>

      <View style={tw`mt-2`}>
        <Text variant="title">Phone Information</Text>
        <Text variant="body">
          We have assigned you a phone number that PNMs can use to contact you.
        </Text>
      </View>

      <CopyItem
        label="Phone Number"
        value={formatPhoneNumber(organization?.phoneNumber)}
      />

      <CopyItem label="Phone Number ID" value={organization?.phoneNumberId} />
    </Layout>
  );
};

export default ContactDetails;
