import { ReactNode, useRef, useState } from "react";

import AppAvatar from "@/components/AppAvatar";
import AppFormField from "@/components/AppFormField";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { abbreviateName, ellipticalString } from "@/utils/formatters";

type ProfileFormType = {
  profileName: string;
  profileEmail: string;
  profilePhone: string;
  profileAvatarLink: string;
};

const ProfileDialog: React.FC<{ children: ReactNode }> = ({ children }) => {
  // TODO: Will replace this data when get data from server
  const [formData, setFormData] = useState<ProfileFormType>({
    profileName: "Qingyan Yang",
    profileEmail: "qian@example.com",
    profilePhone: "+61 459101029",
    profileAvatarLink: "https://github.com/shadcn.png"
  });
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const avatarAlt = "@InnovateFoundation";

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleUploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        // @ts-expect-error: 'files' might be null, but it's handled elsewhere
        profileAvatarLink: URL.createObjectURL(e.target.files[0])
      }));
    }
    // TODO: Upload the image to the server
  };

  const handleSubmit = () => {
    console.log("Form Data Submitted: ", formData);
    // TODO: Perform actions such as sending the data to the server
  };

  const handleCancel = () => {
    // TODO: Will replace this data when get data from server
    setFormData({
      profileName: "Qingyan Yang",
      profileEmail: "qian@example.com",
      profilePhone: "+61 459101029",
      profileAvatarLink: "https://github.com/shadcn.png"
    });
    // Clear file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset file input to "no file selected"
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="p-0 max-w-[425px] rounded-md overflow-hidden">
        <div className="h-14 bg-accent">
          <AppAvatar
            className=" absolute top-6 left-8"
            avatarLink={formData.profileAvatarLink}
            avatarAlt={avatarAlt}
            avaterPlaceholder={abbreviateName(formData.profileName)}
            size={16}
            outline={true}
          />
        </div>
        <div className="p-8 pt-6">
          <DialogHeader>
            <div className="flex-col flex items-start">
              <DialogTitle>{ellipticalString(formData.profileName, 20)}</DialogTitle>
              <DialogDescription>{ellipticalString(formData.profileEmail, 20)}</DialogDescription>
            </div>
          </DialogHeader>
          <Separator className="my-4" />
          <div className="grid gap-4 ">
            <AppFormField id={"name"} label={"Name"} value={formData.profileName} onChange={e => handleInputChange("profileName", e.target.value)} />
            <AppFormField
              id={"email"}
              type={"email"}
              label={"Email"}
              value={formData.profileEmail}
              onChange={e => handleInputChange("profileEmail", e.target.value)}
            />
            <AppFormField id={"phone"} label={"Phone"} value={formData.profilePhone} onChange={e => handleInputChange("profilePhone", e.target.value)} />

            <div className="flex flex-col items-start gap-1">
              <Label htmlFor="profile-photo" className="text-right text-sm">
                Profile photo
              </Label>
              <div className="flex gap-4 items-center">
                <AppAvatar avatarLink={formData.profileAvatarLink} avatarAlt={avatarAlt} avaterPlaceholder={abbreviateName(formData.profileName)} />
                <Input id="profile-photo" type="file" onChange={handleUploadChange} ref={fileInputRef} />
              </div>
            </div>
          </div>

          <Separator className="my-4" />
          <DialogFooter>
            <div className="flex gap-4 justify-end">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="submit" onClick={handleSubmit}>
                Save changes
              </Button>
            </div>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDialog;
