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

import Icon from "@/ui/Icon";
import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import { alert } from "@/lib/util";
import AppConstants from "@/constants";
import { useAuth } from "@/providers/Auth";
import SafeAreaView from "@/ui/SafeAreaView";
import { useSidebarStore } from "@/store/overlay/SidebarStore";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const navigation = useNavigation();
  const { chapter, mutations, logoutUser } = useAuth();
  const { screen, opened, setScreen, closeSidebar, openSidebar } =
    useSidebarStore();

  /**
   * Close the sidebar and navigate to the specified screen
   */
  const handleNavigate = (screen: keyof MoreTabParams) => {
    setScreen(screen);
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
        {
          style: "cancel",
          text: "No, Cancel",
        },
        {
          style: "destructive",
          text: "Yes, Sign Out",
          onPress: async () => {
            await logoutUser();
            closeSidebar();
          },
        },
      ],
    });
  };

  const SidebarSections = [
    {
      label: "Features",
      items: [
        {
          icon: "calendar-2-line",
          label: "Events",
          screen: "Events",
        },
        {
          newFeature: true,
          icon: "file-list-2-line",
          label: "Forms",
          screen: "Forms",
        },
        {
          icon: "admin-line",
          label: "Admin",
          screen: "Admin",
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
        },
        {
          icon: "shield-check-line",
          label: "Security and Privacy",
          screen: "Security",
        },
        {
          icon: "logout-box-r-line",
          label: "Logout",
          onPress: handleLogout,
          loading: mutations.logoutMutation.isLoading || false,
        },
      ],
    },
  ];

  return (
    <Drawer
      open={opened}
      drawerType="front"
      swipeEdgeWidth={64}
      swipeEnabled={opened}
      drawerStyle={tw`w-full`}
      children={children}
      onOpen={openSidebar}
      onClose={closeSidebar}
      renderDrawerContent={() => (
        <SafeAreaView style={tw`bg-slate-100 h-full w-full`}>
          <TouchableOpacity onPress={closeSidebar}>
            <Icon
              name="close-fill"
              size={28}
              style={tw`p-4 self-start`}
              color={tw.color("slate-800")}
            />
          </TouchableOpacity>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={tw`gap-8`}>
              <Text
                type="h1"
                style={tw`px-6 text-slate-800 font-bold`}
                numberOfLines={1}
              >
                Hey {chapter.firstName}!
              </Text>

              {SidebarSections.map((section, index) => (
                <View style={tw`gap-y-2`} key={index}>
                  <Text style={tw`uppercase px-8 font-medium`} type="p3">
                    {section.label}
                  </Text>

                  <View>
                    {section.items.map((item, index) => {
                      const onPress = item.onPress
                        ? item.onPress
                        : () => handleNavigate(item.screen);

                      return (
                        <SidebarItem
                          key={index}
                          newFeature={item.newFeature}
                          icon={item.icon}
                          label={item.label}
                          selected={screen === item.screen}
                          loading={item.loading}
                          onPress={onPress}
                        />
                      );
                    })}
                  </View>
                </View>
              ))}

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
