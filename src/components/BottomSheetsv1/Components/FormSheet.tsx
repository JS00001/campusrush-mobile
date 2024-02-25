/*
 * Created on Sun Dec 24 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import React, { useMemo } from "react";
import { BottomSheetModal, BottomSheetModalProps } from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

import tw from "@/lib/tailwind";

interface FormSheetProps extends BottomSheetModalProps {
  innerRef?: React.Ref<BottomSheetModalMethods>;
  handleCloseModalPress?: () => void;
}

const FormSheet: React.FC<FormSheetProps> = ({
  handleCloseModalPress,
  children,
  ...props
}) => {
  const snapPoints = useMemo(() => ["100%"], []);

  return (
    <BottomSheetModal
      backgroundComponent={null}
      handleComponent={null}
      ref={props.innerRef}
      snapPoints={snapPoints}
      enablePanDownToClose={false}
      {...props}
    >
      {children}
    </BottomSheetModal>
  );
};

export default FormSheet;
