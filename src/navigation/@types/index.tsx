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
    interface RootParamList extends TabParamList {}
  }
}

/** All of the screen and their params inside of the tab navigator */
export type TabStackParams = {
  HomeTab: {
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
  PNMsTab: {
    PNMs: undefined;
  };
  AddTab: {
    AddPnms: undefined;
  };
  MessagesTab: {
    Messages: undefined;
    Chat: { pnm: PNM };
    NewMessage: { pnms: PNM[] };
  };
  EventsTab: {
    Events: undefined;
  };
  AdminTab: {
    Admin: undefined;
    AdminChapters: undefined;
    AdminUITesting: undefined;
    AdminNetwork: undefined;
  };
};

export type TabParamList = {
  [K in keyof TabStackParams]: NavigatorScreenParams<TabStackParams[K]>;
};

export type NavigationProp<
  Tab extends keyof TabStackParams,
  RouteName extends Extract<keyof TabStackParams[Tab], string>,
> = CompositeScreenProps<
  NativeStackScreenProps<TabStackParams[Tab], RouteName>,
  BottomTabScreenProps<TabParamList, Tab>
>;

export type HomeStackScreens = TabStackParams["HomeTab"];
export type PNMsStackScreens = TabStackParams["PNMsTab"];
export type AddStackScreens = TabStackParams["AddTab"];
export type MessagesStackScreens = TabStackParams["MessagesTab"];
export type EventsStackScreens = TabStackParams["EventsTab"];
export type AdminStackScreens = TabStackParams["AdminTab"];
