import React, { ReactNode, type SyntheticEvent } from "react";
import ReactCrop, { centerCrop, makeAspectCrop, type Crop, type PixelCrop } from "react-image-crop";
import { FileWithPath } from "react-dropzone";
import { CropIcon } from "lucide-react";
import "react-image-crop/dist/ReactCrop.css";

import { Avatar as CNAvatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export type FileWithPreview = FileWithPath & {
  preview: string;
};

interface ImageCropperProps {
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedFile: FileWithPreview | null;
  setSelectedFile: React.Dispatch<React.SetStateAction<FileWithPreview | null>>;
  children: ReactNode;
  setCroppedImageUrl: (croppedImage: string) => void;
  // croppedImageUrl: string;
  getUploadedUrl?: (url: string) => void;
}

export function ImageCropper({
  dialogOpen,
  setDialogOpen,
  selectedFile,
  setSelectedFile,
  setCroppedImageUrl,
  // croppedImageUrl,
  getUploadedUrl,
  children
}: ImageCropperProps) {
  const aspect = 1;

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

  async function onCropComplete() {
    try {
      //todo: call upload img api
      getUploadedUrl?.(
        "https://plus.unsplash.com/premium_photo-1732568817442-342a8c77fb80?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      );
      // setCroppedImageUrl(croppedImageUrl);
      setDialogOpen(false);
      setSelectedFile(null);
    } catch (error) {
      alert(`Something went wrong! Error Message ${error}`);
    }
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="p-5 gap-0">
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
          <Button type="submit" size={"sm"} className="w-fit" onClick={onCropComplete}>
            <CropIcon className="mr-1.5 size-4" />
            Crop
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
