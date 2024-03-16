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

import AdminScreen from "@/navigation/screens/admin/Admin";
import AdminNetwork from "@/navigation/screens/admin/Network";
import AdminUITestingScreen from "@/navigation/screens/admin/UITesting";
import AdminChaptersScreen from "@/navigation/screens/admin/Chapters";

import ActionButtonScreen from "@/navigation/screens/admin/UIComponents/ActionButton";
import BadgeScreen from "@/navigation/screens/admin/UIComponents/Badge";
import ButtonScreen from "@/navigation/screens/admin/UIComponents/Button";
import ButtonGroupScreen from "@/navigation/screens/admin/UIComponents/ButtonGroup";
import ChapterScreen from "@/navigation/screens/admin/UIComponents/Chapter";
import ConversationScreen from "@/navigation/screens/admin/UIComponents/Conversation";
import CopyActionScreen from "@/navigation/screens/admin/UIComponents/CopyAction";
import CopyViewScreen from "@/navigation/screens/admin/UIComponents/CopyView";
import DateTimePickerScreen from "@/navigation/screens/admin/UIComponents/DateTimePicker";
import DetailViewScreen from "@/navigation/screens/admin/UIComponents/DetailView";
import EventScreen from "@/navigation/screens/admin/UIComponents/Event";
import FormFieldScreen from "@/navigation/screens/admin/UIComponents/FormField";
import HeadlineScreen from "@/navigation/screens/admin/UIComponents/Headline";
import HyperlinkScreen from "@/navigation/screens/admin/UIComponents/Hyperlink";
import IconScreen from "@/navigation/screens/admin/UIComponents/Icon";
import IconButtonScreen from "@/navigation/screens/admin/UIComponents/IconButton";
import IconLabelScreen from "@/navigation/screens/admin/UIComponents/IconLabel";
import InformationScreen from "@/navigation/screens/admin/UIComponents/Information";
import ListItemScreen from "@/navigation/screens/admin/UIComponents/ListItem";
import MenuScreen from "@/navigation/screens/admin/UIComponents/Menu";
import MessageBubbleScreen from "@/navigation/screens/admin/UIComponents/MessageBubble";
import ModalScreen from "@/navigation/screens/admin/UIComponents/Modal";
import ProgressScreen from "@/navigation/screens/admin/UIComponents/Progress";
import SegmentedControlScreen from "@/navigation/screens/admin/UIComponents/SegmentedControl";
import SelectScreen from "@/navigation/screens/admin/UIComponents/Select";
import SelectionCardScreen from "@/navigation/screens/admin/UIComponents/SelectionCard";
import SkeletonScreen from "@/navigation/screens/admin/UIComponents/Skeleton";
import SwipeableScreen from "@/navigation/screens/admin/UIComponents/Swipeable";
import TabsScreen from "@/navigation/screens/admin/UIComponents/Tabs";
import TextScreen from "@/navigation/screens/admin/UIComponents/Text";
import TextInputScreen from "@/navigation/screens/admin/UIComponents/TextInput";
import TooltipScreen from "@/navigation/screens/admin/UIComponents/Tooltip";
import TypewriterScreen from "@/navigation/screens/admin/UIComponents/Typewriter";

import PNMsScreen from "@/navigation/screens/pnms/Pnms";

import HomeScreen from "@/navigation/screens/home/Home";
import ChatScreen from "@/navigation/screens/messages/Chat";
import MessagesScreen from "@/navigation/screens/messages/Messages";
import NewMessageScreen from "@/navigation/screens/messages/NewMessage";

import BillingScreen from "@/navigation/screens/billing/Billing";

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
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
      />
      <Stack.Screen
        name="LinkSharing"
        component={LinkSharingScreen}
      />
      <Stack.Screen
        name="PhoneNumber"
        component={PhoneNumber}
      />
      <Stack.Screen
        name="UpdateBilling"
        component={UpdateBillingScreen}
      />
      <Stack.Screen
        name="UpdateChapter"
        component={UpdateChapterScreen}
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

