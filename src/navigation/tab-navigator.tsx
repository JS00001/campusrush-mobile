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
import TabBarIcon from "@/ui/TabBarIcon";
import { useAuth } from "@/providers/Auth";
import { useConversationStore } from "@/store";
import { useBottomSheet } from "@/providers/BottomSheet";
import { useGetConversations } from "@/hooks/api/messaging";
import NotificationsProvider from "@/providers/Notifications";

export const Tab = createBottomTabNavigator();

/**
 * Tab Navigator for the App
 *
 * This is the main tab navigator for the app
 * and contains five independent stack navigators
 */
export const TabNavigator = () => {
  // TODO: make this better, incorporate into store
  useGetConversations();

  const { chapter } = useAuth();
  const { openBottomSheet } = useBottomSheet();
  const conversationStore = useConversationStore();

  const unreadConverstions = conversationStore.conversations.filter(
    (c) => !c.read,
  ).length;

  const onAddTabPress = () => {
    openBottomSheet("CREATE_PNM");
  };

  return (
    <NotificationsProvider>
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
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                color={color}
                focused={focused}
                focusedIcon="home-fill"
                unfocusedIcon="home-line"
              />
            ),
          }}
        />
        <Tab.Screen
          name="PNMsTab"
          component={PNMsStack}
          options={{
            tabBarLabel: "PNMs",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                color={color}
                focused={focused}
                focusedIcon="contacts-book-2-fill"
                unfocusedIcon="contacts-book-2-line"
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
        />
        <Tab.Screen
          name="MessagesTab"
          component={MessagesStack}
          options={{
            tabBarLabel: "Messages",

            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                color={color}
                focused={focused}
                focusedIcon="chat-1-fill"
                unfocusedIcon="chat-1-line"
                badgeCount={unreadConverstions}
              />
            ),
          }}
        />
        <Tab.Screen
          name="EventsTab"
          component={EventsStack}
          options={{
            tabBarLabel: "Events",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                color={color}
                focused={focused}
                focusedIcon="calendar-2-fill"
                unfocusedIcon="calendar-2-line"
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
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon
                  color={color}
                  focused={focused}
                  focusedIcon="admin-fill"
                  unfocusedIcon="admin-line"
                />
              ),
            }}
          />
        )}
      </Tab.Navigator>
    </NotificationsProvider>
  );
};
