/*
 * Created on Sun Feb 25 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import Toast from "react-native-toast-message";

import type { CreatePnmState } from "..";
import type { CreatePnmRequest } from "@/types";
import type { UseSheetFlowProps } from "@/hooks/useSheetFlow";

import tw from "@/lib/tailwind";
import Button from "@/ui/Button";
import Headline from "@/ui/Headline";
import FormField from "@/ui/FormField";
import { useGlobalStore } from "@/store";
import ButtonGroup from "@/ui/ButtonGroup";
import TagView from "@/components/TagView";
import usePosthog from "@/hooks/usePosthog";
import { useCreatePnm } from "@/hooks/api/pnms";

const ManualStep4: React.FC<UseSheetFlowProps<CreatePnmState>> = ({
  state,
  setState,
  prevView,
  handleClose,
}) => {
  const fields = {
    firstName: "First Name",
    lastName: "Last Name",
    phoneNumber: "Phone Number",
    instagram: "Instagram",
    snapchat: "Snapchat",
  };

  const posthog = usePosthog();
  const mutation = useCreatePnm();
  const globalStore = useGlobalStore();

  const handleSubmission = async () => {
    const response = await mutation.mutateAsync(state as CreatePnmRequest);

    setState({
      firstName: undefined,
      lastName: undefined,
      phoneNumber: undefined,
      instagram: undefined,
      snapchat: undefined,
      tags: [],
    });

    globalStore.addOrUpdatePnm(response.data.pnm);

    Toast.show({
      type: "success",
      text1: "Successfully created PNM",
      text2: "The PNM has been added to your contacts",
    });

    posthog.capture("PNM_CREATED_MANUALLY");

    handleClose();
  };

  return (
    <>
      <Headline title="Finalize" subtitle="Does this look correct?" />

      {Object.keys(fields).map((key) => {
        const value = state[key as keyof CreatePnmRequest];

        return (
          <FormField
            disabled
            key={key}
            contentContainerStyle={tw`opacity-100`}
            value={(value as string) || "N/A"}
            placeholder={fields[key as keyof typeof fields]}
          />
        );
      })}

      <TagView disabled tags={state.tags} />

      <ButtonGroup>
        <Button
          size="sm"
          color="secondary"
          onPress={prevView}
          disabled={mutation.isLoading}
        >
          No, Go Back
        </Button>
        <Button
          size="sm"
          onPress={handleSubmission}
          loading={mutation.isLoading}
        >
          Yes, Create
        </Button>
      </ButtonGroup>
    </>
  );
};

export default ManualStep4;
