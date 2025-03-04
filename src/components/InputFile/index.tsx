import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Avatar from "@/components/Avatar";
import { useUploadImage } from "@/hooks/upload/useUploadImage";
import { abbreviateName } from "@/utils/formatters";

interface InputFileProps {
  title: string;
  orgName: string;
  getUrl: (url: string) => void;
}

export const InputFile: React.FC<InputFileProps> = ({ title, orgName, getUrl }) => {
  const [preview, setPreview] = useState<string | null>(null);

  const { data, isSuccess, mutate, isPending } = useUploadImage();

  // Handle File Change
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      mutate(file);
    } else {
      setPreview(null);
    }
  };

  useEffect(() => {
    if (isSuccess && !isPending) {
      getUrl(data?.data.data.url);
    }
  }, [data?.data.data.url, getUrl, isPending, isSuccess]);

  return (
    <div className="flex flex-col w-full items-start justify-between gap-2 text-primary-foreground30">
      <Label htmlFor="picture">{title}</Label>
      <div className="flex gap-4 w-full items-center border rounded-full p-1">
        <Input id="picture" type="file" className="w-full h-full border-none" accept="image/*" onChange={handleOnChange} />
        <Avatar size={10} avatarLink={preview ?? ""} avatarPlaceholder={abbreviateName(orgName)} />
      </div>
    </div>
  );
};
