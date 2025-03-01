import React from "react";
import { FileWithPath, useDropzone } from "react-dropzone";

import { Avatar as CNAvatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Pencil } from "lucide-react";
import clsx from "clsx";
import { FileWithPreview, ImageCropper } from "./ImageCropper";

interface AvatarProps {
  avatarLink: string;
  avatarAlt?: string;
  avatarPlaceholder: string;
  size?: number;
  outline?: boolean;
  clickable?: boolean;
  className?: string;
  getUploadedUrl?: (url: string) => void;
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
  getUploadedUrl,
  imageProps = {},
  fallbackProps = {},
  ...props
}) => {
  const avatarStyle = `aspect-square w-${size} h-${size} ${outline && "outline outline-white"}`;
  const [selectedFile, setSelectedFile] = React.useState<FileWithPreview | null>(null);
  const [isDialogOpen, setDialogOpen] = React.useState(false);
  const [croppedImageUrl, setCroppedImageUrl] = React.useState<string | null>(null);

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
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept
  });

  return (
    <>
      {selectedFile ? (
        <ImageCropper
          setCroppedImageUrl={setCroppedImageUrl}
          dialogOpen={isDialogOpen}
          setDialogOpen={setDialogOpen}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          getUploadedUrl={getUploadedUrl}
        >
          <div {...getRootProps()} className={clsx(`relative ${clickable ? "cursor-pointer" : "cursor-default"}`)}>
            {clickable && (
              <input
                {...getInputProps()}
                className="hidden"
                onClick={e => {
                  e.stopPropagation();
                }}
              />
            )}
            {clickable && (
              <div className="bg-primary text-primary-foreground absolute z-[2] right-1 bottom-0 rounded-full p-1 shadow-md">
                <Pencil size={14} />
              </div>
            )}
            <CNAvatar className={cn(avatarStyle, className)} {...props}>
              <AvatarImage src={croppedImageUrl ?? avatarLink} alt={avatarAlt} {...imageProps} />
              <AvatarFallback {...fallbackProps}>{avatarPlaceholder}</AvatarFallback>
            </CNAvatar>
          </div>
        </ImageCropper>
      ) : (
        <div {...getRootProps()} className={clsx(`relative ${clickable ? "cursor-pointer" : "cursor-default"}`)}>
          {clickable && (
            <input
              {...getInputProps()}
              className="hidden"
              onClick={e => {
                e.stopPropagation();
              }}
            />
          )}
          {clickable && (
            <div className="bg-primary text-primary-foreground absolute z-[2] right-1 bottom-0 rounded-full p-1 shadow-md">
              <Pencil size={14} />
            </div>
          )}
          <CNAvatar className={cn(avatarStyle, className)} {...props}>
            <AvatarImage src={croppedImageUrl ?? avatarLink} alt={avatarAlt} {...imageProps} />
            <AvatarFallback {...fallbackProps}>{avatarPlaceholder}</AvatarFallback>
          </CNAvatar>
        </div>
      )}
    </>
  );
};

export default Avatar;
