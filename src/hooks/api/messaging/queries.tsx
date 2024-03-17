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

import { useEffect, useState } from "react";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";

import { useAuth } from "@/providers/Auth";
import { useContactStore, useConversationStore } from "@/store";
import { getContacts, getConversation, getConversations } from "@/api";

export const useGetContacts = () => {
  const { accessToken } = useAuth();
  const contactStore = useContactStore();
  const [isLoading, setIsLoading] = useState(true);

  const query = useQuery(["contacts", accessToken], {
    queryFn: () => {
      return getContacts();
    },
  });

  useEffect(() => {
    if (!query.data || "error" in query.data) {
      setIsLoading(query.isLoading);
      return;
    }

    contactStore.setContacts("all", query.data.data.all);
    contactStore.setContacts("suggested", query.data.data.suggested);
    contactStore.setContacts("starred", query.data.data.favorited);
    contactStore.setContacts("uncontacted", query.data.data.uncontacted);

    setIsLoading(query.isLoading);
  }, [query.data]);

  return {
    ...query,
    all: contactStore.all,
    suggested: contactStore.suggested,
    starred: contactStore.starred,
    uncontacted: contactStore.uncontacted,
    isLoading: isLoading && !contactStore.all.length,
  };
};

export const useGetConversation = (pnmId: string) => {
  const { accessToken } = useAuth();

  return useInfiniteQuery({
    queryKey: ["conversation", accessToken, pnmId],
    queryFn: ({ pageParam = 0 }) => {
      return getConversation({ offset: pageParam, pnmId });
    },
    getNextPageParam: (lastPage) => {
      if ("error" in lastPage) return undefined;

      const hasNextPage = lastPage.data.hasNextPage;

      if (!hasNextPage) return undefined;

      return lastPage.data.nextOffset;
    },
  });
};

export const useGetConversations = () => {
  const { accessToken } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  const conversations = useConversationStore((s) => s.conversations);
  const setConversations = useConversationStore((s) => s.setConversations);

  const query = useInfiniteQuery(["conversations", accessToken], {
    queryFn: ({ pageParam = 0 }) => {
      return getConversations({ offset: pageParam });
    },
    getNextPageParam: (lastPage) => {
      if ("error" in lastPage) return undefined;

      const hasNextPage = lastPage.data.hasNextPage;

      if (!hasNextPage) return undefined;

      return lastPage.data.nextOffset;
    },
  });

  useEffect(() => {
    if (!query.data) {
      setIsLoading(query.isLoading);
      return;
    }

    const combinedConversations = query.data.pages.flatMap((page) => {
      if ("error" in page) return [];

      return page.data.conversations;
    });

    setConversations(combinedConversations);
    setIsLoading(query.isLoading);
  }, [query.data]);

  return {
    ...query,
    conversations,
    isLoading: isLoading && !conversations.length,
  };
};
