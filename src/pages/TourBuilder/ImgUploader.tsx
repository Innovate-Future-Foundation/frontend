import { useState } from "react";
import { Plus } from "lucide-react";

interface ImageUploaderProps {
  imageUrl?: string | null;
  getImageFile: (imageFile?: File) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ imageUrl, getImageFile }) => {
  const [preview, setPreview] = useState<string | null>(imageUrl ?? null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleUploadClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    // Reset errors
    setErrorMsg(null);

    // check file type
    if (file && !["image/jpg", "image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setErrorMsg("Only JPG, PNG, or WEBP images are allowed.");
      return;
    }
    // check file size
    if (file && file.size > 1 * 1024 * 1024) {
      setErrorMsg("File size should not exceed 1MB.");
      return;
    }

    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      getImageFile(file);
      return () => URL.revokeObjectURL(objectUrl);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="relative w-full h-48 border-2 border-dashed border-card-border rounded-lg flex justify-center items-center overflow-hidden">
        {preview ? (
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${preview})` }} />
        ) : (
          <p className="text-center text-gray-500">No image selected</p>
        )}

        <input type="file" accept="image/*" className="hidden" id="image-upload" onChange={handleUploadClick} />

        <label
          htmlFor="image-upload"
          className="absolute z-10 bg-secondary bg-opacity-75 px-4 py-2 rounded-lg cursor-pointer flex items-center gap-2 shadow-md hover:bg-opacity-100 transition"
        >
          <Plus className="w-5 h-5" />
          Select Cover Image
        </label>
      </div>
      {errorMsg && errorMsg.length > 0 ? (
        <div className="h-4 ">
          <p className="text-[0.8rem] font-medium text-destructive">{errorMsg}</p>
        </div>
      ) : (
        <div className="h-4"></div>
      )}
    </div>
  );
};

export default ImageUploader;
