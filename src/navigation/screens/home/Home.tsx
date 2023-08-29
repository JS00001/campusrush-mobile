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

import tw from "@/lib/tailwind";
import { useAuth } from "@/providers/Auth";
import ActionCard from "@/ui/ActionCard";
import Layout from "@/ui/Layout";
import Text from "@/ui/Text";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View } from "react-native";

interface HomeProps {
  navigation: NativeStackNavigationProp<any>;
}

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const { organization } = useAuth();

  const onAddPNM = () => {
    navigation.navigate("Add");
  };

  return (
    <Layout contentContainerStyle={tw`items-start`}>
      <Text variant="header" numberOfLines={1}>
        Welcome {organization.firstName}
      </Text>

      {/* Organization Statistics */}
      <Text variant="title">Organization Statistics</Text>
      <View style={tw`w-full flex-row gap-5`}>
        <ActionCard
          pressable={false}
          title="120"
          subtitle="Current PNMs registered to rush"
          icon="ri-user-fill"
          size="md"
        />

        <ActionCard
          pressable={false}
          title="123"
          subtitle="PNMs expected to receive bids"
          icon="ri-user-star-fill"
          size="md"
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
    </Layout>
  );
};

export default Home;
