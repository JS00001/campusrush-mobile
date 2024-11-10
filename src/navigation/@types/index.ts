/*
 * Created on Mon Jul 29 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import type { IPNM } from '@/types';

/** Update the 'useNavigation' hook to include the main app navigation */
declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppStackParams {}
  }
}

/**
 * Not included in global for useNavigation. To use with navigation,
 * import the 'X Stack Hook' and use it as a generic type for the screen props.
 * EX: useNavigation<AuthStackHook>()
 */
export type AuthStackHook = NativeStackNavigationProp<AuthStackParams>;
export type VerificationStackHook =
  NativeStackNavigationProp<VerificationStackParams>;
export type BillingStackHook = NativeStackNavigationProp<BillingStackParams>;

export type AuthStackParams = {
  Landing: undefined;
  Login: undefined;
  ForgotPasswordStep1: undefined;
  ForgotPasswordStep2: undefined;
  RegistrationStep1: undefined;
  RegistrationStep2: undefined;
  RegistrationStep3: undefined;
};

export type VerificationStackParams = {
  Verification: undefined;
};

export type BillingStackParams = {
  Billing: undefined;
  BillingTourStep1: undefined;
  BillingTourStep2: undefined;
  BillingTourStep3: undefined;
  BillingTourStep4: undefined;
  BillingTourStep5: undefined;
  BillingTourStep6: undefined;
};

/**
 * IS included in the global for useNavigation. To use with navigation,
 * just use the normal useNavigation hook.
 * EX: useNavigation()
 */
export type HomeTabParams = {
  Home: undefined;
};

export type PNMsTabParams = {
  PNMs: undefined;
};

export type AddTabParams = {
  AddPnms: undefined;
};

export type MessagesTabParams = {
  Messages: undefined;
};

export type MoreTabParams = {
  // Notifications
  Notifications: undefined;
  // Events
  Events: undefined;
  // Admin
  AdminChapters: undefined;
  AdminUITesting: undefined;
  AdminNetwork: undefined;
  AdminWebsocket: undefined;
  AdminViolations: undefined;
  // Settings
  Settings: undefined;
  ManageLinkSharing: undefined;
  ManagePhoneNumber: undefined;
  ManageChapter: undefined;
  ManageBilling: undefined;
  ManagePushNotifications: undefined;
  // Security
  Security: undefined;
  Sessions: undefined;
  ChangePassword: undefined;
};

export type MainStackParams = {
  HomeTab: NavigatorScreenParams<HomeTabParams>;
  PNMsTab: NavigatorScreenParams<PNMsTabParams>;
  AddTab: NavigatorScreenParams<AddTabParams>;
  MessagesTab: NavigatorScreenParams<MessagesTabParams>;
  MoreTab: NavigatorScreenParams<MoreTabParams>;
};

export type ConversationStackParams = {
  Chat: { pnm: IPNM };
  Create: { pnms: IPNM[] };
};

export type AppStackParams = {
  Main: NavigatorScreenParams<MainStackParams>;
  Conversation: NavigatorScreenParams<ConversationStackParams>;
};

/**
 * Prop types for all screens in the Main Stack. To use, import the type, and
 * pass the current screen name as a generic type.
 * Ex: type Props = HomeStackProps<"Home">;
 * Ex: type Props = ConversationStackProps<"Chat">;
 *
 * If a new screen is added to a tab's stack, it automatically gets added to the
 * global types, nothing needs to be changed.
 *
 * If a new tab is added, it needs to have its own StackProps type created.
 */
export type HomeStackProps<Screen extends keyof HomeTabParams> =
  CompositeScreenProps<
    CompositeScreenProps<
      NativeStackScreenProps<HomeTabParams, Screen>,
      BottomTabScreenProps<MainStackParams, 'HomeTab'>
    >,
    NativeStackScreenProps<AppStackParams, 'Main'>
  >;

export type PNMsStackProps<Screen extends keyof PNMsTabParams> =
  CompositeScreenProps<
    CompositeScreenProps<
      NativeStackScreenProps<PNMsTabParams, Screen>,
      BottomTabScreenProps<MainStackParams, 'PNMsTab'>
    >,
    NativeStackScreenProps<AppStackParams, 'Main'>
  >;

export type AddStackProps<Screen extends keyof AddTabParams> =
  CompositeScreenProps<
    CompositeScreenProps<
      NativeStackScreenProps<AddTabParams, Screen>,
      BottomTabScreenProps<MainStackParams, 'AddTab'>
    >,
    NativeStackScreenProps<AppStackParams, 'Main'>
  >;

export type MessagesStackProps<Screen extends keyof MessagesTabParams> =
  CompositeScreenProps<
    CompositeScreenProps<
      NativeStackScreenProps<MessagesTabParams, Screen>,
      BottomTabScreenProps<MainStackParams, 'MessagesTab'>
    >,
    NativeStackScreenProps<AppStackParams, 'Main'>
  >;

export type MoreStackProps<Screen extends keyof MoreTabParams> =
  CompositeScreenProps<
    CompositeScreenProps<
      NativeStackScreenProps<MoreTabParams, Screen>,
      BottomTabScreenProps<MainStackParams, 'MoreTab'>
    >,
    NativeStackScreenProps<AppStackParams, 'Main'>
  >;

export type ConversationStackProps<
  Screen extends keyof ConversationStackParams,
> = CompositeScreenProps<
  NativeStackScreenProps<ConversationStackParams, Screen>,
  NativeStackScreenProps<AppStackParams, 'Conversation'>
>;

/**
 * Prop types for all 'onboarding' screens (not the main app). To use, import the type,
 * and pass the current screen name as a generic type.
 * Ex: type Props = AuthStackProps<"Landing">;
 * Ex: type Props = VerificationStackProps<"Verification">;
 */
export type AuthStackProps<Screen extends keyof AuthStackParams> =
  NativeStackScreenProps<AuthStackParams, Screen>;

export type VerificationStackProps<
  Screen extends keyof VerificationStackParams,
> = NativeStackScreenProps<VerificationStackParams, Screen>;

export type BillingStackProps<Screen extends keyof BillingStackParams> =
  NativeStackScreenProps<BillingStackParams, Screen>;
