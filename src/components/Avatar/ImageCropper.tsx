import React, { ReactNode, useEffect, useState, type SyntheticEvent } from "react";
import ReactCrop, { centerCrop, makeAspectCrop, type Crop, type PixelCrop } from "react-image-crop";
import { FileWithPath } from "react-dropzone";
import { CropIcon, Loader2 } from "lucide-react";
import "react-image-crop/dist/ReactCrop.css";

import { Avatar as CNAvatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useUploadImage } from "@/hooks/upload/useUploadImage";

export type FileWithPreview = FileWithPath & {
  preview: string;
};

interface ImageCropperProps {
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedFile: FileWithPreview | null;
  setSelectedFile: React.Dispatch<React.SetStateAction<FileWithPreview | null>>;
  children: ReactNode;
  setCroppedImageUrl: (croppedImage: string | null) => void;
  getUploadedUrl?: (url: string) => void;
}

export function ImageCropper({ dialogOpen, setDialogOpen, selectedFile, setSelectedFile, setCroppedImageUrl, getUploadedUrl, children }: ImageCropperProps) {
  const aspect = 1;
  const [imgRawFile, setImgRawFile] = useState<File | null>(null);
  const imgRef = React.useRef<HTMLImageElement | null>(null);

  const [crop, setCrop] = React.useState<Crop>();

  function onImageLoad(e: SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  function onCrop(crop: PixelCrop) {
    if (imgRef.current && crop.width && crop.height) {
      const scroppedImageUrl = getCroppedImg(imgRef.current, crop);
      setCroppedImageUrl(scroppedImageUrl);
      //convert base64 to file
      const croppedImageFile = base64ToFile(scroppedImageUrl, selectedFile?.name || "cropped.png");
      setImgRawFile(croppedImageFile);
    }
  }

  function getCroppedImg(image: HTMLImageElement, crop: PixelCrop): string {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = scaleX;

    canvas.width = crop.width * scaleX;
    canvas.height = crop.height * scaleY;

    const ctx = canvas.getContext("2d");

    if (ctx) {
      ctx.imageSmoothingEnabled = false;

      ctx.drawImage(image, crop.x * scaleX, crop.y * scaleY, crop.width * scaleX, crop.height * scaleY, 0, 0, crop.width * scaleX, crop.height * scaleY);
    }

    return canvas.toDataURL("image/png", 1.0);
  }

  const { mutate, data, isSuccess, isPending } = useUploadImage();

  async function onCropComplete(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    try {
      //todo: call upload img api
      if (imgRawFile) {
        mutate(imgRawFile);
      }
    } catch (error) {
      alert(`Something went wrong! Error Message ${error}`);
    }
  }

  const handleOpenChange = (open: boolean) => {
    setDialogOpen(open);
    if (!open) {
      setSelectedFile(null);
      setDialogOpen(false);
      setCroppedImageUrl(null);
    }
  };

  useEffect(() => {
    if (isSuccess && !isPending) {
      getUploadedUrl?.(data?.data.data.url);
      setSelectedFile(null);
      setDialogOpen(false);
    }
  }, [isSuccess, data, getUploadedUrl, setDialogOpen, setSelectedFile, isPending]);

  return (
    <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent
        className="p-5 gap-0"
        onInteractOutside={e => {
          e.preventDefault();
        }}
      >
        <DialogTitle className="pl-5">Crop Your Avatar</DialogTitle>
        <DialogDescription className="pl-5">Adjust the crop area to create your avatar.</DialogDescription>
        <div className="p-6 size-full">
          <ReactCrop crop={crop} onChange={(_, percentCrop) => setCrop(percentCrop)} onComplete={c => onCrop(c)} aspect={aspect} className="w-full">
            <CNAvatar className="size-full rounded-none">
              <AvatarImage ref={imgRef} className="size-full rounded-none" alt="Image Cropper Shell" src={selectedFile?.preview} onLoad={onImageLoad} />
              <AvatarFallback className="size-full min-h-[460px] rounded-none">Loading...</AvatarFallback>
            </CNAvatar>
          </ReactCrop>
        </div>
        <DialogFooter className="p-6 pt-0 justify-center">
          <Button size={"sm"} className="w-fit" onClick={e => onCropComplete(e)}>
            {isPending ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                <CropIcon className="mr-1.5 size-4" />
                Crop
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Helper function to center the crop
export function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number): Crop {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 50,
        height: 50
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

function base64ToFile(base64String: string, fileName: string): File {
  const arr = base64String.split(",");
  const mime = arr[0].match(/:(.*?);/)?.[1] || "image/png";
  const byteString = atob(arr[1]);
  let n = byteString.length;
  const uint8Array = new Uint8Array(n);

  while (n--) {
    uint8Array[n] = byteString.charCodeAt(n);
  }

  return new File([uint8Array], fileName, { type: mime });
}
