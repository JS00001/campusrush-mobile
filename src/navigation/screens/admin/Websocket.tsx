/*
 * Created on Mon Aug 26 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { Layout } from "@/ui/Layout";
import WebsocketView from "@/views/admin/Websocket";

const Websocket = () => {
  return (
    <Layout.Root>
      <Layout.Header
        hasBackButton
        title="Websocket"
        subtitle="View websocket message logs"
      />

      <Layout.Content scrollable gap={12}>
        <WebsocketView />
      </Layout.Content>
    </Layout.Root>
  );
};

export default Websocket;
