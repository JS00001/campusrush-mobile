/*
 * Created on Tue Sep 26 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { useAuth } from "@/providers/Auth";
import { usePurchases } from "@/providers/Purchases";

const useBilling = () => {
  const { offerings } = usePurchases();
  const { refetchBillingData, billingData } = useAuth();

  // Fetches the productIdentifiers of all active entitlements
  const activeEntitlements = Object.keys(billingData.entitlements.active).map(
    (key) => billingData.entitlements.active[key].productIdentifier,
  );

  // Create an array of products that are in the active entitlements
  // For each offering that is available...
  const activeProducts = offerings
    .map((offering) => {
      // Check if the offering has any packages that are in the active entitlements
      // This is a "hack" to get the product information for the active entitlements
      const availablePackages = offering.availablePackages.filter((pkg) =>
        activeEntitlements.includes(pkg.product.identifier),
      );

      // For each package/product that the user DOES have access/entitlement to...
      const formattedAvailablePackages = availablePackages.map((pkg) => {
        // Find the entitlements "key" that has a productIdentifier matching the current package/product
        const entitlementKey = Object.keys(
          billingData.entitlements.active,
        ).find((key) => {
          return (
            billingData.entitlements.active[key].productIdentifier ===
            pkg.product.identifier
          );
        });

        // If there is an entitlement key, then the user has access to the product
        // populate the entitlement
        const entitlement = entitlementKey
          ? billingData.entitlements.active[entitlementKey]
          : (null as any);

        // Return both the product itself and the entitlement data for every active product/package
        return {
          product: pkg.product,
          entitlement: entitlement,
        };
      });

      // Return an array of all the products that the user has access to
      return formattedAvailablePackages;
    })
    .flat();

  // The URL to redirect to for billing management
  const managementURL = billingData.managementURL;

  // Format all of the products to be properly displayed, each product in the array will be formatted as:
  // {
  //   title: "Product Title",
  //   description: "Product Description",
  //   subtitle: "Product Price",
  //   perks: ["Perk 1", "Perk 2", "Perk 3"]
  // }
  const activeProductsFormatted = activeProducts.map((product) => {
    // Whether or not a product is a subscription
    const _isSubscription = product?.product.productCategory === "SUBSCRIPTION";
    // Whether or not the subscription is pending cancellation
    const _isPendingCancellation = product?.entitlement?.willRenew === false;
    // When the product will either cancel or renew, formatted as MM/DD/YY
    const _expirationDate = product?.entitlement?.expirationDate
      ? new Date(product?.entitlement?.expirationDate).toLocaleDateString()
      : null;

    // The title of the product (should always exist, but just in case)
    const title = product?.product.title ?? "No title";

    // The description of the product (either pending cancellation or renews automatically or one-time purchase)
    const description = _isSubscription
      ? _isPendingCancellation
        ? `Pending cancellation on ${_expirationDate}`
        : `Renews automatically on ${_expirationDate}`
      : `One-time purchase`;

    // How much the product costs, formatted as "$1.99" or "$1.99 / mo"
    const subtitle =
      `${product?.product.priceString} ${_isSubscription ? "/ mo" : ""}` ??
      "No price";

    // TODO: Add perks
    const perks: String[] = [
      "This is Perk 1",
      "This is Perk 2",
      "This is Perk 3",
      "This is Perk 4",
    ];

    return {
      title,
      description,
      subtitle,
      perks,
    };
  });

  return {
    managementURL,
    activeProducts: activeProductsFormatted,
  };
};

export default useBilling;
