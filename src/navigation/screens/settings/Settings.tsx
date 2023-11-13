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

import tw from "@/lib/tailwind";
import Layout from "@/ui/Layout";
import Button from "@/ui/Button";
import ActionCard from "@/ui/ActionCard";
import { useAuth } from "@/providers/Auth";
import { useBottomSheets } from "@/providers/BottomSheet";

interface SettingsProps {
  navigation: NativeStackNavigationProp<any>;
}

const Settings: React.FC<SettingsProps> = ({ navigation }) => {
  const { organization, signOut } = useAuth();
  const { handlePresentModalPress } = useBottomSheets();

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

  const onOrganizationPress = () => {
    navigation.navigate("UpdateOrganization");
  };

  const onContactDetailsPress = () => {
    navigation.navigate("ContactDetails");
  };

  const onBillingPress = () => {
    navigation.navigate("UpdateBilling");
  };

  const onNotificationsPress = () => {
    navigation.navigate("UpdateNotifications");
  };

  return (
    <Layout scrollable gap={12} contentContainerStyle={tw`pb-6`}>
      <Layout.Header title="Settings" subtitle="Manage your organization" />

      <ActionCard
        title="Organization"
        subtitle="Manage your organization"
        icon="ri-building-2-fill"
        onPress={onOrganizationPress}
      />

      <ActionCard
        title="Your Contact Information"
        subtitle="View your contact information"
        icon="ri-phone-fill"
        onPress={onContactDetailsPress}
      />

      <ActionCard
        title="Billing"
        subtitle="Manage your billing"
        icon="ri-bank-card-2-fill"
        onPress={onBillingPress}
      />

      <ActionCard
        title="Notifications"
        subtitle="Manage your notifications"
        icon="ri-notification-2-fill"
        onPress={onNotificationsPress}
      />

      <View style={tw`w-full flex-row gap-3`}>
        <ActionCard
          size="sm"
          title="Help"
          subtitle="Contact our support team now"
          icon="ri-questionnaire-fill"
          onPress={onHelpPress}
        />

        <ActionCard
          size="sm"
          title="About"
          subtitle="View identifying app information"
          icon="ri-information-fill"
          onPress={onAboutPress}
        />
      </View>
      <View style={tw`w-full flex-row gap-3`}>
        <ActionCard
          size="sm"
          title="Terms of Use"
          subtitle="View our terms and conditions"
          icon="ri-file-list-3-fill"
          onPress={onTermsAndConditionsPress}
        />

        <ActionCard
          size="sm"
          title="Privacy Policy"
          subtitle="View our privacy policy"
          icon="ri-file-list-3-fill"
          onPress={onPrivacyPolicyPress}
        />
      </View>

      <Button size="sm" style={tw`w-full bg-primary`} onPress={signOut}>
        Sign Out of {organization.name}
      </Button>
    </Layout>
  );
};

export default Settings;
