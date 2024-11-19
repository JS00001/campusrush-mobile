/*
 * Created on Sun Aug 11 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { useNavigation } from "@react-navigation/native";

import ListItem from "@/ui/ListItems/ListItem";

const SecurityView = () => {
  const navigation = useNavigation();

  const onChangePasswordPress = () => {
    navigation.navigate("Main", {
      screen: "MoreTab",
      params: {
        screen: "ChangePassword",
      },
    });
  };

  return (
    <ListItem
      size="lg"
      icon="LockFill"
      title="Change Password"
      subtitle="Update your current password"
      onPress={onChangePasswordPress}
    />
  );
};

export default SecurityView;
