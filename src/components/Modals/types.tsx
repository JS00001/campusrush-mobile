/*
 * Created on Tue Oct 24, 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

export interface ModalProps {
  /**
   * Whether or not the modal is open
   */
  open: boolean;
  /**
   * Function to close the modal
   */
  close: () => void;
  /**
   * The message to display in the modal
   */
  message?: string;
  /**
   * The primary button text (colored button on the right)
   */
  primaryButtonText?: string;
  /**
   * The function to run when the primary button is pressed
   */
  primaryButtonAction?: () => void;
  /**
   * The secondary button text (Gray button on the left)
   */
  secondaryButtonText?: string;
  /**
   * The function to run when the secondary button is pressed
   */
  secondaryButtonAction?: () => void;
}
