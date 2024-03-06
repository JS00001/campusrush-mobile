/*
 * Created on Fri Feb 23 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { useQuery } from "@tanstack/react-query";

import { useAuth } from "@/providers/Authv1";
import { getAdminChapter, getAdminChapters } from "@/api";
import { useEffect, useState } from "react";

export const useGetAdminChapters = () => {
  const { accessToken } = useAuth();
  const [chapters, setChapters] = useState<Chapter[]>([]);

  const query = useQuery(["adminChapters", accessToken], {
    queryFn: async () => {
      return getAdminChapters();
    },
  });

  useEffect(() => {
    if (!query.data || "error" in query.data) return;

    setChapters(query.data.data.chapters);
  }, [query.data]);

  return {
    ...query,
    chapters,
  };
};

export const useGetAdminChapter = (id: string) => {
  const { accessToken } = useAuth();
  const [chapter, setChapter] = useState<Chapter | null>(null);

  const query = useQuery(["adminChapter", accessToken, id], {
    queryFn: async () => {
      return getAdminChapter({ id });
    },
  });

  useEffect(() => {
    if (!query.data || "error" in query.data) return;

    setChapter(query.data.data.chapter);
  }, [query.data]);

  return {
    ...query,
    chapter,
  };
};
