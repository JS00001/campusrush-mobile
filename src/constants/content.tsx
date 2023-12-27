/*
 * Created on Wed Oct 25 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

const Content = {
  /**
   * The title for error toasts with no title
   */
  errorTitle: "An Error Occurred",
  /**
   * The message to show to confirm the deletion of a single PNM
   */
  confirmDeletePNM:
    "This PNM will be permanently deleted. Are you sure you want to continue?",
  /**
   * The message to show to confirm the deletion of all of the PNMs
   */
  confirmDeleteAllPNMs:
    "All PNMs will be permanently deleted. Are you sure you want to continue?",
  /**
   * The new message error messages
   */
  newMessage: {
    /**
     * The error message to show when the user tries to message all PNMs but there are no PNMs
     */
    noPNMs: {
      title: "No PNMs",
      message: "You have no PNMs to message",
    },
    /**
     * The error message to show when the user tries to message all uncontaced PNMs but there are no uncontacted PNMs
     */
    noUncontactedPNMs: {
      title: "No Uncontacted PNMs",
      message: "You have messaged all current PNMs",
    },
    /**
     * The error message to show when the user tries to message all favorited PNMs but there are no favorited PNMs
     */
    noFavoritedPNMs: {
      title: "No Favorited PNMs",
      message: "You have not favorited any PNMs",
    },
    /**
     * The modal content when trying to message favorited PNMs without the Pro plan
     */
    favoritedPNMsUpgrade:
      "This feature is exclusive to the Pro plan. Upgrade to access messaging all favorited PNMs and more.",
    /**
     * The modal content when trying to message all uncontaced PNMs without the Pro plan
     */
    uncontactedPNMsUpgrade:
      "This feature is exclusive to the Pro plan. Upgrade to access messaging all uncontacted PNMs and more.",
  },
  /**
   * The messages when adding a new PNM
   */
  addPNM: {
    /**
     * The modal content when trying to access QR code sharing without the Pro plan
     */
    shareQRCodeUpgrade:
      "This feature is exclusive to the Pro plan. Upgrade to access Link/QR code sharing and more.",
  },
  /**
   * The verification success messages
   */
  verificationSuccess: {
    /**
     * The success message when the organization is verified
     */
    verifyOrganization: {
      title: "Successfully Verified Organization",
      message: "Your organization has been verified",
    },
    /**
     * The success message when the verification email is resent
     */
    resendVerificationEmail: {
      title: "Successfully Resent Verification Email",
      message: "A new verification email has been sent",
    },
  },
  /**
   * The success message when creating a PNM
   */
  createPNMSuccess: {
    title: "Successfully Added PNM",
    message: "Added PNM to your contacts",
  },
  /**
   * The success message when creating an event
   */
  createEventSuccess: {
    title: "Successfully Created Event",
    message: "Your event has been created",
  },
  /**
   * The success message when the organization is updated
   */
  updateOrganizationSuccess: {
    title: "Successfully Updated Organization",
    message: "Your organization has been updated",
  },
  /**
   * The success message when a PNM is updated
   */
  updatePNMSuccess: {
    title: "Successfully Updated PNM",
    message: "PNM's information has been updated",
  },
  /**
   * The rate limit error message
   */
  rateLimitError: {
    title: "Too Many Requests",
    message: "Please try again later",
  },
  /**
   * The missing entitlement error message
   */
  missingEntitlementError: {
    message:
      "This feature is not available in your current plan. Upgrade to unlock all features.",
    primaryButton: "Upgrade",
    secondaryButton: "No Thanks",
  },
};

export default Content;
