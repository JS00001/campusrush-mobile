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

import Icon from "react-native-remix-icon";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import {
  AddStack,
  HomeStack,
  MessagesStack,
  PNMsStack,
  SettingsStack,
} from "@/navigation/stack-navigator";
import tw from "@/lib/tailwind";

export const Tab = createBottomTabNavigator();

/**
 * Tab Navigator for the App
 *
 * This is the main tab navigator for the app
 * and contains five independent stack navigators
 */
export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: tw.color("primary"),
        tabBarInactiveTintColor: tw.color("gray-400"),
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <Icon
                name="ri-home-fill"
                size={26}
                color={color}
              />
            ) : (
              <Icon
                name="ri-home-line"
                size={26}
                color={color}
              />
            ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="PNMsTab"
        component={PNMsStack}
        options={{
          tabBarLabel: "PNMs",
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <Icon
                name="ri-file-list-2-fill"
                size={26}
                color={color}
              />
            ) : (
              <Icon
                name="ri-file-list-2-line"
                size={26}
                color={color}
              />
            ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="AddTab"
        component={AddStack}
        options={{
          tabBarLabel: "Add",
          tabBarIcon: ({ color, focused }) => (
            <Icon
              name="ri-add-fill"
              size={26}
              color={color}
            />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="MessagesTab"
        component={MessagesStack}
        options={{
          tabBarLabel: "Messages",
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <Icon
                name="ri-chat-1-fill"
                size={26}
                color={color}
              />
            ) : (
              <Icon
                name="ri-chat-1-line"
                size={26}
                color={color}
              />
            ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="SettingsTab"
        component={SettingsStack}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <Icon
                name="ri-settings-3-fill"
                size={26}
                color={color}
              />
            ) : (
              <Icon
                name="ri-settings-3-line"
                size={26}
                color={color}
              />
            ),
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};
