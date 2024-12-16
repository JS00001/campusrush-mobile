/*
 * Created on Sun Dec 15 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { ChapterRole } from "@/@types";
import { useUser } from "@/providers/User";

interface RoleGuardProps {
  role: ChapterRole;
  children: React.ReactNode;
}

const RoleGuard: React.FC<RoleGuardProps> = ({ role, children }) => {
  const { hasPermission } = useUser();

  if (!hasPermission(role)) {
    return null;
  }

  return children;
};

export default RoleGuard;
