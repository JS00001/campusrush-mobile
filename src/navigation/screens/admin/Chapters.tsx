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

import Layout from "@/ui/Layout";
import { useGetAdminChapters } from "@/hooks/api/admin";
import AdminChapterList from "@/components/AdminChapterList";

const Chapters = () => {
  const { data, refetch, isLoading } = useGetAdminChapters();

  const chapters = (() => {
    if (data && "error" in data) {
      return [];
    }

    return data?.data.chapters ?? [];
  })();

  const onRefresh = async () => {
    await refetch();
  };

  return (
    <Layout gap={12}>
      <Layout.Header
        hasBackButton
        title="Chapters"
        subtitle="View all registered chapters"
      />

      <AdminChapterList
        loading={isLoading}
        chapters={chapters}
        refetchChapters={onRefresh}
      />
    </Layout>
  );
};

export default Chapters;
