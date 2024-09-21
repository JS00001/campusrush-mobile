/*
 * Created on Wed Sep 18 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { useFocusEffect as useRNFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

const useFocusEffect = (callback: () => void, deps: any[]) => {
  useRNFocusEffect(useCallback(callback, deps));
};

export default useFocusEffect;
