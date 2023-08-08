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

import PNMsScreen from "@/navigation/screens/pnms/PNMs";

import HomeScreen from "@/navigation/screens/home/Home";

import MessagesScreen from "@/navigation/screens/messages/Messages";

import BillingScreen from "@/navigation/screens/billing/Billing";

import VerificationScreen from "@/navigation/screens/verification/Verification";

import SettingsScreen from "@/navigation/screens/settings/Settings";
import UpdateBillingScreen from "@/navigation/screens/settings/UpdateBilling";
import OrganizationScreen from "@/navigation/screens/settings/organization/Organization";
import UpdateNotificationsScreen from "@/navigation/screens/settings/UpdateNotifications";
import UpdateGeneralScreen from "@/navigation/screens/settings/organization/UpdateGeneral";
import UpdateSecurityScreen from "@/navigation/screens/settings/organization/UpdateSecurity";

import LoginScreen from "@/navigation/screens/auth/Login";
import LandingScreen from "@/navigation/screens/auth/Landing";
import RegistrationStep1Screen from "@/navigation/screens/auth/RegistrationStep1";
import RegistrationStep2Screen from "@/navigation/screens/auth/RegistrationStep2";
import RegistrationStep3Screen from "@/navigation/screens/auth/RegistrationStep3";

export const Stack = createNativeStackNavigator();

/**
 * Stack Navigator for Auth Screens
 *
 * This is a seperate stack navigator as the authentication
 * process should be fully isolated from the rest of the app
 */
export const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
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
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Verification"
        component={VerificationScreen}
      />
    </Stack.Navigator>
  );
};

/**
 * Stack Navigator for Billing Screens
 *
 * This is a seperate stack navigator as the billing
 * process should be fully isolated from the rest of the app
 * and the authentication process
 * and the verification process
 */
export const BillingStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Billing"
        component={BillingScreen}
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
  return (
    <Stack.Navigator>
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
  return (
    <Stack.Navigator>
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
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Messages"
        component={MessagesScreen}
      />
    </Stack.Navigator>
  );
};

/**
 * Stack Navigator App Settings Screen
 *
 * This is the main stack navigator for the app
 * when the user is on the "Settings" tab
 */
export const SettingsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
      />
      <Stack.Screen
        name="UpdateBilling"
        component={UpdateBillingScreen}
      />
      <Stack.Screen
        name="Organization"
        component={OrganizationScreen}
      />
      <Stack.Screen
        name="UpdateGeneral"
        component={UpdateGeneralScreen}
      />
      <Stack.Screen
        name="UpdateSecurity"
        component={UpdateSecurityScreen}
      />
      <Stack.Screen
        name="UpdateNotifications"
        component={UpdateNotificationsScreen}
      />
    </Stack.Navigator>
  );
};
