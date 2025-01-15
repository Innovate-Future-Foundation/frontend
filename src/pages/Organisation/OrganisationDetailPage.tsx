import { useState } from "react";

// import { Input } from "@/components/ui/input";
import Avatar from "@/components/Avatar";
import FormField from "@/components/FormField";
import { Organisation, OrganisationStatus } from "@/types";

import { Badge } from "@/components/ui/badge";
import FormWrapper from "@/components/FormWrapper.tsx";
import { ScrollList } from "@/components/ScrollList";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Button } from "@/components/ui/button";
// import { useForm } from "react-hook-form";

const orgProfileDetail = {
  orgId: "7c9e6679-7425-40de-944b-e07fc1f90ae7",
  orgName: "Acme Corporation",
  logoUrl: "https://github.com/shadcn.png",
  websiteUrl: "https://www.acmecorp.com",
  address: {
    street: "123 Main Street",
    suburb: "Sydney",
    state: "NSW",
    postcode: "2000",
    country: "Australia"
  },
  email: "info@acmecorp.com",
  subscription: "Premium",
  status: "pending",
  createdAt: "2023-12-10T12:34:56Z",
  updatedAt: "2023-12-06T22:20:00Z"
};

const OrganisationDetailPage = () => {
  // const schema = yup.object({
  //   name: yup.string().required(),
  //   email: yup.string().required(),
  //   websiteUrl: yup.string().required()
  // });

  // type FormData = {
  //   name: string;
  //   email: string;
  //   websiteUrl: string;
  // };

  // const form = useForm({
  //   resolver: yupResolver(schema),
  //   defaultValues: {
  //     name: "Acme Corporation"
  //   }
  // });

  const [formorgProfileDetail, setFormorgProfileDetail] = useState<Organisation>({
    orgName: orgProfileDetail.orgName,
    logoUrl: orgProfileDetail.logoUrl,
    websiteUrl: orgProfileDetail.websiteUrl,
    address: {
      street: orgProfileDetail.address?.street ?? "",
      suburb: orgProfileDetail.address?.suburb ?? "",
      state: orgProfileDetail.address?.state ?? "",
      postcode: orgProfileDetail.address?.postcode ?? "",
      country: orgProfileDetail.address?.country ?? ""
    },
    email: orgProfileDetail.email,
    subscription: orgProfileDetail.subscription,
    status: orgProfileDetail.status as OrganisationStatus
  });
  // const fileInputRef = useRef<HTMLInputElement | null>(null);
  // const avatarAlt = "@InnovateFoundation";

  const handleInputChange = (field: string, value: string) => {
    setFormorgProfileDetail(prev => ({ ...prev, [field]: value }));
  };

  // const handleUploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files[0]) {
  //     setFormorgProfileDetail(prev => ({
  //       ...prev,
  //       // @ts-expect-error: 'files' might be null, but it's handled elsewhere
  //       profileAvatarLink: URL.createObjectURL(e.target.files[0])
  //     }));
  //   }
  //   // TODO: Upload the image to the server
  // };

  // const handleSubmit = (data: FormData) => {
  //   console.log("Form Data Submitted: ", data);
  //   // TODO: Perform actions such as sending the data to the server
  // };

  return (
    <div className="w-full flex flex-col justify-center gap-4">
      <div className="h-16 bg-accent relative">
        <div className="absolute top-10 left-8 flex gap-3 items-end">
          <Avatar avatarLink={"https://github.com/shadcn.png"} size={24} avatarAlt={"avatarAlt"} avatarPlaceholder={"AC"} outline={true} />
          <div className="flex flex-col">
            <p className="text-lg leading-none font-bold">JR Academy</p>
            <p className="text-xs">https://jiangren.com.au/</p>
            <div className="flex gap-2 mt-2">
              <Badge variant={"secondary"} className="p-0 px-2 rounded-full font-light text-xs text-red-400 bg-red-100">
                {formorgProfileDetail.status}
              </Badge>
              <Badge variant={"outline"} className="p-0 px-2 rounded-full font-light text-xs text-red-400  border-red-200">
                {formorgProfileDetail.subscription}
              </Badge>
            </div>
          </div>
        </div>
      </div>
      <div className="h-24"></div>
      <div className="flex flex-col gap-4">
        <FormWrapper formTitle={"Company Information"}>
          <div className="flex gap-4 w-full">
            <FormField id={"name"} label={"Name"} value={formorgProfileDetail.orgName} onChange={e => handleInputChange("orgName", e.target.value)} />
            <FormField
              id={"email"}
              type={"email"}
              label={"Email"}
              value={formorgProfileDetail.email ?? ""}
              onChange={e => handleInputChange("email", e.target.value)}
            />
          </div>
          <FormField
            id={"websiteUrl"}
            label={"Website Url"}
            value={formorgProfileDetail.websiteUrl ?? ""}
            onChange={e => handleInputChange("websiteUrl", e.target.value)}
          />
          {/* <div className="flex flex-col items-start gap-1">
            <Label htmlFor="logoUrl" className="text-right text-sm">
              Logo Image
            </Label>
            <div className="flex gap-4 items-center ">
              <AppAvatar
                avatarLink={formorgProfileDetail.logoUrl ?? ""}
                avatarAlt={avatarAlt}
                avaterPlaceholder={abbreviateName(formorgProfileDetail.orgName)}
              />
              <Input className="flex-1" id="logoUrl" type="file" onChange={handleUploadChange} ref={fileInputRef} />
            </div>
          </div> */}
        </FormWrapper>

        {/* <Form {...form}>
          <h2 className="text-lg font-bold">Company Information</h2>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Company Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="websiteUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website Url</FormLabel>
                  <FormControl>
                    <Input placeholder="Website Url" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form> */}

        <FormWrapper formTitle={"Address"}>
          <div className="flex gap-4 w-full">
            <FormField
              id={"country"}
              label={"Country"}
              value={formorgProfileDetail.address?.country}
              onChange={e => handleInputChange("country", e.target.value)}
            />
            <FormField id={"state"} label={"State"} value={formorgProfileDetail.address?.state} onChange={e => handleInputChange("state", e.target.value)} />
          </div>
          <div className="flex gap-4 w-full">
            <FormField
              id={"suburb"}
              label={"Suburb"}
              value={formorgProfileDetail.address?.suburb}
              onChange={e => handleInputChange("suburb", e.target.value)}
            />
            <FormField
              id={"postcode"}
              type={"number"}
              label={"Postcode"}
              value={formorgProfileDetail.address?.postcode}
              onChange={e => handleInputChange("postcode", e.target.value)}
            />
          </div>
          <FormField id={"street"} label={"Street"} value={formorgProfileDetail.address?.street} onChange={e => handleInputChange("street", e.target.value)} />
        </FormWrapper>
      </div>
      <ScrollList />
    </div>
  );
};
export default OrganisationDetailPage;
