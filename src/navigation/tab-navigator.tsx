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

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import {
  AdminStack,
  HomeStack,
  MessagesStack,
  PNMsStack,
  EventsStack,
} from "@/navigation/stack-navigator";

import Icon from "@/ui/Icon";
import tw from "@/lib/tailwind";
import { useAuth } from "@/providers/Auth";
import { useConversationStore } from "@/store";
import { useBottomSheets } from "@/providers/BottomSheet";

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
  const conversationStore = useConversationStore();

  const hasUnreadConversation =
    conversationStore.conversations.filter((c) => !c.read).length > 0;

  const onAddTabPress = () => {
    openBottomSheet("CREATE_PNM");
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
                name="home-fill"
                size={26}
                color={color}
              />
            ) : (
              <Icon
                name="home-line"
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
                name="contacts-book-2-fill"
                size={26}
                color={color}
              />
            ) : (
              <Icon
                name="contacts-book-2-line"
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
              name="add-line"
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
                name="chat-1-fill"
                size={26}
                color={color}
              />
            ) : (
              <Icon
                name="chat-1-line"
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
                name="calendar-2-fill"
                size={26}
                color={color}
              />
            ) : (
              <Icon
                name="calendar-2-line"
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
                  name="admin-fill"
                  size={26}
                  color={color}
                />
              ) : (
                <Icon
                  name="admin-line"
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
