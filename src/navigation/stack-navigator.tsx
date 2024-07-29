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

import {
  HomeStackScreens,
  PNMsStackScreens,
  MessagesStackScreens,
  EventsStackScreens,
  AdminStackScreens,
} from "@/navigation/@types/index";

import AdminScreen from "@/navigation/screens/admin/Admin";
import AdminNetwork from "@/navigation/screens/admin/Network";
import AdminUITestingScreen from "@/navigation/screens/admin/UITesting";
import AdminChaptersScreen from "@/navigation/screens/admin/Chapters";

import PNMsScreen from "@/navigation/screens/pnms/Pnms";

import HomeScreen from "@/navigation/screens/home/Home";
import ChatScreen from "@/navigation/screens/messages/Chat";
import MessagesScreen from "@/navigation/screens/messages/Messages";
import NewMessageScreen from "@/navigation/screens/messages/NewMessage";

import BillingScreen from "@/navigation/screens/billing/Billing";
import BillingTourStep1 from "@/navigation/screens/billing/tour/Step1";
import BillingTourStep2 from "@/navigation/screens/billing/tour/Step2";
import BillingTourStep3 from "@/navigation/screens/billing/tour/Step3";
import BillingTourStep4 from "@/navigation/screens/billing/tour/Step4";
import BillingTourStep5 from "@/navigation/screens/billing/tour/Step5";
import BillingTourStep6 from "@/navigation/screens/billing/tour/Step6";

import VerificationScreen from "@/navigation/screens/verification/Verification";

import LoginScreen from "@/navigation/screens/auth/Login";
import LandingScreen from "@/navigation/screens/auth/Landing";
import UITestingScreen from "@/navigation/screens/auth/UITesting";
import RegistrationStep1Screen from "@/navigation/screens/auth/RegistrationStep1";
import RegistrationStep2Screen from "@/navigation/screens/auth/RegistrationStep2";
import RegistrationStep3Screen from "@/navigation/screens/auth/RegistrationStep3";

import SettingsScreen from "@/navigation/screens/settings/Settings";
import PhoneNumber from "@/navigation/screens/settings/PhoneNumber";
import LinkSharingScreen from "@/navigation/screens/settings/LinkSharing";
import UpdateBillingScreen from "@/navigation/screens/settings/UpdateBilling";
import UpdateNotificationsScreen from "@/navigation/screens/settings/UpdateNotifications";
import UpdateGeneralScreen from "@/navigation/screens/settings/chapter/UpdateGeneral";
import UpdateSecurityScreen from "@/navigation/screens/settings/chapter/UpdateSecurity";
import UpdateChapterScreen from "@/navigation/screens/settings/chapter/UpdateChapter";

import EventsScreen from "@/navigation/screens/events/Events";
import { usePreferences } from "@/providers/Preferences";

const Stack = createNativeStackNavigator();

const HomeNavigation = createNativeStackNavigator<HomeStackScreens>();
const PnmsNavigation = createNativeStackNavigator<PNMsStackScreens>();
const MessagesNavigation = createNativeStackNavigator<MessagesStackScreens>();
const EventsNavigation = createNativeStackNavigator<EventsStackScreens>();
const AdminNavigation = createNativeStackNavigator<AdminStackScreens>();

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
 * process should be fully isolated from the rest of the app.
 * If the user has not completed the onboarding process, they will be brought
 * to the onboarding process first. Else, straight to the billing screen.
 */
export const BillingStack = () => {
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
  return (
    <HomeNavigation.Navigator screenOptions={{ headerShown: false }}>
      <HomeNavigation.Screen
        name="Home"
        component={HomeScreen}
      />
      <HomeNavigation.Screen
        name="Settings"
        component={SettingsScreen}
      />
      <HomeNavigation.Screen
        name="LinkSharing"
        component={LinkSharingScreen}
      />
      <HomeNavigation.Screen
        name="PhoneNumber"
        component={PhoneNumber}
      />
      <HomeNavigation.Screen
        name="UpdateBilling"
        component={UpdateBillingScreen}
      />
      <HomeNavigation.Screen
        name="UpdateChapter"
        component={UpdateChapterScreen}
      />
      <HomeNavigation.Screen
        name="UpdateGeneral"
        component={UpdateGeneralScreen}
      />
      <HomeNavigation.Screen
        name="UpdateSecurity"
        component={UpdateSecurityScreen}
      />
      <HomeNavigation.Screen
        name="UpdateNotifications"
        component={UpdateNotificationsScreen}
      />
    </HomeNavigation.Navigator>
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
    <PnmsNavigation.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="PNMs"
    >
      <PnmsNavigation.Screen
        name="PNMs"
        component={PNMsScreen}
      />
    </PnmsNavigation.Navigator>
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
    <MessagesNavigation.Navigator
      screenOptions={{ headerShown: false, animationTypeForReplace: "pop" }}
    >
      <MessagesNavigation.Screen
        name="Messages"
        component={MessagesScreen}
      />
      <MessagesNavigation.Screen
        name="NewMessage"
        component={NewMessageScreen}
      />
      <MessagesNavigation.Screen
        name="Chat"
        component={ChatScreen}
      />
    </MessagesNavigation.Navigator>
  );
};

/**
 * Stack Navigator App Events Screen
 *
 * This is the main stack navigator for the app
 * when the user is on the "Events" tab
 */
export const EventsStack = () => {
  return (
    <EventsNavigation.Navigator screenOptions={{ headerShown: false }}>
      <EventsNavigation.Screen
        name="Events"
        component={EventsScreen}
      />
    </EventsNavigation.Navigator>
  );
};

/**
 * Stack Navigator App Admin Screen
 *
 * This is the main stack navigator for the app
 * when the user is on the "Admin" tab and is an admin
 */
export const AdminStack = () => {
  return (
    <AdminNavigation.Navigator screenOptions={{ headerShown: false }}>
      <AdminNavigation.Screen
        name="Admin"
        component={AdminScreen}
      />
      <AdminNavigation.Screen
        name="AdminChapters"
        component={AdminChaptersScreen}
      />
      <AdminNavigation.Screen
        name="AdminUITesting"
        component={AdminUITestingScreen}
      />
      <AdminNavigation.Screen
        name="AdminNetwork"
        component={AdminNetwork}
      />
    </AdminNavigation.Navigator>
  );
};
