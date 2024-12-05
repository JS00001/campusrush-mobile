/*
 * Created on Fri Mar 15 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import React, { useMemo } from "react";
import { BottomSheetModal, BottomSheetModalProps } from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

interface FormSheetProps extends BottomSheetModalProps {
  innerRef?: React.Ref<BottomSheetModalMethods>;
  closeModalPress?: () => void;
}

const FormSheet: React.FC<FormSheetProps> = ({
  children,
  closeModalPress,
  ...props
}) => {
  const snapPoints = useMemo(() => ["100%"], []);

  return (
    <BottomSheetModal
      ref={props.innerRef}
      snapPoints={snapPoints}
      handleComponent={null}
      backgroundComponent={null}
      enablePanDownToClose={false}
      {...props}
    >
      {children}
    </BottomSheetModal>
  );
};

export default FormSheet;
