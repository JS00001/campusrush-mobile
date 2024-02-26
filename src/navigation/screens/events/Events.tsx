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

import Layout from "@/ui/Layout";
import EventsView from "@/views/Events";

const EventsScreen = () => {
  return (
    <Layout gap={8}>
      <Layout.Header
        beta
        title="Events"
        subtitle="Manage and share your events"
      />

      <EventsView />
    </Layout>
  );
};

export default EventsScreen;
