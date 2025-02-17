import { useState } from "react";
import { Plus } from "lucide-react";

const ImageUploader = () => {
  const [image, setImage] = useState<string | null>(null);

  const handleUploadClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex justify-center items-center overflow-hidden">
      {image && <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }} />}

      <input type="file" accept="image/*" className="hidden" id="image-upload" onChange={handleUploadClick} />

      <label
        htmlFor="image-upload"
        className="absolute z-10 bg-white bg-opacity-75 px-4 py-2 rounded-lg cursor-pointer flex items-center gap-2 shadow-md hover:bg-opacity-100 transition"
      >
        <Plus className="w-5 h-5" />
        Select Cover Image
      </label>
    </div>
  );
};

export default ImageUploader;
