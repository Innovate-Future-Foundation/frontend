import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ERROR_MESSAGES } from "@/constants/errorMessages";
import { useErrorNotification } from "../useErrorNotification";
import { useState } from "react";
import { Profile } from "@/types";
import { profileApis } from "@/services/apiServices";

interface useUpdateOrgTeacherProps {
  handleSuccess: () => void;
  handleError: () => void;
}

export const useUpdateOrgTeacher = ({ handleSuccess, handleError }: useUpdateOrgTeacherProps) => {
  const [errorOrgTeachers, setErrorOrgTeachers] = useState<Error>();
  const [isErrorOrgTeachers, setIsErrorOrgTeachers] = useState<boolean>(true);

  const queryClient = useQueryClient();

  const errorTitle = ERROR_MESSAGES.FAIL_TO_SAVE_ORGTEACHER;

  useErrorNotification(isErrorOrgTeachers, errorTitle, errorOrgTeachers);

  return useMutation({
    mutationFn: ({ id, bodyData }: { id: string; bodyData: Profile }) => profileApis.updateProfile(id, bodyData),
    onSuccess: () => {
      handleSuccess();
      queryClient.invalidateQueries({ queryKey: ["orgTeachers"] });
    },
    onError: error => {
      handleError();
      setErrorOrgTeachers(error);
      setIsErrorOrgTeachers(true);
    }
  });
};
