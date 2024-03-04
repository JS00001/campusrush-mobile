/*
 * Created on Tue Nov 07 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */
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
import Layout from "@/ui_v1/Layout";
import LinkSharingView from "@/views/settings/LinkSharing";

const LinkSharingScreen = () => {
  return (
    <Layout gap={16} scrollable contentContainerStyle={tw`items-start pb-4`}>
      <Layout.Header
        hasBackButton
        title="Link Sharing"
        subtitle="Manage your link sharing settings."
      />

      <LinkSharingView />
    </Layout>
  );
};

export default LinkSharingScreen;
