/*
 * Created on Tue 15 Aug 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import Autocomplete from "@/ui/Autocomplete/Autocomplete";
import Layout from "@/ui/Layout";

interface UITestingProps {}

const UITesting: React.FC<UITestingProps> = () => {
  const organizations = [
    "Acacia",
    "Alpha Chi Rho",
    "Alpha Chi Sigma",
    "Alpha Delta",
    "Alpha Delta Gamma",
    "Alpha Delta Phi",
    "Alpha Epsilon Pi",
    "Alpha Gamma Omega",
    "Alpha Gamma Rho",
    "Alpha Gamma Sigma",
    "Alpha Kappa Lambda",
    "Alpha Kappa Psi",
    "Alpha Nu Omega",
    "Alpha Phi Alpha",
    "Alpha Phi Delta",
    "Alpha Phi Omega",
    "Alpha Psi",
    "Alpha Psi Lambda",
    "Alpha Psi Rho",
    "Alpha Sigma Phi",
    "Alpha Tau Omega",
    "Beta Chi Theta",
    "Beta Gamma Nu",
    "Beta Kappa Gamma",
    "Beta Sigma Psi",
    "Beta Theta Pi",
    "Beta Upsilon Chi",
    "Chi Phi",
    "Chi Psi",
    "Chi Sigma Tau",
    "Chi Upsilon Zeta",
    "Delphic of Gamma Sigma Tau",
    "Delta Chi",
    "Delta Chi Xi",
    "Delta Epsilon Psi",
    "Delta Kappa Epsilon",
    "Delta Lambda Phi",
    "Delta Omega Epsilon",
    "Delta Phi",
    "Delta Psi",
    "Delta Sigma Iota",
    "Delta Sigma Phi",
    "Delta Sigma Pi",
    "Delta Tau Delta",
    "Delta Upsilon",
    "Farmhouse",
    "Gamma Zeta Alpha",
    "Iota Nu Delta",
    "Iota Phi Theta",
    "Kappa Alpha Order",
    "Kappa Alpha Psi",
    "Kappa Alpha Society",
    "Kappa Delta Phi",
    "Kappa Delta Rho",
    "Kappa Kappa Psi",
    "Kappa Sigma",
    "Kappa Upsilon Chi",
    "Lambda Alpha Upsilon",
    "Lambda Chi Alpha",
    "Lambda Phi Epsilon",
    "Lambda Sigma Phi",
    "Lambda Sigma Upsilon",
    "Lambda Theta Phi",
    "Lambda Upsilon Lambda",
    "Mu Beta Psi",
    "Nu Alpha Kappa",
    "Omega Delta",
    "Omega Delta Phi",
    "Omega Phi Kappa",
    "Omega Psi Phi",
    "Phi Alpha Delta",
    "Phi Alpha Epsilon",
    "Phi Beta Epsilon",
    "Phi Beta Kappa",
    "Phi Beta Sigma",
    "Phi Delta Epsilon",
    "Phi Delta Psi",
    "Phi Delta Theta",
    "Phi Gamma Delta",
    "Phi Iota Alpha",
    "Phi Kappa Pi",
    "Phi Kappa Psi",
    "Phi Kappa Sigma",
    "Phi Kappa Tau",
    "Phi Kappa Theta",
    "Phi Lambda Chi",
    "Phi Mu Alpha Sinfonia",
    "Phi Mu Delta",
    "Phi Rho Eta",
    "Phi Sigma Alpha",
    "Phi Sigma Kappa",
    "Phi Sigma Nu",
    "Phi Sigma Phi",
    "Pi Alpha Phi",
    "Pi Delta Psi",
    "Pi Kappa Alpha",
    "Pi Kappa Phi",
    "Pi Lambda Phi",
    "Psi Sigma Phi",
    "Psi Upsilon",
    "Sigma Alpha Epsilon",
    "Sigma Alpha Mu",
    "Sigma Beta Rho",
    "Sigma Chi",
    "Sigma Delta Alpha",
    "Sigma Lambda Beta",
    "Sigma Nu",
    "Sigma Phi Beta",
    "Sigma Phi Delta",
    "Sigma Phi Epsilon",
    "Sigma Phi Society",
    "Sigma Pi",
    "Sigma Tau Gamma",
    "Sigma Theta Pi",
    "Tau Alpha Upsilon",
    "Tau Delta Phi",
    "Tau Epsilon Phi",
    "Tau Kappa Epsilon",
    "Tau Omega Rho",
    "Tau Phi Sigma",
    "Theta Chi",
    "Theta Delta Chi",
    "Theta Tau",
    "Theta Xi",
    "Triangle",
    "X Club",
    "Xi Kappa",
    "Zeta Beta Tau",
    "Zeta Phi Rho",
  ];

  const schools = [
    "University of California, Berkeley",
    "University of California, Los Angeles",
    "University of California, San Diego",
    "University of California, Irvine",
    "University of California, Davis",
    "University of California, Santa Barbara",
    "University of California, Santa Cruz",
    "University of California, Riverside",
    "University of California, Merced",
    "University of California, San Francisco",
  ];

  return (
    <Layout>
      <Autocomplete
        placeholder="Organization"
        options={organizations}
      ></Autocomplete>
    </Layout>
  );
};

export default UITesting;
