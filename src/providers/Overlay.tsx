/*
 * Created on Sun Sep 01 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import Toast from "react-native-toast-message";

import toastConfig from "@/lib/toast";
import Sidebar from "@/components/Sidebar";
import StatusOverlay from "@/components/Overlays/Status";
import ImageZoomOverlay from "@/components/Overlays/ImageZoom";

const OverlayProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <>
      <Sidebar>
        {children}
        <Toast config={toastConfig} />
        <StatusOverlay />
        <ImageZoomOverlay />
      </Sidebar>
    </>
  );
};

export default OverlayProvider;
