import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ERROR_MESSAGES } from "@/constants/errorMessages";
import { useErrorNotification } from "../useErrorNotification";
import { useState } from "react";
import { Profile } from "@/types";
import { profileApis } from "@/services/apiServices";

interface useUpdateStudentProps {
  handleSuccess: () => void;
  handleError: () => void;
}

export const useUpdateStudent = ({ handleSuccess, handleError }: useUpdateStudentProps) => {
  const [errorStudents, setErrorStudents] = useState<Error>();
  const [isErrorStudents, setIsErrorStudents] = useState<boolean>(true);

  const queryClient = useQueryClient();

  const errorTitle = ERROR_MESSAGES.FAIL_TO_SAVE_STUDENT;

  useErrorNotification(isErrorStudents, errorTitle, errorStudents);

  return useMutation({
    mutationFn: ({ id, bodyData }: { id: string; bodyData: Profile }) => profileApis.updateProfile(id, bodyData),
    onSuccess: () => {
      handleSuccess();
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
    onError: error => {
      handleError();
      setErrorStudents(error);
      setIsErrorStudents(true);
    }
  });
};
