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

import tw from "@/lib/tailwind";
import { Layout } from "@/ui/Layout";
import EventsView from "@/views/Events";

const EventsScreen = () => {
  return (
    <Layout.Root>
      <Layout.Header title="Events" subtitle="Manage and share your events" />

      <Layout.Content gap={8} contentContainerStyle={tw`pb-0`}>
        <EventsView />
      </Layout.Content>
    </Layout.Root>
  );
};

export default EventsScreen;
