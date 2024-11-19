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

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import type {
  AuthStackParams,
  BillingStackParams,
  MoreTabParams,
  HomeTabParams,
  MessagesTabParams,
  PNMsTabParams,
  VerificationStackParams,
} from "@/navigation/@types";

import { usePreferences } from "@/providers/Preferences";

import HomeScreen from "@/navigation/screens/Home";
import PNMsScreen from "@/navigation/screens/Pnms";
import MessagesScreen from "@/navigation/screens/Messages";
import EventsScreen from "@/navigation/screens/Events";
import NotificationsScreen from "@/navigation/screens/Notifications";
import VerificationScreen from "@/navigation/screens/Verification";

import LoginScreen from "@/navigation/screens/auth/Login";
import LandingScreen from "@/navigation/screens/auth/Landing";
import RegistrationStep1Screen from "@/navigation/screens/auth/registration/Step1";
import RegistrationStep2Screen from "@/navigation/screens/auth/registration/Step2";
import RegistrationStep3Screen from "@/navigation/screens/auth/registration/Step3";
import ForgotPasswordStep1Screen from "@/navigation/screens/auth/forgot-password/Step1";
import ForgotPasswordStep2Screen from "@/navigation/screens/auth/forgot-password/Step2";

import BillingScreen from "@/navigation/screens/billing/Billing";
import BillingTourStep1 from "@/navigation/screens/billing/tour/Step1";
import BillingTourStep2 from "@/navigation/screens/billing/tour/Step2";
import BillingTourStep3 from "@/navigation/screens/billing/tour/Step3";
import BillingTourStep4 from "@/navigation/screens/billing/tour/Step4";
import BillingTourStep5 from "@/navigation/screens/billing/tour/Step5";
import BillingTourStep6 from "@/navigation/screens/billing/tour/Step6";

import AdminNetwork from "@/navigation/screens/admin/Network";
import AdminWebsocket from "@/navigation/screens/admin/Websocket";
import AdminUITestingScreen from "@/navigation/screens/admin/UITesting";
import AdminChaptersScreen from "@/navigation/screens/admin/Chapters";
import AdminViolationsScreen from "@/navigation/screens/admin/Violations";

import SettingsScreen from "@/navigation/screens/settings/Settings";
import SettingsPhoneNumberScreen from "@/navigation/screens/settings/ManagePhoneNumber";
import SettingsLinkSharingScreen from "@/navigation/screens/settings/ManageLinkSharing";
import SettingsBillingScreen from "@/navigation/screens/settings/ManageBilling";
import SettingsNotificationsScreen from "@/navigation/screens/settings/ManagePushNotifications";
import SettingsChapterScreen from "@/navigation/screens/settings/ManageChapter";

import SettingsSecurityScreen from "@/navigation/screens/security/Security";
import SettingsChangePasswordScreen from "@/navigation/screens/security/ChangePassword";

/**
 * Stack Navigator for Auth Screens
 *
 * This is a seperate stack navigator as the authentication
 * process should be fully isolated from the rest of the app
 */
export const AuthStack = () => {
  const Stack = createNativeStackNavigator<AuthStackParams>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Landing"
        component={LandingScreen}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
      />
      <Stack.Screen
        name="ForgotPasswordStep1"
        component={ForgotPasswordStep1Screen}
      />
      <Stack.Screen
        name="ForgotPasswordStep2"
        component={ForgotPasswordStep2Screen}
      />
      <Stack.Screen
        name="RegistrationStep1"
        component={RegistrationStep1Screen}
      />
      <Stack.Screen
        name="RegistrationStep2"
        component={RegistrationStep2Screen}
      />
      <Stack.Screen
        name="RegistrationStep3"
        component={RegistrationStep3Screen}
      />
    </Stack.Navigator>
  );
};

/**
 * Stack Navigator for Verification Screens
 *
 * This is a seperate stack navigator as the verification
 * process should be fully isolated from the rest of the app
 * and the authentication process
 */
