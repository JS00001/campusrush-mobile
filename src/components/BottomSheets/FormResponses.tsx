/*
 * Created on Sat Nov 30 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { View } from "react-native";

import type { BottomSheetProps, SheetData } from "./@types";

import tw from "@/lib/tailwind";
import date from "@/lib/util/date";
import Headline from "@/ui/Headline";
import Skeleton from "@/ui/Skeleton";
import FlatList from "@/ui/FlatList";
import { BottomSheet } from "@/ui/BottomSheet";
import ErrorMessage from "@/components/ErrorMessage";
import FormResponse from "@/ui/ListItems/FormResponse";
import { useGetFormResponses } from "@/hooks/api/forms";
import BottomSheetContainer from "@/ui/BottomSheet/Container";
import { useState } from "react";
import Searchbox from "@/ui/Searchbox";
import useKeyboardListener from "@/hooks/useKeyboardListener";

type Props = BottomSheetProps & SheetData<"FORM_RESPONSES">;

// TODO: Add search to this, must use BACKEND to search
const Content: React.FC<Props> = ({ data, snapToIndex, snapToPosition }) => {
  const form = data.form;
  const [search, setSearch] = useState("");
  const query = useGetFormResponses(form._id, search);

  useKeyboardListener({
    onKeyboardWillShow: () => {
      snapToPosition("90%");
    },
    onKeyboardWillHide: () => {
      snapToIndex(0);
    },
  });

  const responses = query.data?.responses || [];

  // Loading & Error State
  if (query.isLoading) return <LoadingState />;
  if (query.isError || !form) {
    return (
      <ErrorMessage
        error={query.error}
        description="Could not fetch the form"
      />
    );
  }

  const placeholder = `Search ${responses.length} responses`;
  const lastResponseAt = form.lastResponseAt
    ? `Last response ${date.timeAgo(form.lastResponseAt)}`
    : "No responses yet";

  return (
    <BottomSheetContainer contentContainerStyle={tw`gap-y-4`}>
      <Headline
        style={tw`shrink`}
        title={`${form.title}'s Responses`}
        subtitle={lastResponseAt}
      />

      <Searchbox
        value={search}
        placeholder={placeholder}
        onChangeText={setSearch}
      />

      <FlatList
        data={responses}
        scrollEnabled={false}
        contentContainerStyle={tw`gap-2 pb-0`}
        emptyListTitle="No responses yet"
        emptyListSubtitle="Share this form to start collecting responses"
        renderItem={({ item: response }) => {
          const formattedResponse = { ...response, form };
          return <FormResponse response={formattedResponse} />;
        }}
      />
    </BottomSheetContainer>
  );
};

const LoadingState = () => {
  return (
    <BottomSheetContainer contentContainerStyle={tw`gap-y-4`}>
      <View style={tw`gap-1`}>
        <Skeleton height={24} width="50%" borderRadius={4} />
        <Skeleton height={20} width="100%" borderRadius={4} />
      </View>

      <View style={tw`gap-2`}>
        {new Array(3).fill(null).map((_, i) => (
          <Skeleton height={172} width="100%" key={i} />
        ))}
      </View>
    </BottomSheetContainer>
  );
};

const FormResponsesSheet: React.FC<BottomSheetProps> = (props) => {
  return (
    <BottomSheet
      innerRef={props.innerRef}
      children={(data?: SheetData<"FORM_RESPONSES">) => {
        return <Content data={data!.data} {...props} />;
      }}
    />
  );
};

export default FormResponsesSheet;
