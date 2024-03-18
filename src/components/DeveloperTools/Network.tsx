/*
 * Created on Mon Mar 18 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import NetworkLogger from "react-native-network-logger";

const Network = () => {
  return (
    <NetworkLogger
      theme={{
        colors: {
          background: "white",
        },
      }}
    />
  );
};

export default Network;
