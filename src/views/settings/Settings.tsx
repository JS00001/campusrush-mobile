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
import { useNavigation } from "@react-navigation/native";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import Button from "@/ui/Button";
import ListItem from "@/ui/ListItem";
import AppConstants from "@/constants";
import { useModalStore } from "@/store";
import Content from "@/constants/content";
import { useAuth } from "@/providers/Auth";
import { useLogout } from "@/hooks/api/auth";
import { useDeleteChapter } from "@/hooks/api/chapter";
import { useBottomSheets } from "@/providers/BottomSheet";

const SettingsView = () => {
  const navigation = useNavigation();
  const mutation = useDeleteChapter();

  const logoutMutation = useLogout();
  const { chapter, clear } = useAuth();
  const { openModal } = useModalStore();
  const { openBottomSheet } = useBottomSheets();

  const onTermsOfServicePress = () => {
    openBottomSheet("TERMS_OF_SERVICE");
  };

  const onPrivacyPolicyPress = () => {
    openBottomSheet("PRIVACY_POLICY");
  };

  const onUpdateChapterPress = () => {
    (navigation.navigate as any)("UpdateChapter");
  };

  const onPhoneNumberPress = () => {
    (navigation.navigate as any)("PhoneNumber");
  };

  const onUpdateBillingPress = () => {
    (navigation.navigate as any)("UpdateBilling");
  };

  const onUpdateNotificationsPress = () => {
    (navigation.navigate as any)("UpdateNotifications");
  };

  const onLogout = async () => {
    const res = await logoutMutation.mutateAsync();

    if ("error" in res.data) return;

    clear();
  };

  const onDeleteAccount = () => {
    openModal("error", {
      title: Content.confirmDeleteAccount.title,
      subtitle: Content.confirmDeleteAccount.subtitle,
      primaryActionLabel: "Yes, Delete",
      secondaryActionLabel: "No, Cancel",

      onPrimaryAction: async () => {
        await mutation.mutateAsync();
      },
    });
  };

  const onLinkSharingPress = () => {
    (navigation.navigate as any)("LinkSharing");
  };

  return (
    <>
      <ListItem
        size="lg"
        title="Chapter"
        subtitle="Manage your chapter"
        icon="building-2-fill"
        onPress={onUpdateChapterPress}
      />

      <ListItem
        size="lg"
        title="Notifications"
        subtitle="Manage your notifications"
        icon="notification-2-fill"
        onPress={onUpdateNotificationsPress}
      />

      <ListItem
        size="lg"
        title="Phone Number"
        subtitle="Your custom phone number "
        icon="phone-fill"
        onPress={onPhoneNumberPress}
      />

      <ListItem
        size="lg"
        title="Link Sharing"
        subtitle="Manage your link sharing"
        icon="share-fill"
        onPress={onLinkSharingPress}
      />

      <ListItem
        size="lg"
        title="Billing"
        subtitle="Manage your billing"
        icon="bank-card-2-fill"
        onPress={onUpdateBillingPress}
      />

      <View style={tw`w-full flex-row gap-3`}>
        <ListItem
          size="sm"
          icon="file-list-3-fill"
          title="Terms of Service"
          subtitle="View our terms and conditions"
          onPress={onTermsOfServicePress}
        />

        <ListItem
          size="sm"
          icon="shield-user-fill"
          title="Privacy Policy"
          subtitle="View our privacy policy"
          onPress={onPrivacyPolicyPress}
        />
      </View>

      <Button
        size="sm"
        style={tw`w-full`}
        loading={logoutMutation.isLoading}
        onPress={onLogout}
      >
        Sign Out of {chapter.name}
      </Button>

      <Button
        size="sm"
        color="secondary"
        style={tw`w-full`}
        loading={mutation.isLoading}
        textStyle={tw`text-red font-medium`}
        onPress={onDeleteAccount}
      >
        Delete Account
      </Button>

      <Text type="p4" style={tw`text-slate-600`}>
        App Version: {AppConstants.version}
      </Text>
    </>
  );
};

export default SettingsView;
