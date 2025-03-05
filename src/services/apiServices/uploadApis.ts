import { API_ENDPOINTS } from "@/constants/apiConfig";
import appRequest from "@/services/httpClient";

const uploadImgReq = (imageFile: File) => {
  const formData = new FormData();
  formData.append("file", imageFile);

  return appRequest.post(`${API_ENDPOINTS.API_V1}${API_ENDPOINTS.UPLOAD}${API_ENDPOINTS.IMAGE}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};
export const uploadApis = {
  uploadImgReq
};
