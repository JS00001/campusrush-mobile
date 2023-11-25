/*
 * Created on Tue Nov 14 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import usePnmsStore from "./pnms";
import useContactsStore from "./contacts";
import useStatisticsStore from "./statistics";
import useConversationsStore from "./conversations";

const useZustandStore = () => {
  // PNMs store
  const _pnms = usePnmsStore((s) => s.pnms);
  const _getPnm = usePnmsStore((s) => s.getPnm);
  const _addPnms = usePnmsStore((s) => s.addPnms);
  const _updatePnm = usePnmsStore((s) => s.updatePnm);
  const _deletePnm = usePnmsStore((s) => s.deletePnm);
  const _setPnms = usePnmsStore((s) => s.setPnms);
  const _setStatus = usePnmsStore((s) => s.setStatus);
  const _resetPnmsState = usePnmsStore((s) => s.resetState);

  // Statistics store
  const _numPnms = useStatisticsStore((s) => s.numPnms);
  const _numStarredPnms = useStatisticsStore((s) => s.numStarredPnms);
  const _recentPnms = useStatisticsStore((s) => s.recentPnms);
  const _resetStatisticsState = useStatisticsStore((s) => s.resetState);
  const _setNumPnms = useStatisticsStore((s) => s.setNumPnms);
  const _setRecentPnms = useStatisticsStore((s) => s.setRecentPnms);
  const _setNumStarredPnms = useStatisticsStore((s) => s.setNumStarredPnms);
  const _incrementNumPnms = useStatisticsStore((s) => s.incrementNumPnms);
  // prettier-ignore
  const _incrementNumStarredPnms = useStatisticsStore( (s) => s.incrementNumStarredPnms);
  const _decrementNumPnms = useStatisticsStore((s) => s.decrementNumPnms);
  // prettier-ignore
  const _decrementNumStarredPnms = useStatisticsStore((s) => s.decrementNumStarredPnms);

  // Conversations store
  const _conversations = useConversationsStore((s) => s.conversations);
  const _addConversations = useConversationsStore((s) => s.addConversations);
  // prettier-ignore
  const _resetConversationsState = useConversationsStore((s) => s.resetState);
  // prettier-ignore
  const _deleteConversation = useConversationsStore((s) => s.deleteConversation);
  // prettier-ignore
  const _updateConversation = useConversationsStore((s) => s.updateConversation);

  // Contacts store
  const _allPnms = useContactsStore((s) => s.allPnms);
  const _starredPnms = useContactsStore((s) => s.starredPnms);
  const _suggestedPnms = useContactsStore((s) => s.suggestedPnms);
  const _uncontactedPnms = useContactsStore((s) => s.uncontactedPnms);
  const _resetContactsState = useContactsStore((s) => s.resetState);
  const _setContacts = useContactsStore((s) => s.setContacts);
  const _addContactTo = useContactsStore((s) => s.addContactTo);
  const _removeContactFrom = useContactsStore((s) => s.removeContactFrom);

  /**
   * Add a new PNM
   */
  const addPnm = async (pnm: PNM) => {
    // Add the pnm to the PNMs store
    _addPnms([pnm]);
    // Increment the number of PNMs in the statistics store
    _incrementNumPnms();
    // Add as a recent PNM in the statistics store
    _setRecentPnms([pnm, ..._recentPnms]);
    // Add the pnm to the suggested PNMs in the contacts store
    _addContactTo("suggestedPnms", pnm);
    // Add the pnm to all PNMs in the contacts store
    _addContactTo("allPnms", pnm);
    // Add the pnm to the uncontacted PNMs in the contacts store
    _addContactTo("uncontactedPnms", pnm);
  };

  /**
   * Delete a PNM
   */
  const deletePnm = async (pnm: PNM) => {
    // Delete the pnm from the PNMs store
    _deletePnm(pnm);
    // Remove the pnm from the recent PNMs in the statistics store (if it exists)
    _setRecentPnms(_recentPnms.filter((p) => p._id !== pnm._id));
    // Delete the conversation from the conversations store
    _deleteConversation(pnm._id);
    // Decrement the number of PNMs in the statistics store
    _decrementNumPnms();
    // Remove the pnm from the suggested PNMs in the contacts store (if it exists)
    _removeContactFrom("suggestedPnms", pnm);
    // Remove the pnm from the all PNMs in the contacts store (if it exists)
    _removeContactFrom("allPnms", pnm);
    // Remove the pnm from the uncontacted PNMs in the contacts store (if it exists)
    _removeContactFrom("uncontactedPnms", pnm);

    // Check if the PNM is favorited
    if (pnm.starred) {
      // Decrement the number of starred PNMs in the statistics store
      _decrementNumStarredPnms();
    }
  };

  /**
   * Favorite a PNM
   */
  const favoritePnm = async (pnm: PNM) => {
    // Update the pnm in the PNMs store
    _updatePnm({
      ...pnm,
      starred: true,
    });

    // Increment the number of starred PNMs in the statistics store
    _incrementNumStarredPnms();
    // Add the pnm to the starred PNMs in the contacts store
    _addContactTo("starredPnms", pnm);
  };

  /**
   * Unfavorite a PNM
   */
  const unfavoritePnm = async (pnm: PNM) => {
    // Update the pnm in the PNMs store
    _updatePnm({
      ...pnm,
      starred: false,
    });
    // Decrement the number of starred PNMs in the statistics store
    _decrementNumStarredPnms();
    // Remove the pnm from the starred PNMs in the contacts store
    _removeContactFrom("starredPnms", pnm);
  };

  /**
   * Reset all cached stores
   */
  const resetState = async () => {
    // Update the PNMs store
    _resetPnmsState();
    // Remove all of the conversations from the conversations store
    _resetConversationsState();
    // Update the statistics store
    _resetStatisticsState();
    // Update the contacts store
    _resetContactsState();
  };

  return {
    addPnm,
    deletePnm,
    favoritePnm,
    unfavoritePnm,
    resetState,
  };
};

export default useZustandStore;
