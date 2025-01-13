import { useRef, useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AppAvatar from "@/components/AppAvatar";
import AppFormField from "@/components/AppFormField";
import { OrganisationFormType, OrganisationStatus } from "@/types";
import { abbreviateName } from "@/utils/formatters";
import FormWrapper from "./FormWrapper";

const data = {
  orgName: "JR Academy",
  email: "admin@jracademy.com.au",
  logoUrl: "https://github.com/shadcn.png",
  websiteUrl: "https://jiangren.com.au/",

  address: {
    street: "123 Main Street",
    suburb: "Sydney",
    state: "NSW",
    postcode: "2000",
    country: "Australia"
  },

  subscription: "free",
  status: "pending"
};

const AppInviteeProfileForm = () => {
  const [formData, setFormData] = useState<OrganisationFormType>({
    orgName: data.orgName,
    logoUrl: data.logoUrl,
    websiteUrl: data.websiteUrl,
    address: {
      street: data.address?.street,
      suburb: data.address?.suburb,
      state: data.address?.state,
      postcode: data.address?.postcode,
      country: data.address?.country
    },
    email: data.email,
    subscription: data.subscription,
    status: data.status as OrganisationStatus
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

  return (
    <>
      <div className="h-16 bg-accent relative">
        <div className="absolute top-12 left-8 flex gap-3 items-center">
          <AppAvatar avatarLink={"https://github.com/shadcn.png"} size={20} avatarAlt={"avatarAlt"} avaterPlaceholder={"AC"} outline={true} />
          <div className="flex flex-col">
            <p className="text-lg leading-none font-bold">JR Academy</p>
            <p className="text-xs">https://jiangren.com.au/</p>
          </div>
        </div>
      </div>
      <div className="h-20"></div>
      <div className="flex flex-col gap-4">
        <FormWrapper formTitle={"Company Information"}>
          <div className="flex gap-4 w-full">
            <AppFormField id={"name"} label={"Name"} value={formData.orgName} onChange={e => handleInputChange("orgName", e.target.value)} />
            <AppFormField id={"email"} type={"email"} label={"Email"} value={formData.email ?? ""} onChange={e => handleInputChange("email", e.target.value)} />
          </div>
          <AppFormField
            id={"websiteUrl"}
            label={"Website Url"}
            value={formData.websiteUrl ?? ""}
            onChange={e => handleInputChange("websiteUrl", e.target.value)}
          />
          <div className="flex flex-col items-start gap-1">
            <Label htmlFor="logoUrl" className="text-right text-sm">
              Logo Image
            </Label>
            <div className="flex gap-4 items-center ">
              <AppAvatar avatarLink={formData.logoUrl ?? ""} avatarAlt={avatarAlt} avaterPlaceholder={abbreviateName(formData.orgName)} />
              <Input className="flex-1" id="logoUrl" type="file" onChange={handleUploadChange} ref={fileInputRef} />
            </div>
          </div>
        </FormWrapper>
        <FormWrapper formTitle={"Address"}>
          <div className="flex gap-4 w-full">
            <AppFormField id={"country"} label={"Country"} value={formData.address?.country} onChange={e => handleInputChange("country", e.target.value)} />
            <AppFormField id={"state"} label={"State"} value={formData.address?.state} onChange={e => handleInputChange("state", e.target.value)} />
          </div>
          <div className="flex gap-4 w-full">
            <AppFormField id={"suburb"} label={"Suburb"} value={formData.address?.suburb} onChange={e => handleInputChange("suburb", e.target.value)} />
            <AppFormField
              id={"postcode"}
              type={"number"}
              label={"Postcode"}
              value={formData.address?.postcode}
              onChange={e => handleInputChange("postcode", e.target.value)}
            />
          </div>
          <AppFormField id={"street"} label={"Street"} value={formData.address?.street} onChange={e => handleInputChange("street", e.target.value)} />
        </FormWrapper>
        <FormWrapper formTitle={"Account Information"}>
          <div className="flex gap-4 w-full">
            <AppFormField id={"subscription"} label={"Subscription"} value={formData.subscription ?? ""} />
            <AppFormField id={"status"} label={"status"} value={formData.status ?? ""} />
          </div>
        </FormWrapper>
      </div>
    </>
  );
};
export default AppInviteeProfileForm;
