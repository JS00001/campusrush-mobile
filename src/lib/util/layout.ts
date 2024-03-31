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

import tw from '@/lib/tailwind';

/**
 * Applies properties to hide content from view and interaction.
 *
 * Use like so:
 * <View {...hiddenContent(booleanVariable)} />
 */
export const hiddenContent = (bool: boolean) => {
  const styles = bool ? tw`opacity-100` : tw`opacity-0 h-0 w-0`;
  const events = bool ? 'auto' : ('none' as any);

  return { style: styles, pointerEvents: events };
};
