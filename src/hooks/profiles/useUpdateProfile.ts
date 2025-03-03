import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ERROR_MESSAGES } from "@/constants/errorMessages";
import { useErrorNotification } from "../useErrorNotification";
import { useState } from "react";
import { ProfileInfo } from "@/types";
import { profileApis } from "@/services/apiServices";

interface useUpdateProfileProps {
  handleSuccess?: () => void;
  handleError?: () => void;
}

export const useUpdateProfile = ({ handleSuccess, handleError }: useUpdateProfileProps) => {
  const [errorProfiles, setErrorProfiles] = useState<Error>();
  const [isErrorProfiles, setIsErrorProfiles] = useState<boolean>(true);

  const queryClient = useQueryClient();

  const errorTitle = ERROR_MESSAGES.FAIL_TO_SAVE_PROFILE;

  useErrorNotification(isErrorProfiles, errorTitle, errorProfiles);

  return useMutation({
    mutationFn: ({ id, bodyData }: { id: string; bodyData: ProfileInfo }) => profileApis.updateProfile(id, bodyData),
    onSuccess: () => {
      handleSuccess?.();
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
    },
    onError: error => {
      handleError?.();
      setErrorProfiles(error);
      setIsErrorProfiles(true);
    }
  });
};
