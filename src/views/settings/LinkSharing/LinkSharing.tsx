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

import { z } from "zod";
import { View } from "react-native";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import Button from "@/ui_v1/Button";
import CopyItem from "@/ui_v1/CopyItem";
import AppConstants from "@/constants";
import { useAuth } from "@/providers/Auth";
import SelectionCard from "@/ui_v1/SelectionCard";
import useFormMutation from "@/hooks/useFormMutation";
import { useUpdateChapter } from "@/hooks/api/chapter";

const LinkSharingView = () => {
  const mutation = useUpdateChapter();
  const { chapter, updateChapter } = useAuth();

  const formValidators = {
    linkSharingEnabled: z.boolean(),
  };

  const form = useFormMutation({
    mutation: mutation,
    validators: formValidators,
    onSuccess: async ({ data }) => {
      updateChapter(data.chapter);
    },
    initialValues: {
      linkSharingEnabled: chapter.linkSharingEnabled,
    },
  });

  const linkSharingEnabledSubtitle = chapter.linkSharingEnabled
    ? "Currently Enabled"
    : "Click to enable link sharing";

  const linkSharingDisabledSubtitle = !chapter.linkSharingEnabled
    ? "Currently Disabled"
    : "Click to disable link sharing";

  const linkSharingCode = `${AppConstants.sharingUrl}/${chapter.linkSharingCode}`;

  return (
    <>
      <View>
        <Text type="h2">Your Link Sharing URL</Text>
        <Text>
          Send this link to PNMs to allow them to add themselves to your
          recruitment list.
        </Text>
      </View>

      <CopyItem label="Link Sharing URL" value={linkSharingCode} />

      <Text type="h2">Manage Your Link Sharing</Text>

      <View style={tw`gap-2 w-full`}>
        <SelectionCard
          title="Enable Link Sharing"
          subtitle={linkSharingEnabledSubtitle}
          description="Enable link sharing to allow PNMs to manually add themselves to your recruitment list via the link below."
          selected={form.state.linkSharingEnabled.value}
          onPress={form.setValue.bind(null, "linkSharingEnabled", true)}
        />
        <SelectionCard
          title="Disable Link Sharing"
          subtitle={linkSharingDisabledSubtitle}
          description="Disable link sharing to prevent PNMs from manually adding themselves to your recruitment list."
          selected={!form.state.linkSharingEnabled.value}
          onPress={form.setValue.bind(null, "linkSharingEnabled", false)}
        />
      </View>

      <Button onPress={form.handleSubmission} loading={form.loading}>
        Save Changes
      </Button>
    </>
  );
};

export default LinkSharingView;
