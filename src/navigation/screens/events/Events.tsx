/*
 * Created on Wed Dec 20 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import tw from "@/lib/tailwind";
import Layout from "@/ui/Layout";
import ActionButton from "@/ui/ActionButton";
import { useBottomSheets } from "@/providers/BottomSheet";

interface EventsProps {
  navigation: NativeStackNavigationProp<any>;
}

const Events: React.FC<EventsProps> = ({ navigation }) => {
  // Import bottom sheets hook to show the "New Message" modal
  const { handlePresentModalPress } = useBottomSheets();

  // When the new chat action button is pressed, present the new event modal
  const onNewChatPress = () => {};

  return (
    <>
      {/* The floating action button in bottom right */}
      <ActionButton icon="ri-add-line" onPress={onNewChatPress} />

      <Layout gap={8}>
        <Layout.Header title="Events" subtitle="Manage and share your events" />
      </Layout>
    </>
  );
};

export default Events;
