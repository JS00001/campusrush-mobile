/*
 * Created on Wed Nov 27 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import type { IPNM } from "@/types";

import tw from "@/lib/tailwind";
import FlatList from "@/ui/FlatList";
import ErrorMessage from "@/components/ErrorMessage";
import { useGetPnmResponses } from "@/hooks/api/pnms";
import FormResponse from "@/ui/ListItems/FormResponse";
import FormResponseLoader from "@/ui/Loaders/FormResponse";

interface ViewProps {
  pnm: IPNM;
}

const FormResponses: React.FC<ViewProps> = ({ pnm }) => {
  const responseQuery = useGetPnmResponses(pnm._id);

  if (responseQuery.error) {
    return (
      <ErrorMessage
        error={responseQuery.error}
        description="Could not fetch user's responses"
      />
    );
  }

  const responses = responseQuery.data?.responses || [];

  const contentContainerStyle = tw.style(
    // Set the minimum height such that the 'no-data' message is centered
    "pb-0 min-h-48",
    // If this is loading, we want to bypass the flatlist's rendering of 12 loading
    // components, just show one loading component
    responseQuery.isLoading && "h-48",
  );

  return (
    <FlatList
      data={responses}
      scrollEnabled={false}
      loading={responseQuery.isLoading}
      contentContainerStyle={contentContainerStyle}
      loadingComponent={<FormResponseLoader />}
      emptyListTitle="No Responses Found"
      emptyListSubtitle="This PNM has not submitted any forms"
      renderItem={({ item: response }) => <FormResponse response={response} />}
    />
  );
};

export default FormResponses;
