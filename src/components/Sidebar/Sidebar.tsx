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
import { useAuth } from "@/providers/Auth";
import SafeAreaView from "@/ui/SafeAreaView";
import { useNotificationStore } from "@/store";
import { useSidebarStore } from "@/store/overlay/sidebar-store";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const navigation = useNavigation();
  const sidebarStore = useSidebarStore();
  const notificationStore = useNotificationStore();
  const { chapter, mutations, logoutUser } = useAuth();

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
            await logoutUser();
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
          icon: "calendar-2-line",
          label: "Events",
          screen: "Events",
          newFeature: false,
        },
        {
          icon: "notification-2-line",
          label: "Notifications",
          screen: "Notifications",
          newFeature: false,
          badgeCount: notificationStore.count,
        },
      ],
    },
    {
      label: "Settings",
      items: [
        {
          icon: "settings-3-line",
          label: "Settings",
          screen: "Settings",
          newFeature: false,
        },
        {
          icon: "shield-check-line",
          label: "Security and Privacy",
          screen: "Security",
          newFeature: false,
        },
        {
          icon: "logout-box-r-line",
          label: "Logout",
          loading: mutations.logoutMutation.isLoading || false,
          onPress: handleLogout,
          newFeature: false,
        },
      ],
    },
    {
      label: "Admin",
      hidden: chapter.role !== "admin",
      items: [
        {
          icon: "group-line",
          label: "Chapters",
          screen: "AdminChapters",
          newFeature: false,
        },
        {
          icon: "bar-chart-line",
          label: "Statistics",
          screen: "AdminStatistics",
          newFeature: false,
        },
        {
          icon: "error-warning-line",
          label: "Violations",
          screen: "AdminViolations",
          newFeature: false,
        },
        {
          icon: "global-line",
          label: "Websocket",
          screen: "AdminWebsocket",
          newFeature: false,
        },
        {
          icon: "test-tube-line",
          label: "UI Testing",
          screen: "AdminUITesting",
          newFeature: false,
        },
        {
          icon: "wifi-line",
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
        <SafeAreaView style={tw`bg-slate-100 h-full w-full`}>
          <TouchableOpacity onPress={sidebarStore.closeSidebar}>
            <Icon
              name="close-fill"
              size={28}
              style={tw`p-4 self-start`}
              color={tw.color("slate-800")}
            />
          </TouchableOpacity>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={tw`pb-8`}
          >
            <View style={tw`gap-8`}>
              <Text
                type="h1"
                style={tw`px-6 text-slate-800 font-bold`}
                numberOfLines={1}
              >
                Hey {chapter.firstName}!
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

              <Text type="p4" style={tw`text-center text-slate-400`}>
                Version {AppConstants.version} - {AppConstants.updateVersion}
              </Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    />
  );
};

export default Sidebar;
