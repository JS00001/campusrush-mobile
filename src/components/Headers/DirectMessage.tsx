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

import { usePnm } from "@/store";
import Header from "@/ui/Header";
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

  const store = usePnm(pnm._id);
  const title = `${store.pnm?.firstName} ${store.pnm?.lastName}`;

  const onMenuButtonPress = () => {
    openBottomSheet("PNM", {
      pnmId: pnm._id,
    });
  };

  useEffect(() => {
    if (!store.pnm) navigation.goBack();
  }, [store.pnm]);

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
