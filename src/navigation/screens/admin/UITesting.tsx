/*
 * Created on Sun Sep 17 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { Layout } from "@/ui/Layout";
import TagView from "@/components/TagView";
import type { AdminStackProps } from "@/navigation/@types";

type Props = AdminStackProps<"AdminUITesting">;

const UITestingScreen: React.FC<Props> = ({}) => {
  return (
    <Layout.Root>
      <Layout.Content scrollable>
        <TagView
          disabled
          onPress={() => {
            console.log("TagView Pressed");
          }}
          tags={["tag1", "tag2", "tag3", "Sports", "Testing"]}
        />
      </Layout.Content>
    </Layout.Root>
  );
};

export default UITestingScreen;
