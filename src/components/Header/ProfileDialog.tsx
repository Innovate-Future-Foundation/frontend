import { ReactNode, useRef, useState } from "react";

import Avatar from "@/components/Avatar";
import AppFormField from "@/components/FormField";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { abbreviateName, ellipticalString } from "@/utils/formatters";
import { Profile } from "@/types/profile";

const data = {
  profileId: "123e4567-e89b-12d3-a456-426614174000",
  orgId: "654e7890-f12c-34a5-b678-921345678901",
  roleId: "987e6543-f21c-45d6-c789-234567890123",
  invitedBy: "321e7654-f45d-67a8-e987-345678901234",
  supervisedBy: "111e2222-c33d-44b5-d678-123456789012",
  name: "John Doe",
  email: "johndoe@example.com",
  phone: "+61 400 123 456",
  avatarLink: "https://github.com/davidmiller.png",
  isActive: true,
  createdAt: "2023-12-01T12:34:56Z",
  updatedAt: "2023-12-10T15:20:30Z"
};

const ProfileDialog: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<Profile>({
    name: data.name ?? "",
    email: data.email ?? "",
    phone: data.phone ?? "",
    avatarLink: data.avatarLink ?? ""
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

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="p-0 max-w-[425px] rounded-md overflow-hidden">
        <div className="h-14 bg-accent">
          <Avatar
            className="absolute top-6 left-8"
            avatarLink={formData.avatarLink ?? ""}
            avatarAlt={avatarAlt}
            avatarPlaceholder={abbreviateName(formData.name!)}
            size={14}
            outline={true}
          />
        </div>
        <div className="p-8 pt-6">
          <DialogHeader>
            <div className="flex-col flex items-start">
              <DialogTitle>{ellipticalString(formData.name!, 20)}</DialogTitle>
              <DialogDescription>{ellipticalString(formData.email!, 20)}</DialogDescription>
            </div>
          </DialogHeader>
          <Separator className="my-4" />
          <div className="grid gap-4 ">
            <AppFormField id={"name"} label={"Name"} value={formData.name!} onChange={e => handleInputChange("profileName", e.target.value)} />
            <AppFormField
              id={"email"}
              type={"email"}
              label={"Email"}
              value={formData.email!}
              onChange={e => handleInputChange("profileEmail", e.target.value)}
            />
            <AppFormField id={"phone"} label={"Phone"} value={formData.phone!} onChange={e => handleInputChange("profilePhone", e.target.value)} />

            <div className="flex flex-col items-start gap-1">
              <Label htmlFor="profile-photo" className="text-right text-sm">
                Profile photo
              </Label>
              <div className="flex gap-4 items-center">
                <Avatar avatarLink={formData.avatarLink!} avatarAlt={avatarAlt} avatarPlaceholder={abbreviateName(formData.name!)} />
                <Input id="profile-photo" type="file" onChange={handleUploadChange} ref={fileInputRef} />
              </div>
            </div>
          </div>
          <Separator className="my-4" />
          <DialogFooter>
            <div className="flex gap-4 justify-end">
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
