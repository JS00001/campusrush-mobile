/*
 * Created on Tue Oct 24 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import useModalsStore from "@/statev1/modals";

const Modals: React.FC = () => {
  // Get all of the available modals from the store
  const modals = useModalsStore((state) => state.modals);
  // The method to close a modal, pass a name to close a specific modal
  const closeModal = useModalsStore((state) => state.closeModal);

  return (
    <>
      {Object.keys(modals).map((key: any) => {
        // Get the modal from the store
        const modal = modals[key];

        // Create the necessary props to pass to the modal
        const props = {
          key,
          open: modal.open,
          close: () => closeModal(key),
          ...modal.props,
        };

        // Get the modal's component and prepare to render it
        const ComponentToRender = modal.component as any;

        // If the modal doesn't exist, don't render anything
        if (!ComponentToRender) {
          return null;
        }

        // Render the modal with the props
        return <ComponentToRender {...props} />;
      })}
    </>
  );
};

export default Modals;
