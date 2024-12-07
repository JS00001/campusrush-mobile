/*
 * Created on Wed Sep 04 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { Drawer } from "react-native-drawer-layout";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, TouchableOpacity, View } from "react-native";

import type { MoreTabParams } from "@/navigation/@types";

import SidebarItem from "./SidebarItem";
import type { ISidebar } from "./@types";

import Icon from "@/ui/Icon";
import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import { alert } from "@/lib/util";
import AppConstants from "@/constants";
import { useUser } from "@/providers/User";
import SafeAreaView from "@/ui/SafeAreaView";
import { useLogout } from "@/hooks/api/auth";
import { useGetNotifications } from "@/hooks/api/chapter";
import { useSidebarStore } from "@/store/overlay/sidebar-store";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const { user } = useUser();
  const navigation = useNavigation();
  const sidebarStore = useSidebarStore();

  const logoutMutation = useLogout();
  const notificationQuery = useGetNotifications();

  // TODO: Maybe create a standalone error state
  // Error and Loading States: Put this in the component itself, we need to render children
  if (notificationQuery.isLoading) return children;
  if (notificationQuery.isError) return children;

  const notificationCount = notificationQuery.data.count;

  /**
   * Close the sidebar and navigate to the specified screen
   */
  const handleNavigate = (screen: keyof MoreTabParams) => {
    sidebarStore.setCurrentScreen(screen);
    navigation.navigate("Main", {
      screen: "MoreTab",
      params: {
        screen,
      },
    });
  };

  /**
   * Handle the logout action
   */
  const handleLogout = async () => {
    alert({
      title: "Are you sure?",
      message:
        "You will be signed out of your account, and will need to sign back in.",
      buttons: [
        { style: "cancel", text: "No, Cancel" },
        {
          style: "destructive",
          text: "Yes, Sign Out",
          onPress: async () => {
            await logoutMutation.mutateAsync();
            sidebarStore.closeSidebar();
          },
        },
      ],
    });
  };

  const SidebarSections: ISidebar = [
    {
      label: "Essentials",
      items: [
        {
          icon: "Calendar",
          label: "Events",
          screen: "Events",
          newFeature: false,
        },
        {
          icon: "ListBullets",
          label: "Forms",
          screen: "Forms",
          newFeature: false,
        },
        {
          icon: "Bell",
          label: "Notifications",
          screen: "Notifications",
          newFeature: false,
          badgeCount: notificationCount,
        },
      ],
    },
    {
      label: "Settings",
      items: [
        {
          icon: "Gear",
          label: "Settings",
          screen: "Settings",
          newFeature: false,
        },
        {
          icon: "ShieldCheck",
          label: "Security and Privacy",
          screen: "Security",
          newFeature: false,
        },
        {
          icon: "SignOut",
          label: "Logout",
          loading: logoutMutation.isPending,
          onPress: handleLogout,
          newFeature: false,
        },
      ],
    },
    {
      label: "Admin",
      hidden: user.systemRole !== "admin",
      items: [
        {
          icon: "UsersThree",
          label: "Chapters",
          screen: "AdminChapters",
          newFeature: false,
        },
        {
          icon: "Warning",
          label: "Violations",
          screen: "AdminViolations",
          newFeature: false,
        },
        {
          icon: "Globe",
          label: "Websocket",
          screen: "AdminWebsocket",
          newFeature: false,
        },
        {
          icon: "TestTube",
          label: "UI Testing",
          screen: "AdminUITesting",
          newFeature: false,
        },
        {
          icon: "WifiHigh",
          label: "Network",
          screen: "AdminNetwork",
          newFeature: false,
        },
      ],
    },
  ];

  return (
    <Drawer
      drawerType="front"
      swipeEdgeWidth={64}
      open={sidebarStore.isOpened}
      swipeEnabled={sidebarStore.isOpened}
      drawerStyle={tw`w-full`}
      children={children}
      onOpen={sidebarStore.openSidebar}
      onClose={sidebarStore.closeSidebar}
      renderDrawerContent={() => (
        <SafeAreaView position="top" style={tw`bg-gray-100 h-full w-full`}>
          <TouchableOpacity onPress={sidebarStore.closeSidebar}>
            <Icon
              icon="X"
              size={28}
              style={tw`p-4 self-start`}
              color={tw.color("gray-800")}
            />
          </TouchableOpacity>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={tw`pb-8`}
          >
            <View style={tw`gap-8`}>
              <Text
                type="h1"
                style={tw`px-6 text-gray-800 font-bold`}
                numberOfLines={1}
              >
                Hey {user.firstName}!
              </Text>

              {SidebarSections.map((section, index) => {
                if (!section.hidden)
                  return (
                    <View style={tw`gap-y-2`} key={index}>
                      <Text style={tw`uppercase px-8 font-medium`} type="p3">
                        {section.label}
                      </Text>

                      <View>
                        {section.items.map((item, index) => {
                          if (item.hidden) return null;

                          const onPress = () => {
                            if (item.onPress) {
                              item.onPress();
                            } else if (item.screen) {
                              handleNavigate(item.screen);
                            }
                          };

                          const selected =
                            sidebarStore.currentScreen === item.screen;

                          return (
                            <SidebarItem
                              key={index}
                              icon={item.icon}
                              label={item.label}
                              selected={selected}
                              loading={item.loading}
                              newFeature={item.newFeature}
                              badgeCount={item.badgeCount}
                              onPress={onPress}
                            />
                          );
                        })}
                      </View>
                    </View>
                  );

                return null;
              })}

              <Text type="p4" style={tw`text-center text-gray-400`}>
                Version {AppConstants.version}
              </Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    />
  );
};

export default Sidebar;
