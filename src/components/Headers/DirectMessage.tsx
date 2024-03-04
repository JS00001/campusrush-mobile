/*
 * Created on Sun Oct 15 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { useEffect } from "react";

import Header from "@/ui_v1/Header";
import { useGetPnm } from "@/hooks/api/pnms";
import { useBottomSheets } from "@/providers/BottomSheet";
import { useNavigation } from "@react-navigation/native";

interface DirectMessageHeaderProps {
  pnm: PNM;
  loading: boolean;
}

const DirectMessageHeader: React.FC<DirectMessageHeaderProps> = ({
  pnm,
  loading,
}) => {
  const navigation = useNavigation();
  const { openBottomSheet } = useBottomSheets();

  const pnmQuery = useGetPnm(pnm._id);
  const title = `${pnmQuery.pnm?.firstName} ${pnmQuery.pnm?.lastName}`;

  const onMenuButtonPress = () => {
    openBottomSheet("PNM", {
      pnmId: pnm._id,
    });
  };

  // TODO: this could cause going back if there is:
  // - no cache
  // - no pnms fetched yet (havent nagivated to pnms page)
  // - therefore, when we fetch the pnm, it starts loading,but the pnm is undefined
  useEffect(() => {
    if (!pnmQuery.pnm) navigation.goBack();
  }, [pnmQuery.pnm]);

  return (
    <Header
      hasBackButton
      hasMenuButton
      title={title}
      loading={loading}
      onMenuButtonPress={onMenuButtonPress}
    />
  );
};

export default DirectMessageHeader;
