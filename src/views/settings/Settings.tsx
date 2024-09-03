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
import { useAuth } from "@/providers/Auth";
import { useDeleteChapter } from "@/hooks/api/chapter";
import { useBottomSheet } from "@/providers/BottomSheet";

const SettingsView = () => {
  const navigation = useNavigation();
  const deletionMutation = useDeleteChapter();

  const { openBottomSheet } = useBottomSheet();
  const { chapter, logoutUser, mutations } = useAuth();

  const onTermsOfServicePress = () => {
    openBottomSheet("TERMS_OF_SERVICE");
  };

  const onPrivacyPolicyPress = () => {
    openBottomSheet("PRIVACY_POLICY");
  };

  const onChapterPress = () => {
    navigation.navigate("Main", {
      screen: "HomeTab",
      params: {
        screen: "Chapter",
      },
    });
  };

  const onNotificationsPress = () => {
    navigation.navigate("Main", {
      screen: "HomeTab",
      params: {
        screen: "Notifications",
      },
    });
  };

  const onSecurityPress = () => {
    navigation.navigate("Main", {
      screen: "HomeTab",
      params: {
        screen: "Security",
      },
    });
  };

  const onPhoneNumberPress = () => {
    navigation.navigate("Main", {
      screen: "HomeTab",
      params: {
        screen: "PhoneNumber",
      },
    });
  };

  const onBillingPress = () => {
    navigation.navigate("Main", {
      screen: "HomeTab",
      params: {
        screen: "Billing",
      },
    });
  };

  const onLinkSharingPress = () => {
    navigation.navigate("Main", {
      screen: "HomeTab",
      params: {
        screen: "LinkSharing",
      },
    });
  };

  const onLogout = async () => {
    alert({
      title: "Are you sure?",
      message:
        "You will be signed out of your account, and will need to sign back in.",
      buttons: [
        {
          style: "cancel",
          text: "No, Cancel",
        },
        {
          style: "destructive",
          text: "Yes, Sign Out",
          onPress: async () => {
            await logoutUser();
          },
        },
      ],
    });
  };

  const onDeleteAccount = () => {
    alert({
      title: "Are you sure?",
      message:
        "Your account will be permanently deleted with no way to recover it.",
      buttons: [
        {
          style: "cancel",
          text: "No, Cancel",
        },
        {
          style: "destructive",
          text: "Yes, Delete",
          onPress: async () => {
            await deletionMutation.mutateAsync();
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
        onPress={onChapterPress}
      />
      <ListItem
        size="lg"
        title="Notifications"
        subtitle="Manage your notifications"
        icon="notification-2-fill"
        onPress={onNotificationsPress}
      />
      <ListItem
        size="lg"
        title="Security"
        subtitle="Manage your security settings"
        icon="shield-check-fill"
        onPress={onSecurityPress}
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
        onPress={onBillingPress}
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
        onPress={onLogout}
        loading={mutations.logoutMutation.isLoading}
      >
        Sign Out of {chapter.name}
      </Button>

      <Button
        size="sm"
        color="secondary"
        style={tw`w-full`}
        loading={deletionMutation.isLoading}
        textStyle={tw`text-red font-medium`}
        onPress={onDeleteAccount}
      >
        Delete Account
      </Button>

      <Text type="p4" style={tw`text-slate-600`}>
        App Version: {AppConstants.version} - {AppConstants.updateVersion}
      </Text>
    </>
  );
};

export default SettingsView;
