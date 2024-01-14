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

import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import Layout from "@/ui/Layout";
import useAdmin from "@/hooks/useAdmin";
import AdminChapterList from "@/components/AdminChapterList";

interface ChaptersProps {
  navigation: NativeStackNavigationProp<any>;
}

const Chapters: React.FC<ChaptersProps> = ({ navigation }) => {
  const { chapters, refetchChapters, getChaptersQuery } = useAdmin();

  const onRefresh = async () => {
    await refetchChapters();
  };

  return (
    <Layout gap={12}>
      <Layout.Header
        hasBackButton
        title="Chapters"
        subtitle="View all registered chapters"
      />

      <AdminChapterList
        loading={getChaptersQuery.isLoading}
        chapters={chapters}
        refetchChapters={onRefresh}
      />
    </Layout>
  );
};

export default Chapters;
