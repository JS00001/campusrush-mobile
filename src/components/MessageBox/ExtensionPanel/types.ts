/*
 * Created on Mon Dec 25 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

interface ExtensionPanelRef {
  animateContainer: (toValue: number, cb?: () => void) => void;
}

interface ExtensionPanelProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}
