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
} from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

/** Update the 'useNavigation' hook to include the new screens */
declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppStackParams {}
  }
}

export type HomeTabParams = {
  Home: undefined;
  Settings: undefined;
  LinkSharing: undefined;
  PhoneNumber: undefined;
  UpdateBilling: undefined;
  UpdateChapter: undefined;
  UpdateGeneral: undefined;
  UpdateSecurity: undefined;
  UpdateNotifications: undefined;
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

export type EventsTabParams = {
  Events: undefined;
};

export type AdminTabParams = {
  Admin: undefined;
  AdminChapters: undefined;
  AdminUITesting: undefined;
  AdminNetwork: undefined;
};

export type MainStackParams = {
  HomeTab: NavigatorScreenParams<HomeTabParams>;
  PNMsTab: NavigatorScreenParams<PNMsTabParams>;
  AddTab: NavigatorScreenParams<AddTabParams>;
  MessagesTab: NavigatorScreenParams<MessagesTabParams>;
  EventsTab: NavigatorScreenParams<EventsTabParams>;
  AdminTab: NavigatorScreenParams<AdminTabParams>;
};

export type ConversationStackParams = {
  Chat: { pnm: PNM };
  Create: { pnms: PNM[] };
};

export type AppStackParams = {
  Main: NavigatorScreenParams<MainStackParams>;
  Conversation: NavigatorScreenParams<ConversationStackParams>;
};

export type HomeStackProps<Screen extends keyof HomeTabParams> =
  CompositeScreenProps<
    CompositeScreenProps<
      NativeStackScreenProps<HomeTabParams, Screen>,
      BottomTabScreenProps<MainStackParams, "HomeTab">
    >,
    NativeStackScreenProps<AppStackParams, "Main">
  >;

export type PNMsStackProps<Screen extends keyof PNMsTabParams> =
  CompositeScreenProps<
    CompositeScreenProps<
      NativeStackScreenProps<PNMsTabParams, Screen>,
      BottomTabScreenProps<MainStackParams, "PNMsTab">
    >,
    NativeStackScreenProps<AppStackParams, "Main">
  >;

export type AddStackProps<Screen extends keyof AddTabParams> =
  CompositeScreenProps<
    CompositeScreenProps<
      NativeStackScreenProps<AddTabParams, Screen>,
      BottomTabScreenProps<MainStackParams, "AddTab">
    >,
    NativeStackScreenProps<AppStackParams, "Main">
  >;

export type MessagesStackProps<Screen extends keyof MessagesTabParams> =
  CompositeScreenProps<
    CompositeScreenProps<
      NativeStackScreenProps<MessagesTabParams, Screen>,
      BottomTabScreenProps<MainStackParams, "MessagesTab">
    >,
    NativeStackScreenProps<AppStackParams, "Main">
  >;

export type EventsStackProps<Screen extends keyof EventsTabParams> =
  CompositeScreenProps<
    CompositeScreenProps<
      NativeStackScreenProps<EventsTabParams, Screen>,
      BottomTabScreenProps<MainStackParams, "EventsTab">
    >,
    NativeStackScreenProps<AppStackParams, "Main">
  >;

export type AdminStackProps<Screen extends keyof AdminTabParams> =
  CompositeScreenProps<
    CompositeScreenProps<
      NativeStackScreenProps<AdminTabParams, Screen>,
      BottomTabScreenProps<MainStackParams, "AdminTab">
    >,
    NativeStackScreenProps<AppStackParams, "Main">
  >;

export type ConversationStackProps<
  Screen extends keyof ConversationStackParams,
> = CompositeScreenProps<
  NativeStackScreenProps<ConversationStackParams, Screen>,
  NativeStackScreenProps<AppStackParams, "Conversation">
>;
