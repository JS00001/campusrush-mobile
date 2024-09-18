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

import type { IPNM } from '@/types';

import { useEventStore } from './EventStore';
import { usePnmStore } from './PNMStore';
import { useStatisticsStore } from './StatisticsStore';

import { useContactStore } from './messaging/ContactStore';
import { useConversationStore } from './messaging/ConversationStore';
import { useMessageStore } from './messaging/MessageStore';
import { useAdminStatisticsStore } from './admin/StatisticsStore';
import { useNotificationStore } from './NotificationStore';

/**
 * The global store helps to manipulate state that
 * involves multiple stores. Methods in here are NOT api calls,
 * so they should not be used as such, they are just helper methods to
 * keep the state consistent across multiple stores.
 */
export const useGlobalStore = () => {
  const pnmStore = usePnmStore();
  const statisticsStore = useStatisticsStore();
  const contactStore = useContactStore();
  const conversationStore = useConversationStore();
  const messageStore = useMessageStore();
  const eventStore = useEventStore();
  const notificationStore = useNotificationStore();
  const adminStatisticsStore = useAdminStatisticsStore();

  /**
   * Adds a PNM to the system. This needs to update
   * the pnm, statistics, contacts, and more.
   */
  const addOrUpdatePnm = async (pnm: IPNM) => {
    // Check if the pnm already exists in the store
    const existingPnm = pnmStore.getPnm(pnm._id);
    pnmStore.addOrUpdatePnm(pnm);

    if (!existingPnm) {
      // Update statistics to add the pnm count and recent pnms
      statisticsStore.incrementField('pnmCount');
      statisticsStore.setField('recentPnms', [
        pnm,
        ...statisticsStore.recentPnms,
      ]);

      // Add the pnm to the contact store as a suggested, all, and uncontacted contact
      contactStore.addContacts('suggested', pnm);
      contactStore.addContacts('all', pnm);
      contactStore.addContacts('uncontacted', pnm);
    }
  };

  /**
   * Removes a PNM from the system. This needs to
   * update the pnm, statistics, messages, conversations,
   * and contacts stores.
   */
  const deletePnm = async (pnm: IPNM) => {
    pnmStore.deletePnm(pnm._id);

    statisticsStore.decrementField('pnmCount');
    statisticsStore.setField(
      'recentPnms',
      statisticsStore.recentPnms.filter((recentPnm) => {
        return recentPnm._id !== pnm._id;
      }),
    );

    conversationStore.removeConversation(pnm._id);

    contactStore.removeContacts('all', pnm);
    contactStore.removeContacts('suggested', pnm);
    contactStore.removeContacts('uncontacted', pnm);

    if (pnm.starred) {
      contactStore.removeContacts('starred', pnm);
      statisticsStore.decrementField('starredPnmCount');
    }
  };

  /**
   * Adds a PNM to the favorites list. This needs to
   * update the pnm, statistics, and contacts stores.
   *
   */
  const favoritePnm = async (pnm: IPNM) => {
    pnmStore.addOrUpdatePnm({
      ...pnm,
      starred: true,
    });

    // Update statistics to increment the starred pnm count
    statisticsStore.incrementField('starredPnmCount');

    // Add the pnm to the starred contacts
    contactStore.addContacts('starred', pnm);
  };

  /**
   * Removes a PNM from the favorites list. This
   * needs to update the pnm, statistics, and contacts
   * stores.
   */
  const unfavoritePnm = async (pnm: IPNM) => {
    pnmStore.addOrUpdatePnm({
      ...pnm,
      starred: false,
    });

    // Update statistics to decrement the starred pnm count
    statisticsStore.decrementField('starredPnmCount');

    // Remove the pnm from the starred contacts
    contactStore.removeContacts('starred', pnm);
  };

  /**
   * Removes all data related to PNM's, including pnms,
   * conversations, messages, and more. Only call this
   * when we are deleting all pnms from the system.
   *
   * This method is DIFFERENT from clear, as it does not
   * clear events, as events are not related to pnms.
   * Use this method with caution.
   */
  const resetPnmStores = async () => {
    pnmStore.clear();
    statisticsStore.clear();
    contactStore.clear();
    conversationStore.clear();
    messageStore.clear();
  };

  /**
   * Clears all of the stores and caches, including
   * persisted datal. Use this method with caution.
   */
  const clear = async () => {
    pnmStore.clear();
    statisticsStore.clear();
    contactStore.clear();
    conversationStore.clear();
    messageStore.clear();
    eventStore.clear();
    adminStatisticsStore.clear();
    notificationStore.clear();
  };

  return {
    addOrUpdatePnm,
    deletePnm,
    favoritePnm,
    unfavoritePnm,
    resetPnmStores,
    clear,
  };
};