export const VerificationStack = () => {
  const Stack = createNativeStackNavigator<VerificationStackParams>();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Verification"
        component={VerificationScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

/**
 * Stack Navigator for Billing Screens
 *
 * This is a seperate stack navigator as the billing
 * process should be fully isolated from the rest of the app.
 * If the user has not completed the onboarding process, they will be brought
 * to the onboarding process first. Else, straight to the billing screen.
 */
export const BillingStack = () => {
  const Stack = createNativeStackNavigator<BillingStackParams>();

  const { onboardingComplete } = usePreferences();
  const initialRouteName = onboardingComplete ? "Billing" : "BillingTourStep1";

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: "fade" }}
      initialRouteName={initialRouteName}
    >
      <Stack.Screen
        name="Billing"
        component={BillingScreen}
      />
      <Stack.Screen
        name="BillingTourStep1"
        component={BillingTourStep1}
      />
      <Stack.Screen
        name="BillingTourStep2"
        component={BillingTourStep2}
      />
      <Stack.Screen
        name="BillingTourStep3"
        component={BillingTourStep3}
      />
      <Stack.Screen
        name="BillingTourStep4"
        component={BillingTourStep4}
      />
      <Stack.Screen
        name="BillingTourStep5"
        component={BillingTourStep5}
      />
      <Stack.Screen
        name="BillingTourStep6"
        component={BillingTourStep6}
      />
    </Stack.Navigator>
  );
};

/**
 * Stack Navigator App Home Screen
 *
 * This is the main stack navigator for the app
 * when the user is on the "Home" tab
 */
export const HomeStack = () => {
  const Stack = createNativeStackNavigator<HomeTabParams>();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
      />
    </Stack.Navigator>
  );
};

/**
 * Stack Navigator App PNMs Screen
 *
 * This is the main stack navigator for the app
 * when the user is on the "PNMs" tab
 */
export const PNMsStack = () => {
  const Stack = createNativeStackNavigator<PNMsTabParams>();

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="PNMs"
    >
      <Stack.Screen
        name="PNMs"
        component={PNMsScreen}
      />
    </Stack.Navigator>
  );
};

/**
 * Stack Navigator App Messages Screen
 *
 * This is the main stack navigator for the app
 * when the user is on the "Messages" tab
 */
export const MessagesStack = () => {
  const Stack = createNativeStackNavigator<MessagesTabParams>();

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animationTypeForReplace: "pop" }}
    >
      <Stack.Screen
        name="Messages"
        component={MessagesScreen}
      />
    </Stack.Navigator>
  );
};

/**
 * Stack Navigator App Events Screen
 *
 * This is the main stack navigator for the app
 * when the user is on the "Events" tab
 */
export const MoreStack = () => {
  const Stack = createNativeStackNavigator<MoreTabParams>();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Events, and all sub screens */}
      <Stack.Screen
        name="Events"
        component={EventsScreen}
        options={{ gestureEnabled: false, animation: "none" }}
      />

      {/* Notifications and all sub screens */}
      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{ gestureEnabled: false, animation: "none" }}
      />

      {/* Admin, and all sub screens */}
      <Stack.Screen
        name="AdminChapters"
        component={AdminChaptersScreen}
        options={{ gestureEnabled: false, animation: "none" }}
      />
      <Stack.Screen
        name="AdminWebsocket"
        component={AdminWebsocket}
        options={{ gestureEnabled: false, animation: "none" }}
      />
      <Stack.Screen
        name="AdminUITesting"
        component={AdminUITestingScreen}
        options={{ gestureEnabled: false, animation: "none" }}
      />
      <Stack.Screen
        name="AdminNetwork"
        component={AdminNetwork}
        options={{ gestureEnabled: false, animation: "none" }}
      />
      <Stack.Screen
        name="AdminViolations"
        component={AdminViolationsScreen}
        options={{ gestureEnabled: false, animation: "none" }}
      />

      {/* Settings and all sub screens */}
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ gestureEnabled: false, animation: "none" }}
      />
      <Stack.Screen
        name="ManageLinkSharing"
        component={SettingsLinkSharingScreen}
      />
      <Stack.Screen
        name="ManagePhoneNumber"
        component={SettingsPhoneNumberScreen}
      />
      <Stack.Screen
        name="ManageBilling"
        component={SettingsBillingScreen}
      />
      <Stack.Screen
        name="ManageChapter"
        component={SettingsChapterScreen}
      />
      <Stack.Screen
        name="ManagePushNotifications"
        component={SettingsNotificationsScreen}
      />

      {/* Security and all sub screens */}
      <Stack.Screen
        name="Security"
        component={SettingsSecurityScreen}
        options={{ gestureEnabled: false, animation: "none" }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={SettingsChangePasswordScreen}
      />
    </Stack.Navigator>
  );
};
