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

import { createContext, useContext, useRef } from "react";

import type { IChapter } from "@/types";

import { useGetChapter } from "@/hooks/api/auth";

interface IUserContext {
  chapter: IChapter;
}

const UserContext = createContext<IUserContext>({} as IUserContext);

const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const initialized = useRef(false);
  const { isPending, data } = useGetChapter();

  // Mark chapter as defined, and make sure we only use it in the main app
  const chapter = data?.chapter!;

  /**
   * On the first app load, we want to fetch this query if needed (if the user is loggedin)
   * then, we dont want to fetch it again (we set it on login and register)
   * so we keep track of it already being initialized
   */
  if (isPending && !initialized.current) {
    initialized.current = true;
    return null;
  }

  return (
    <UserContext.Provider value={{ chapter }}>{children}</UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

export default UserProvider;
