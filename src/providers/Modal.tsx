/*
 * Created on Sat Feb 24 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { useModalStore } from "@/store";

const Modals: React.FC = () => {
  const modals = useModalStore((state) => state.modals);
  const closeModal = useModalStore((state) => state.closeModal);

  return (
    <>
      {Object.keys(modals).map((key: any) => {
        const modal = modals[key];

        const props = {
          key,
          ...modal.props,
          open: modal.open,
          close: () => closeModal(key),
        };

        const ComponentToRender = modal.component as any;

        if (!ComponentToRender) {
          return null;
        }

        return <ComponentToRender {...props} />;
      })}
    </>
  );
};

export default Modals;
