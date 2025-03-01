import { useMutation } from "@tanstack/react-query";
import { ERROR_MESSAGES } from "@/constants/errorMessages";
import { useErrorNotification } from "../useErrorNotification";
import { useState } from "react";
import { uploadApis } from "@/services/apiServices/uploadApis";

export const useUploadImage = () => {
  const [errorUploadImage, setErrorUploadImage] = useState<Error>();
  const [isErrorUploadImage, setIsErrorUploadImage] = useState<boolean>(true);

  const errorTitle = ERROR_MESSAGES.FAIL_TO_UPLOAD_IMAGE;

  useErrorNotification(isErrorUploadImage, errorTitle, errorUploadImage);

  return useMutation({
    mutationFn: (uploadImg: File) => uploadApis.uploadImgReq(uploadImg),
    onError: error => {
      setErrorUploadImage(error);
      setIsErrorUploadImage(true);
    }
  });
};
