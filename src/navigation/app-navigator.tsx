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
import Sidebar from "@/components/Sidebar";
import { useBottomSheetStore } from "@/store";
import { useGetNotifications } from "@/hooks/api/chapter";
import { useSidebarStore } from "@/store/overlay/sidebar-store";
import { useGetConversations } from "@/hooks/api/conversations";
import NotificationsProvider from "@/providers/PushNotifications";

/**
 * Tab Navigator for the App
 *
 * This is the main tab navigator for the app
 * and contains five independent stack navigators
 */
const MainNavigator = () => {
  const Tab = createBottomTabNavigator<MainStackParams>();

  const sidebar = useSidebarStore();
  const bottomSheetStore = useBottomSheetStore();

  const conversationsQuery = useGetConversations();
  const notificationsQuery = useGetNotifications();

  const notificationsCount = notificationsQuery.data.count;
  const unreadConverstions = conversationsQuery.unreadCount;

  const onAddTabPress = () => {
    bottomSheetStore.open("CREATE_PNM");
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
        tabBarLabelStyle: {
          fontWeight: "600",
        },
        headerShown: false,
        tabBarActiveTintColor: tw.color("primary"),
        tabBarInactiveTintColor: tw.color("gray-400"),
      }}
      screenListeners={() => ({
        focus: (e) => {
          if (!sidebar.currentScreen) return;
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
              focusedIcon="HouseSimpleFill"
              unfocusedIcon="HouseSimple"
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
              focusedIcon="UserListFill"
              unfocusedIcon="UserList"
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
            <Icon icon="Plus" size={26} color={color} />
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
              focusedIcon="ChatCircleFill"
              unfocusedIcon="ChatCircle"
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
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              color={color}
              focused={focused}
              focusedIcon="ListFill"
              unfocusedIcon="List"
              badgeCount={notificationsCount}
            />
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

  return (
    <NotificationsProvider>
      <Sidebar>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Main" component={MainNavigator} />
          <Stack.Screen name="Conversation" component={ChatNavigator} />
        </Stack.Navigator>
      </Sidebar>
    </NotificationsProvider>
  );
};