/**
 * Stack Navigator App PNMs Screen
 *
 * This is the main stack navigator for the app
 * when the user is on the "PNMs" tab
 */
export const PNMsStack = () => {
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
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animationTypeForReplace: "pop" }}
    >
      <Stack.Screen
        name="Messages"
        component={MessagesScreen}
      />
      <Stack.Screen
        name="NewMessage"
        component={NewMessageScreen}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
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
export const EventsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Events"
        component={EventsScreen}
      />
    </Stack.Navigator>
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
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Admin"
        component={AdminScreen}
      />
      <Stack.Screen
        name="AdminChapters"
        component={AdminChaptersScreen}
      />
      <Stack.Screen
        name="AdminUITesting"
        component={AdminUITestingScreen}
      />
      <Stack.Screen
        name="AdminNetwork"
        component={AdminNetwork}
      />
      <Stack.Screen
        name="UIActionButton"
        component={ActionButtonScreen}
      />
      <Stack.Screen
        name="UIBadge"
        component={BadgeScreen}
      />
      <Stack.Screen
        name="UIButton"
        component={ButtonScreen}
      />
      <Stack.Screen
        name="UIBtnGroup"
        component={ButtonGroupScreen}
      />
      <Stack.Screen
        name="UIChapter"
        component={ChapterScreen}
      />
      <Stack.Screen
        name="UIConversation"
        component={ConversationScreen}
      />
      <Stack.Screen
        name="UICopyAction"
        component={CopyActionScreen}
      />
      <Stack.Screen
        name="UICopyView"
        component={CopyViewScreen}
      />
      <Stack.Screen
        name="UIDateTimePicker"
        component={DateTimePickerScreen}
      />
      <Stack.Screen
        name="UIDetailView"
        component={DetailViewScreen}
      />
      <Stack.Screen
        name="UIEvent"
        component={EventScreen}
      />
      <Stack.Screen
        name="UIFormField"
        component={FormFieldScreen}
      />
      <Stack.Screen
        name="UIHeadline"
        component={HeadlineScreen}
      />
      <Stack.Screen
        name="UIHyperlink"
        component={HyperlinkScreen}
      />
      <Stack.Screen
        name="UIIcon"
        component={IconScreen}
      />
      <Stack.Screen
        name="UIIconButton"
        component={IconButtonScreen}
      />
      <Stack.Screen
        name="UIIconLabel"
        component={IconLabelScreen}
      />
      <Stack.Screen
        name="UIInformation"
        component={InformationScreen}
      />
      <Stack.Screen
        name="UIListItem"
        component={ListItemScreen}
      />
      <Stack.Screen
        name="UIMenu"
        component={MenuScreen}
      />
      <Stack.Screen
        name="UIMessageBubble"
        component={MessageBubbleScreen}
      />
      <Stack.Screen
        name="UIModal"
        component={ModalScreen}
      />
      <Stack.Screen
        name="UIProgress"
        component={ProgressScreen}
      />
      <Stack.Screen
        name="UISegmentedControl"
        component={SegmentedControlScreen}
      />
      <Stack.Screen
        name="UISelect"
        component={SelectScreen}
      />
      <Stack.Screen
        name="UISelectionCard"
        component={SelectionCardScreen}
      />
      <Stack.Screen
        name="UISkeleton"
        component={SkeletonScreen}
      />
      <Stack.Screen
        name="UISwipeable"
        component={SwipeableScreen}
      />
      <Stack.Screen
        name="UITabs"
        component={TabsScreen}
      />
      <Stack.Screen
        name="UIText"
        component={TextScreen}
      />
      <Stack.Screen
        name="UITextInput"
        component={TextInputScreen}
      />
      <Stack.Screen
        name="UITooltip"
        component={TooltipScreen}
      />
      <Stack.Screen
        name="UITypewriter"
        component={TypewriterScreen}
      />
    </Stack.Navigator>
  );
};
