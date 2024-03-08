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
import Button from "@/ui_v1/Button";
import AppConstants from "@/constants";
import { useModalStore } from "@/store";
import ActionCard from "@/ui_v1/ActionCard";
import Content from "@/constants/content";
import { useAuth } from "@/providers/Auth";
import { useLogout } from "@/hooks/api/auth";
import { useQonversion } from "@/providers/Qonversion";
import { useDeleteChapter } from "@/hooks/api/chapter";
import { useBottomSheets } from "@/providers/BottomSheet";

const SettingsView = () => {
  const navigation = useNavigation();
  const mutation = useDeleteChapter();

  const { isPro } = useQonversion();
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
    if (isPro) {
      (navigation.navigate as any)("LinkSharing");
      return;
    }

    openModal("info", {
      title: "Upgrade for more",
      subtitle: Content.addPNM.shareQRCodeUpgrade,
    });
  };

  return (
    <>
      <ActionCard
        title="Chapter"
        subtitle="Manage your chapter"
        icon="ri-building-2-fill"
        onPress={onUpdateChapterPress}
      />

      <ActionCard
        title="Notifications"
        subtitle="Manage your notifications"
        icon="ri-notification-2-fill"
        onPress={onUpdateNotificationsPress}
      />

      <ActionCard
        title="Phone Number"
        subtitle="Your custom phone number "
        icon="ri-phone-fill"
        onPress={onPhoneNumberPress}
      />

      <ActionCard
        enforceProPlan
        title="Link Sharing"
        subtitle="Manage your link sharing"
        icon="ri-share-fill"
        onPress={onLinkSharingPress}
      />

      <ActionCard
        title="Billing"
        subtitle="Manage your billing"
        icon="ri-bank-card-2-fill"
        onPress={onUpdateBillingPress}
      />

      <View style={tw`w-full flex-row gap-3`}>
        <ActionCard
          size="sm"
          icon="ri-file-list-3-fill"
          title="Terms of Service"
          subtitle="View our terms and conditions"
          onPress={onTermsOfServicePress}
        />

        <ActionCard
          size="sm"
          icon="ri-shield-user-fill"
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
        color="gray"
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
