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
import Button from "@/ui/Button";
import Headline from "@/ui/Headline";
import CopyView from "@/ui/CopyView";
import AppConstants from "@/constants";
import { useAuth } from "@/providers/Auth";
import SelectionCard from "@/ui/SelectionCard";
import useFormMutation from "@/hooks/useFormMutation";
import { useUpdateChapter } from "@/hooks/api/chapter";

const LinkSharingView = () => {
  const mutation = useUpdateChapter();
  const { chapter, setChapter } = useAuth();

  const formValidators = {
    linkSharingEnabled: z.boolean(),
  };

  const form = useFormMutation({
    mutation: mutation,
    validators: formValidators,
    onSuccess: async ({ data }) => {
      setChapter(data.chapter);
    },
    initialValues: {
      linkSharingEnabled: chapter.linkSharingEnabled,
    },
  });

  const linkSharingEnabledDescription = chapter.linkSharingEnabled
    ? "Currently Enabled"
    : "Click to enable link sharing";

  const linkSharingDisabledDescription = !chapter.linkSharingEnabled
    ? "Currently Disabled"
    : "Click to disable link sharing";

  const linkSharingCode = `${AppConstants.sharingUrl}/${chapter.linkSharingCode}`;

  return (
    <>
      <Headline
        title="Your Link Sharing URL"
        subtitle="Send this link to PNMs to allow them to add themselves to your recruitment list."
      />

      <CopyView title="Link Sharing URL" content={linkSharingCode} />

      <Text type="h2">Manage Your Link Sharing</Text>

      <View style={tw`gap-2 w-full`}>
        <SelectionCard
          title="Enable Link Sharing"
          subtitle="Enable link sharing to allow PNMs to manually add themselves to your recruitment list via the link below."
          description={linkSharingEnabledDescription}
          selected={form.state.linkSharingEnabled.value}
          onPress={form.setValue.bind(null, "linkSharingEnabled", true)}
        />
        <SelectionCard
          title="Disable Link Sharing"
          subtitle="Disable link sharing to prevent PNMs from manually adding themselves to your recruitment list."
          description={linkSharingDisabledDescription}
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
