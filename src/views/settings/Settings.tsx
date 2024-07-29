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
import { alert } from "@/lib/util";
import ListItem from "@/ui/ListItem";
import AppConstants from "@/constants";
import Content from "@/constants/content";
import { useAuth } from "@/providers/Auth";
import { useLogout } from "@/hooks/api/auth";
import { useDeleteChapter } from "@/hooks/api/chapter";
import { useBottomSheet } from "@/providers/BottomSheet";

const SettingsView = () => {
  const navigation = useNavigation();
  const mutation = useDeleteChapter();

  const logoutMutation = useLogout();
  const { chapter, clearUserData } = useAuth();
  const { openBottomSheet } = useBottomSheet();

  const onTermsOfServicePress = () => {
    openBottomSheet("TERMS_OF_SERVICE");
  };

  const onPrivacyPolicyPress = () => {
    openBottomSheet("PRIVACY_POLICY");
  };

  const onUpdateChapterPress = () => {
    navigation.navigate("HomeTab", {
      screen: "UpdateChapter",
    });
  };

  const onPhoneNumberPress = () => {
    navigation.navigate("HomeTab", {
      screen: "PhoneNumber",
    });
  };

  const onUpdateBillingPress = () => {
    navigation.navigate("HomeTab", {
      screen: "UpdateBilling",
    });
  };

  const onUpdateNotificationsPress = () => {
    navigation.navigate("HomeTab", {
      screen: "UpdateNotifications",
    });
  };

  const onLinkSharingPress = () => {
    navigation.navigate("HomeTab", {
      screen: "LinkSharing",
    });
  };

  const onLogout = async () => {
    const res = await logoutMutation.mutateAsync();

    if ("error" in res.data) return;

    clearUserData();
  };

  const onDeleteAccount = () => {
    alert({
      title: Content.confirmDeleteAccount.title,
      message: Content.confirmDeleteAccount.subtitle,
      buttons: [
        {
          style: "cancel",
          text: "No, Cancel",
        },
        {
          style: "destructive",
          text: "Yes, Delete",
          onPress: async () => {
            await mutation.mutateAsync();
          },
        },
      ],
    });
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
