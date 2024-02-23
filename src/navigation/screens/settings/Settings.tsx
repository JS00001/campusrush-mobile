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
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import Layout from "@/ui/Layout";
import Button from "@/ui/Button";
import AppConstants from "@/constants";
import ActionCard from "@/ui/ActionCard";
import Content from "@/constants/content";
import { useAuth } from "@/providers/Auth";
import useModalsStore from "@/state/modals";
import { useBottomSheets } from "@/providers/BottomSheet";
import useDeleteChapter from "@/hooksv1/auth/useDeleteChapter";

interface SettingsProps {
  navigation: NativeStackNavigationProp<any>;
}

const Settings: React.FC<SettingsProps> = ({ navigation }) => {
  const { chapter, signOut, isPro } = useAuth();
  const { handlePresentModalPress } = useBottomSheets();
  const { onDeleteChapter, isLoading } = useDeleteChapter();

  const openModal = useModalsStore((state) => state.openModal);

  const onHelpPress = () => {
    handlePresentModalPress("HELP");
  };

  const onAboutPress = () => {
    handlePresentModalPress("ABOUT");
  };

  const onTermsAndConditionsPress = () => {
    handlePresentModalPress("TERMS_AND_CONDITIONS");
  };

  const onPrivacyPolicyPress = () => {
    handlePresentModalPress("PRIVACY_POLICY");
  };

  const onChapterPress = () => {
    navigation.navigate("UpdateChapter");
  };

  const onPhoneNumberPress = () => {
    navigation.navigate("PhoneNumber");
  };

  const onBillingPress = () => {
    navigation.navigate("UpdateBilling");
  };

  const onNotificationsPress = () => {
    navigation.navigate("UpdateNotifications");
  };

  const onDeleteAccountPress = () => {
    openModal({
      name: "ERROR",
      props: {
        title: Content.confirmDeleteAccount.title,
        subtitle: Content.confirmDeleteAccount.subtitle,
        secondaryButtonText: "No, Cancel",
        primaryButtonText: "Yes, Delete",
        primaryButtonAction: onDeleteChapter,
      },
    });
  };

  const onLinkSharingPress = () => {
    if (isPro) {
      navigation.navigate("LinkSharing");
      return;
    }

    openModal({
      name: "UPGRADE",
      props: {
        subtitle: Content.addPNM.shareQRCodeUpgrade,
      },
    });
  };

  return (
    <Layout scrollable gap={12} contentContainerStyle={tw`pb-6`}>
      <Layout.Header
        hasBackButton
        title="Settings"
        subtitle="Manage your chapter"
      />

      <ActionCard
        title="Chapter"
        subtitle="Manage your chapter"
        icon="ri-building-2-fill"
        onPress={onChapterPress}
      />

      <ActionCard
        title="Notifications"
        subtitle="Manage your notifications"
        icon="ri-notification-2-fill"
        onPress={onNotificationsPress}
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
        onPress={onBillingPress}
      />

      <View style={tw`w-full flex-row gap-3`}>
        <ActionCard
          size="sm"
          icon="ri-file-list-3-fill"
          title="Terms of Service"
          subtitle="View our terms and conditions"
          onPress={onTermsAndConditionsPress}
        />

        <ActionCard
          size="sm"
          icon="ri-shield-user-fill"
          title="Privacy Policy"
          subtitle="View our privacy policy"
          onPress={onPrivacyPolicyPress}
        />
      </View>

      <Button size="sm" style={tw`w-full`} onPress={signOut}>
        Sign Out of {chapter.name}
      </Button>

      <Button
        size="sm"
        color="gray"
        style={tw`w-full`}
        loading={isLoading}
        textStyle={tw`text-red font-medium`}
        onPress={onDeleteAccountPress}
      >
        Delete Account
      </Button>

      <Text variant="subtext" style={tw`text-slate-600`}>
        App Version: {AppConstants.version}
      </Text>
    </Layout>
  );
};

export default Settings;
