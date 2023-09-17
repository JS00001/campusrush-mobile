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

import { useMutation, useQuery } from "@tanstack/react-query";

import adminApi from "@/api/api/admin";
import { useAuth } from "@/providers/Auth";

const useAdmin = () => {
  const { organization, updateOrganization, accessToken } = useAuth();

  const getStatisticsQuery = useQuery({
    queryKey: ["getAdminStatistics", accessToken],
    queryFn: () => {
      return adminApi.getStatistics();
    },
  });

  const getOrganizationsQuery = useQuery({
    queryKey: ["getAdminOrganizations", accessToken],
    queryFn: () => {
      return adminApi.getOrganizations();
    },
  });

  const upgradeOrganizationMutation = useMutation({
    mutationFn: (input: UpgradeOrganizationInput) => {
      return adminApi.upgradeOrganization(input);
    },
  });

  const downgradeOrganizationMutation = useMutation({
    mutationFn: (input: DowngradeOrganizationInput) => {
      return adminApi.downgradeOrganization(input);
    },
  });

  /**
   * Give an organization a basic subscription (lifetime)
   * If no id is provided, the current organization is used (admin only)
   */
  const forceBasicSubscription = async (id?: string) => {
    const response = await upgradeOrganizationMutation.mutateAsync({
      id: id || organization?._id,
      entitlements: ["basic"],
    });

    const updatedOrganization = response.data?.data.organization;

    if (updatedOrganization) {
      updateOrganization(updatedOrganization);
    }
  };

  /**
   * Give an organization a pro subscription (monthly)
   * If no id is provided, the current organization is used (admin only)
   */
  const forceProSubscription = async (id?: string) => {
    const response = await upgradeOrganizationMutation.mutateAsync({
      id: id || organization?._id,
      entitlements: ["pro"],
    });

    const updatedOrganization = response.data?.data.organization;

    if (updatedOrganization) {
      updateOrganization(updatedOrganization);
    }
  };

  /**
   * Give an organization a pro subscription (monthly)
   * If no id is provided, the current organization is used (admin only)
   */
  const clearSubscription = async (id?: string) => {
    const response = await downgradeOrganizationMutation.mutateAsync({
      id: id || organization?._id,
    });

    const updatedOrganization = response.data?.data.organization;

    if (updatedOrganization) {
      updateOrganization(updatedOrganization);
    }
  };

  return {
    getStatisticsQuery,
    getOrganizationsQuery,
    upgradeOrganizationMutation,
    downgradeOrganizationMutation,
    forceBasicSubscription,
    forceProSubscription,
    clearSubscription,
  };
};

export default useAdmin;
