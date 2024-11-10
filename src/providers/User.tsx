/*
 * Created on Sun Oct 27 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { createContext, useContext } from "react";

import type { IChapter } from "@/types";

import { useGetChapter } from "@/hooks/api/auth";

interface IUserContext {
  chapter: IChapter;
}

const UserContext = createContext<IUserContext>({} as IUserContext);

const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isLoading, data } = useGetChapter();
  const chapter = data?.chapter!;

  if (isLoading) return null;

  return (
    <UserContext.Provider value={{ chapter }}>{children}</UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

export default UserProvider;
