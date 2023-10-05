/*
 * Created on Wed Oct 4 2023
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

import Layout from "@/ui/Layout";
import { useState } from "react";

interface NewMessageProps {
  navigation: NativeStackNavigationProp<any>;
  route: any;
}

const NewMessage: React.FC<NewMessageProps> = ({ navigation, route }) => {
  // Create a state variable to hold the pnms from the route params
  const [pnms, setPnms] = useState<PNM[]>(route.params.pnms);

  const onPnmRemove = (pnm: PNM) => {
    // Remove the pnm from the state variable
    setPnms((prevPnms) =>
      prevPnms.filter((prevPnm) => prevPnm._id !== pnm._id),
    );
  };

  return (
    <>
      <Layout scrollable gap={8}>
        <Layout.ChatHeader pnms={pnms} onPnmRemove={onPnmRemove} />
      </Layout>
    </>
  );
};

export default NewMessage;
