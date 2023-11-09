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

import { View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import Layout from "@/ui/Layout";
import ActionCard from "@/ui/ActionCard";
import { useAuth } from "@/providers/Auth";
import RecentPnms from "@/components/RecentPnms";
import useStatistics from "@/hooks/useStatistics";
import HomeHeaderSvg from "@/assets/HomeHeaderSvg";
import { useBottomSheets } from "@/providers/BottomSheet";

interface HomeScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

const Home: React.FC<HomeScreenProps> = ({ navigation }) => {
  // Load data from the API
  const { organization } = useAuth();
  const { handlePresentModalPress } = useBottomSheets();
  const { numPnms, numStarredPnms, isLoading, recentPnms } = useStatistics();

  // When the user clicks the "New PNM" CTA
  const onAddPNM = () => {
    handlePresentModalPress("ADD_PNM");
  };

  // When the user clicks on a recent PNM
  const onRecentPnmPress = (pnm: PNM) => {
    navigation.navigate("PNMsTab", {
      screen: "PNMDetails",
      initial: false,
      params: {
        pnm,
      },
    });
  };

  return (
    <>
      <HomeHeaderSvg />

      <Layout
        style={tw`bg-transparent`}
        contentContainerStyle={tw`items-start`}
      >
        <Text variant="header" numberOfLines={1} style={tw`text-white`}>
          Welcome {organization.firstName}
        </Text>

        {/* Organization Statistics */}
        <Text variant="title" style={tw`text-white`}>
          Organization Statistics
        </Text>
        <View style={tw`w-full flex-row gap-5`}>
          <ActionCard
            size="md"
            loading={isLoading}
            pressable={false}
            title={numPnms?.toString()}
            subtitle="Current PNMs registered to rush"
            icon="ri-user-fill"
          />

          <ActionCard
            size="md"
            loading={isLoading}
            pressable={false}
            title={numStarredPnms?.toString()}
            subtitle="PNMs saved as favorites"
            icon="ri-user-star-fill"
          />
        </View>

        {/* Quick Links */}
        <Text variant="title">Quick Links</Text>
        <ActionCard
          title="New PNM"
          subtitle="Add a new PNM to the system"
          icon="ri-user-add-fill"
          onPress={onAddPNM}
        />

        {/* Recently Added PNMs */}
        <Text variant="title">Recently Added PNMs</Text>
        <RecentPnms
          pnms={recentPnms}
          loading={isLoading}
          onPress={onRecentPnmPress}
        />
      </Layout>
    </>
  );
};

export default Home;
