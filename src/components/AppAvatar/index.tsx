import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FileWithPath, useDropzone } from "react-dropzone";
import { ImageCropper } from "./imageCropper";
import React from "react";
// import SvgText from "@/components/svg-text"
export type FileWithPreview = FileWithPath & {
  preview: string;
};
type avatarType = {
  avatarLink: string;
  avatarAlt: string;
  avaterPlaceholder: string;
  size?: number;
  outline?: boolean;
  className?: string;
  clickable?: boolean;
};

const accept = {
  "image/*": []
};
const AppAvatar: React.FC<avatarType> = ({ size = 10, outline = false, className = "", clickable = false }) => {
  const avatarStyle = `w-${size} h-${size} ${outline && "outline outline-white"} ${className.trim()}`;
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
    <div className="avatarStyle ">
      {selectedFile ? (
        <ImageCropper dialogOpen={isDialogOpen} setDialogOpen={setDialogOpen} selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
      ) : (
        <Avatar {...getRootProps()} className={avatarStyle}>
          {clickable ? <input {...getInputProps()} /> : null}

          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default AppAvatar;
