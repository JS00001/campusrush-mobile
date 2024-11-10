/*
 * Created on Sun Feb 25 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */
import { View } from "react-native";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import CopyView from "@/ui/CopyView";
import AppConstants from "@/constants";
import { useUser } from "@/providers/User";
import SelectionCard from "@/ui/SelectionCard";
import { useUpdateChapter } from "@/hooks/api/chapter";

const LinkSharingView = () => {
  const { chapter } = useUser();
  const mutation = useUpdateChapter();

  const handleSubmission = async (value: boolean) => {
    await mutation.mutateAsync({ linkSharingEnabled: value });
  };

  const linkSharingEnabledDescription = chapter.linkSharing.enabled
    ? "Currently Enabled"
    : "Click to enable link sharing";

  const linkSharingDisabledDescription = !chapter.linkSharing.enabled
    ? "Currently Disabled"
    : "Click to disable link sharing";

  const linkSharingCode = `${AppConstants.sharingUrl}/${chapter.linkSharing.code}`;

  return (
    <>
      <Text style={tw`font-bold uppercase`} type="p4">
        Your Link Sharing URL
      </Text>
      <CopyView title="Link Sharing URL" content={linkSharingCode} />

      <Text style={tw`font-bold uppercase`} type="p4">
        Manage Link Sharing
      </Text>
      <View style={tw`gap-2 w-full`}>
        <SelectionCard
          title="Enable Link Sharing"
          subtitle="Enable link sharing to allow PNMs to manually add themselves to your recruitment list via the link below."
          description={linkSharingEnabledDescription}
          loading={mutation.isPending}
          selected={chapter.linkSharing.enabled}
          onPress={handleSubmission.bind(null, true)}
        />
        <SelectionCard
          title="Disable Link Sharing"
          subtitle="Disable link sharing to prevent PNMs from manually adding themselves to your recruitment list."
          description={linkSharingDisabledDescription}
          loading={mutation.isPending}
          selected={!chapter.linkSharing.enabled}
          onPress={handleSubmission.bind(null, false)}
        />
      </View>
    </>
  );
};

export default LinkSharingView;
