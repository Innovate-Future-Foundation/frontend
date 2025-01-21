import { Avatar as CNAvatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ImageCropper } from "./imageCropper";
import { FileWithPath, useDropzone } from "react-dropzone";
import { FileWithPreview } from "./imageCropper";
import React from "react";
interface AvatarProps {
  avatarLink: string;
  avatarAlt: string;
  avatarPlaceholder: string;
  size?: number;
  outline?: boolean;
  className?: string;
  clickable?: boolean;
}
const accept = {
  "image/*": []
};
const Avatar: React.FC<AvatarProps> = ({ avatarLink, avatarAlt, avatarPlaceholder, size = 10, outline = false, className = "", clickable }) => {
  const avatarStyle = `w-${size} h-${size} ${outline && "outline outline-white"}`;
  const [selectedFile, setSelectedFile] = React.useState<FileWithPreview | null>(null);
  const [isDialogOpen, setDialogOpen] = React.useState(false);

  const onDrop = React.useCallback((acceptedFiles: FileWithPath[]) => {
    const file = acceptedFiles[0];
    if (!file) {
      alert("Selected image is too large!");
      return;
    }
    const fileWithPreview = Object.assign(file, {
      preview: URL.createObjectURL(file)
    });

    setSelectedFile(fileWithPreview);
    setDialogOpen(true);

    // Call the upload function TODO
    // uploadAvatar(fileWithPreview);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept
  });

  return (
    <>
      {selectedFile ? (
        <ImageCropper dialogOpen={isDialogOpen} setDialogOpen={setDialogOpen} selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
      ) : (
        <CNAvatar {...getRootProps()} className={`${avatarStyle} ${className}`.trim()}>
          {clickable ? <input {...getInputProps()} /> : null}
          <AvatarImage src={avatarLink} alt={avatarAlt} />
          <AvatarFallback>{avatarPlaceholder}</AvatarFallback>
        </CNAvatar>
      )}
    </>
  );
};

export default Avatar;
