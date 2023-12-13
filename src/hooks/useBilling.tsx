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
import { useIAPs } from "@/providers/IAP";
import useEntitlementsStore from "@/state/entitlements";

import type { ProductId } from "@/types/interfaces/EntitlementInterfaces";

const useBilling = () => {
  const { customerData } = useAuth();
  const { offering, restorePurchases } = useIAPs();

  // Pull the entitlement details from the store
  // prettier-ignore
  const entitlementDetails = useEntitlementsStore((state) => state.entitlementDetails);

  // Fetches the productIdentifiers of all active entitlements
  const activeEntitlements = Object.keys(customerData.entitlements.active).map(
    (key) => customerData.entitlements.active[key].productIdentifier,
  );

  // Check if the offering has any packages that are in the active entitlements
  // This is a "hack" to get the product information for the active entitlements
  const availablePackages = offering?.availablePackages.filter((pkg) =>
    activeEntitlements.includes(pkg.product.identifier),
  );

  // For each package/product that the user DOES have access/entitlement to...
  const formattedAvailablePackages = availablePackages?.map((pkg) => {
    // Find the entitlements "key" that has a productIdentifier matching the current package/product
    const entitlementKey = Object.keys(customerData.entitlements.active).find(
      (key) => {
        return (
          customerData.entitlements.active[key].productIdentifier ===
          pkg.product.identifier
        );
      },
    );

    // If there is an entitlement key, then the user has access to the product
    // populate the entitlement
    const entitlement = entitlementKey
      ? customerData.entitlements.active[entitlementKey]
      : (null as any);

    // Return both the product itself and the entitlement data for every active product/package
    return {
      product: pkg.product,
      entitlement: entitlement,
    };
  });

  // The URL to redirect to for billing management
  const managementURL = customerData.managementURL;

  // Format all of the products to be properly displayed, each product in the array will be formatted as:
  // {
  //   title: "Product Title",
  //   description: "Product Description",
  //   subtitle: "Product Price",
  //   perks: ["Perk 1", "Perk 2", "Perk 3"]
  // }
  const activeProductsFormatted = formattedAvailablePackages?.map((product) => {
    // Whether or not a product is a subscription
    const _isSubscription = product?.product.productCategory === "SUBSCRIPTION";
    // Whether or not the subscription is pending cancellation
    const _isPendingCancellation = product?.entitlement?.willRenew === false;
    // When the product will either cancel or renew, formatted as Oct 21, 2023
    const _expirationDate = product?.entitlement?.expirationDate
      ? new Date(product?.entitlement?.expirationDate).toLocaleDateString(
          "en-US",
          {
            month: "short",
            day: "numeric",
            year: "numeric",
          },
        )
      : null;

    // The title of the product (should always exist, but just in case)
    const title = product?.product.title ?? "No title";

    // The description of the product (either pending cancellation or renews automatically or one-time purchase)
    const description = _isSubscription
      ? _isPendingCancellation
        ? `Pending cancellation on ${_expirationDate}`
        : `Renews automatically on ${_expirationDate}`
      : `One-time purchase`;

    // How much the product costs, formatted as "$1.99" or "$1.99 / year"
    const subtitle =
      `${product?.product.priceString} ${_isSubscription ? "/ year" : ""}` ??
      "No price";

    // Get the id of the product
    const id = product?.product.identifier as ProductId;

    // Get the perks from the entitlement details
    const perks = entitlementDetails?.products[id]?.FEATURED_PERKS || [];

    return {
      title,
      description,
      subtitle,
      perks,
    };
  });

  return {
    managementURL,
    restorePurchases,
    activeProducts: activeProductsFormatted,
  };
};

export default useBilling;
