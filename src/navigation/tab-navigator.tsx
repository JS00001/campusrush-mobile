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
  AdminStack,
  HomeStack,
  MessagesStack,
  PNMsStack,
  EventsStack,
} from "@/navigation/stack-navigator";

import tw from "@/lib/tailwind";
import { useAuth } from "@/providers/Auth";
import { useBottomSheets } from "@/providers/BottomSheetv1";
import useConversationsStore from "@/statev1/messaging/conversations";

export const Tab = createBottomTabNavigator();

/**
 * Tab Navigator for the App
 *
 * This is the main tab navigator for the app
 * and contains five independent stack navigators
 */
export const TabNavigator = () => {
  const { chapter } = useAuth();
  const { openBottomSheet } = useBottomSheets();

  const hasUnreadConversation = useConversationsStore(
    (s) => s.conversations.filter((c) => !c.read).length > 0,
  );

  const onAddTabPress = () => {
    openBottomSheet("ADD_PNM");
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 90,
        },
        tabBarItemStyle: {
          margin: 5,
        },

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
      />
      <Tab.Screen
        name="PNMsTab"
        component={PNMsStack}
        options={{
          tabBarLabel: "PNMs",
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <Icon
                name="ri-contacts-book-2-fill"
                size={26}
                color={color}
              />
            ) : (
              <Icon
                name="ri-contacts-book-2-line"
                size={26}
                color={color}
              />
            ),
        }}
      />
      <Tab.Screen
        name="AddTab"
        component={HomeStack}
        listeners={() => ({
          tabPress: (e) => {
            e.preventDefault();
            onAddTabPress();
          },
        })}
        options={{
          tabBarLabel: "Add",
          tabBarIcon: ({ color, focused }) => (
            <Icon
              name="ri-add-line"
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
          tabBarBadge: hasUnreadConversation ? "" : undefined,
          tabBarBadgeStyle: {
            top: 4,
            minWidth: 10,
            maxHeight: 10,
            borderRadius: 5,
            fontSize: 10,
            lineHeight: 13,
            alignSelf: undefined,
          },
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
      />
      <Tab.Screen
        name="EventsTab"
        component={EventsStack}
        options={{
          tabBarLabel: "Events",
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <Icon
                name="ri-calendar-2-fill"
                size={26}
                color={color}
              />
            ) : (
              <Icon
                name="ri-calendar-2-line"
                size={26}
                color={color}
              />
            ),
        }}
      />

      {chapter.role == "admin" && (
        <Tab.Screen
          name="AdminTab"
          component={AdminStack}
          options={{
            tabBarLabel: "Admin",
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <Icon
                  name="ri-admin-fill"
                  size={26}
                  color={color}
                />
              ) : (
                <Icon
                  name="ri-admin-line"
                  size={26}
                  color={color}
                />
              ),
          }}
        />
      )}
    </Tab.Navigator>
  );
};
