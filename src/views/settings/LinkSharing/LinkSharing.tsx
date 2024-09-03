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
import { useAuth } from "@/providers/Auth";
import SelectionCard from "@/ui/SelectionCard";
import { useUpdateChapter } from "@/hooks/api/chapter";

const LinkSharingView = () => {
  const mutation = useUpdateChapter();
  const { chapter, setChapter } = useAuth();

  const handleSubmission = async (value: boolean) => {
    const response = await mutation.mutateAsync({
      linkSharingEnabled: value,
    });

    setChapter(response.data.chapter);
  };

  const linkSharingEnabledDescription = chapter.linkSharingEnabled
    ? "Currently Enabled"
    : "Click to enable link sharing";

  const linkSharingDisabledDescription = !chapter.linkSharingEnabled
    ? "Currently Disabled"
    : "Click to disable link sharing";

  const linkSharingCode = `${AppConstants.sharingUrl}/${chapter.linkSharingCode}`;

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
          loading={mutation.isLoading}
          selected={chapter.linkSharingEnabled}
          onPress={handleSubmission.bind(null, true)}
        />
        <SelectionCard
          title="Disable Link Sharing"
          subtitle="Disable link sharing to prevent PNMs from manually adding themselves to your recruitment list."
          description={linkSharingDisabledDescription}
          loading={mutation.isLoading}
          selected={!chapter.linkSharingEnabled}
          onPress={handleSubmission.bind(null, false)}
        />
      </View>
    </>
  );
};

export default LinkSharingView;
