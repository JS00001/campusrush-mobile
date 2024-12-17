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

import { ChapterRole, IChapter, IUser } from "@/@types";

import { useGetUser } from "@/hooks/api/user";
import { useQonversion } from "@/providers/external/Qonversion";

interface IUserContext {
  user: IUser;
  chapter: IChapter;
  hasPermission: (role: ChapterRole) => boolean;
}

const UserContext = createContext<IUserContext>({} as IUserContext);

const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const initialized = useRef(false);
  const { entitlements } = useQonversion();
  const { isPending, data } = useGetUser();

  // Mark chapter as defined, and make sure we only use it in the main app
  const chapter = (data?.chapter || {}) as IChapter;
  const user = (data?.user || {}) as IUser;

  chapter.isPro = chapter.isPro || !!entitlements.length;

  /**
   * Check if the user has at least a specific role in the chapter.
   */
  const hasPermission = (role: ChapterRole) => {
    if (!chapter || !user) return false;

    const rolePriority = {
      [ChapterRole.Viewer]: 0,
      [ChapterRole.Editor]: 1,
      [ChapterRole.Admin]: 2,
      [ChapterRole.Owner]: 3,
    };

    const userRolePriority = rolePriority[user.chapterRole];
    const requiredRolePriority = rolePriority[role];

    return userRolePriority >= requiredRolePriority;
  };

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
    <UserContext.Provider value={{ user, chapter, hasPermission }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

export default UserProvider;
