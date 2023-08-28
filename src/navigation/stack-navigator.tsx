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

import AddScreen from "@/navigation/screens/add/Add";

import PNMsScreen from "@/navigation/screens/pnms/PNMs";

import HomeScreen from "@/navigation/screens/home/Home";

import MessagesScreen from "@/navigation/screens/messages/Messages";

import BillingScreen from "@/navigation/screens/billing/Billing";

import VerificationScreen from "@/navigation/screens/verification/Verification";

import SettingsScreen from "@/navigation/screens/settings/Settings";
import UpdateBillingScreen from "@/navigation/screens/settings/UpdateBilling";
import UpdateNotificationsScreen from "@/navigation/screens/settings/UpdateNotifications";
import UpdateGeneralScreen from "@/navigation/screens/settings/organization/UpdateGeneral";
import UpdateSecurityScreen from "@/navigation/screens/settings/organization/UpdateSecurity";
import UpdateOrganizationScreen from "@/navigation/screens/settings/organization/UpdateOrganization";

import LoginScreen from "@/navigation/screens/auth/Login";
import LandingScreen from "@/navigation/screens/auth/Landing";
import UITestingScreen from "@/navigation/screens/auth/UITesting";
import RegistrationStep1Screen from "@/navigation/screens/auth/RegistrationStep1";
import RegistrationStep2Screen from "@/navigation/screens/auth/RegistrationStep2";
import RegistrationStep3Screen from "@/navigation/screens/auth/RegistrationStep3";

import RegistrationProvider from "@/providers/Registration";

export const Stack = createNativeStackNavigator();

/**
 * Stack Navigator for Auth Screens
 *
 * This is a seperate stack navigator as the authentication
 * process should be fully isolated from the rest of the app
 */
export const AuthStack = () => {
  return (
    <RegistrationProvider>
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
        {__DEV__ && (
          <Stack.Screen
            name="UITesting"
            component={UITestingScreen}
          />
        )}
      </Stack.Navigator>
    </RegistrationProvider>
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
        options={{
          headerShown: false,
        }}
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
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="PNMs"
        component={PNMsScreen}
      />
    </Stack.Navigator>
  );
};

/**
 * Stack Navigator App Add Screen
 *
 * This is the main stack navigator for the app
 * when the user is on the "Add" tab
 */
export const AddStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Add"
        component={AddScreen}
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
    <Stack.Navigator screenOptions={{ headerShown: false }}>
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
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
      />
      <Stack.Screen
        name="UpdateBilling"
        component={UpdateBillingScreen}
      />
      <Stack.Screen
        name="UpdateOrganization"
        component={UpdateOrganizationScreen}
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
