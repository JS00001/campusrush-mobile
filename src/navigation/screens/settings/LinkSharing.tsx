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
import { useAuth } from "@/providers/Auth";
import useSettings from "@/hooksv1/useSettings";
import { SHARING_URL } from "@/apiv1/constants";
import SelectionCard from "@/ui/SelectionCard/SelectionCard";

const ContactDetails = () => {
  const { chapter } = useAuth();

  const { isLoading, linkSharingEnabled, setLinkSharingEnabled } =
    useSettings();

  const onLinkSharingEnabledPress = () => {
    setLinkSharingEnabled(true);
  };

  const onLinkSharingDisabledPress = () => {
    setLinkSharingEnabled(false);
  };

  const linkSharingCode = `${SHARING_URL}/${chapter.linkSharingCode}`;

  const linkSharingEnabledSubtitle = linkSharingEnabled
    ? "Currently Enabled"
    : "Click to enable link sharing";

  const linkSharingDisabledSubtitle = !linkSharingEnabled
    ? "Currently Disabled"
    : "Click to disable link sharing";

  return (
    <Layout gap={16} scrollable contentContainerStyle={tw`items-start`}>
      <Layout.Header
        hasBackButton
        title="Link Sharing"
        subtitle="Manage your link sharing settings."
      />

      <View>
        <Text variant="title">Your Link Sharing URL</Text>
        <Text variant="body">
          Send this link to PNMs to allow them to add themselves to your
          recruitment list.
        </Text>
      </View>

      <CopyItem label="Link Sharing URL" value={linkSharingCode} />

      <Text variant="title">Manage Your Link Sharing</Text>

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
    </Layout>
  );
};

export default ContactDetails;
