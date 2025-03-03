import React from "react";
import { FileWithPath, useDropzone } from "react-dropzone";

import { Avatar as CNAvatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ImageCropper } from "./imageCropper";
import { FileWithPreview } from "./imageCropper";
import { cn } from "@/lib/utils";

interface AvatarProps {
  avatarLink: string;
  avatarAlt?: string;
  avatarPlaceholder: string;
  size?: number;
  outline?: boolean;
  clickable?: boolean;
  className?: string;
  imageProps?: React.ComponentProps<typeof AvatarImage>;
  fallbackProps?: React.ComponentProps<typeof AvatarFallback>;
}

const accept = {
  "image/*": []
};

const Avatar: React.FC<AvatarProps> = ({
  avatarLink,
  avatarAlt = "@innovatedFuture",
  avatarPlaceholder,
  size = 10,
  outline = false,
  clickable,
  className,
  imageProps = {},
  fallbackProps = {},
  ...props
}) => {
  const avatarStyle = `aspect-square w-${size} h-${size} ${outline && "outline outline-white"}`;
  const [selectedFile, setSelectedFile] = React.useState<FileWithPreview | null>(null);
  const [isDialogOpen, setDialogOpen] = React.useState(false);
  const [croppedImage, setCroppedImage] = React.useState<string>("");

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
        <ImageCropper
          setCroppedImage={setCroppedImage}
          dialogOpen={isDialogOpen}
          setDialogOpen={setDialogOpen}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
        >
          <CNAvatar {...getRootProps()} className={cn(avatarStyle, className)} {...props}>
            {clickable ? <input {...getInputProps()} /> : null}
            <AvatarImage src={croppedImage ?? avatarLink} alt={avatarAlt} {...imageProps} />
            <AvatarFallback {...fallbackProps}>{avatarPlaceholder}</AvatarFallback>
          </CNAvatar>
        </ImageCropper>
      ) : (
        <CNAvatar {...getRootProps()} className={cn(avatarStyle, className)} {...props}>
          {clickable ? <input {...getInputProps()} /> : null}
          <AvatarImage src={avatarLink} alt={avatarAlt} {...imageProps} data-testid="avatar-image" />
          <AvatarFallback {...fallbackProps}>{avatarPlaceholder}</AvatarFallback>
        </CNAvatar>
      )}
    </>
  );
};

export default Avatar;
