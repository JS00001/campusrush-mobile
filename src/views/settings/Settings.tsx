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
import AppConstants from "@/constants";
import { useBottomSheetStore } from "@/store";
import ListItem from "@/ui/ListItems/ListItem";
import { useDeleteChapter } from "@/hooks/api/chapter";

const SettingsView = () => {
  const navigation = useNavigation();
  const deletionMutation = useDeleteChapter();
  const bottomSheetStore = useBottomSheetStore();

  const onTermsOfServicePress = () => {
    bottomSheetStore.open("TERMS_OF_SERVICE");
  };

  const onPrivacyPolicyPress = () => {
    bottomSheetStore.open("PRIVACY_POLICY");
  };

  const onChapterPress = () => {
    navigation.navigate("Main", {
      screen: "MoreTab",
      params: {
        screen: "ManageChapter",
      },
    });
  };

  const onNotificationsPress = () => {
    navigation.navigate("Main", {
      screen: "MoreTab",
      params: {
        screen: "ManagePushNotifications",
      },
    });
  };

  const onPhoneNumberPress = () => {
    navigation.navigate("Main", {
      screen: "MoreTab",
      params: {
        screen: "ManagePhoneNumber",
      },
    });
  };

  const onBillingPress = () => {
    navigation.navigate("Main", {
      screen: "MoreTab",
      params: {
        screen: "ManageBilling",
      },
    });
  };

  const onLinkSharingPress = () => {
    navigation.navigate("Main", {
      screen: "MoreTab",
      params: {
        screen: "ManageLinkSharing",
      },
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
        title="General"
        subtitle="Manage your general information"
        icon="BuildingsFill"
        onPress={onChapterPress}
      />
      <ListItem
        size="lg"
        title="Notifications"
        subtitle="Manage your notifications"
        icon="BellFill"
        onPress={onNotificationsPress}
      />
      <ListItem
        size="lg"
        title="Phone Number"
        subtitle="Your custom phone number "
        icon="PhoneFill"
        onPress={onPhoneNumberPress}
      />
      <ListItem
        size="lg"
        title="Link Sharing"
        subtitle="Manage your link sharing"
        icon="LinkFill"
        onPress={onLinkSharingPress}
      />
      <ListItem
        size="lg"
        title="Billing"
        subtitle="Manage your billing"
        icon="CreditCardFill"
        onPress={onBillingPress}
      />

      <View style={tw`w-full flex-row gap-3`}>
        <ListItem
          size="sm"
          icon="FilesFill"
          title="Terms of Service"
          subtitle="View our terms and conditions"
          onPress={onTermsOfServicePress}
        />
        <ListItem
          size="sm"
          icon="FilesFill"
          title="Privacy Policy"
          subtitle="View our privacy policy"
          onPress={onPrivacyPolicyPress}
        />
      </View>

      <Button
        color="secondary"
        style={tw`w-full`}
        loading={deletionMutation.isPending}
        textStyle={tw`text-red-500 font-medium`}
        onPress={onDeleteAccount}
      >
        Delete Account
      </Button>

      <Text type="p4" style={tw`text-gray-600`}>
        App Version: {AppConstants.version}
      </Text>
    </>
  );
};

export default SettingsView;
