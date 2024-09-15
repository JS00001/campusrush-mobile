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
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
  HomeStack,
  MessagesStack,
  MoreStack,
  PNMsStack,
} from "./stack-navigator";

import {
  AppStackParams,
  ConversationStackParams,
  MainStackParams,
} from "./@types";

import Chat from "@/navigation/screens/conversation/Chat";
import Create from "@/navigation/screens/conversation/Create";

import Icon from "@/ui/Icon";
import tw from "@/lib/tailwind";
import TabBarIcon from "@/ui/TabBarIcon";
import { useConversationStore } from "@/store";
import { useBottomSheet } from "@/providers/BottomSheet";
import NotificationsProvider from "@/providers/Notifications";
import { useSidebarStore } from "@/store/overlay/SidebarStore";
import { useGetConversations } from "@/hooks/api/conversations";

/**
 * Tab Navigator for the App
 *
 * This is the main tab navigator for the app
 * and contains five independent stack navigators
 */
const MainNavigator = () => {
  const Tab = createBottomTabNavigator<MainStackParams>();

  const sidebar = useSidebarStore();
  const { openBottomSheet } = useBottomSheet();
  const conversationStore = useConversationStore();

  const unreadConverstions = conversationStore.conversations.filter(
    (c) => !c.read,
  ).length;

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
      screenListeners={() => ({
        // Listen for change of tab, and clear the sidebar screen if its not the MoreTab
        tabPress: (e) => {
          if (!e.target?.startsWith("MoreTab")) {
            sidebar.setCurrentScreen(null);
          }
        },
      })}
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
          tabBarIcon: ({ color }) => (
            <Icon name="add-line" size={26} color={color} />
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
        name="MoreTab"
        component={MoreStack}
        listeners={() => ({
          tabPress: (e) => {
            e.preventDefault();
            sidebar.openSidebar();
          },
        })}
        options={{
          tabBarLabel: "More",
          tabBarIcon: ({ color }) => (
            <Icon name="menu-3-fill" size={26} color={color} style={tw`mt-2`} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const ChatNavigator = () => {
  const Stack = createNativeStackNavigator<ConversationStackParams>();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="Create" component={Create} />
    </Stack.Navigator>
  );
};

export const AppNavigator = () => {
  const Stack = createNativeStackNavigator<AppStackParams>();

  // TODO: make this better, incorporate into store
  useGetConversations();

  return (
    <NotificationsProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={MainNavigator} />
        <Stack.Screen name="Conversation" component={ChatNavigator} />
      </Stack.Navigator>
    </NotificationsProvider>
  );
};
