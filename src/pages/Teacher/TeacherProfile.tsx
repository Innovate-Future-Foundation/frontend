import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Badge } from "@/components/ui/badge";
import { Form } from "@/components/ui/form";
import Avatar from "@/components/Avatar";
import FormWrapper from "@/components/FormWrapper.tsx";
import { FormFieldItem } from "@/components/FormField";

const teacherProfileDetail = {
  profileId: "7c9e6679-7425-40de-944b-e07fc1f90ae7",
  org: {
    orgId: "7c9e6679-7425-40de-944b-e07fc1f90ae7",
    orgName: "Acme Corporation",
    logoUrl: "https://github.com/shadcn.png",
    websiteUrl: "https://www.acmecorp.com",
    address: null,
    email: "info@acmecorp.com",
    subscription: "Premium",
    status: "pending",
    createdAt: "2023-12-10T12:34:56Z",
    updatedAt: "2023-12-06T22:20:00Z"
  },
  roleName: "organisation teacher",
  invitedBy: {
    name: "Mary Johnson",
    email: "alice.Green@example.com",
    phone: null,
    avatarLink: "https://github.com/shadcn.png",
    status: "active"
  },
  name: "Marry Johnson",
  email: "alice.Green@example.com",
  phone: "123-456-7890",
  avatarLink: "https://github.com/shadcn.png",
  status: "active",
  createdAt: "2025-01-10T10:00:00Z",
  updatedAt: "2025-01-15T14:30:00Z"
};

const profileInfoFormSchema = z.object({
  avatarLink: z.string().optional(),
  name: z
    .string()
    .min(2, {
      message: "User name must be at least 2 characters."
    })
    .max(50, {
      message: "User name must not exceed 50 characters."
    }),
  email: z.string().email({
    message: "Invalid email format."
  }),
  phone: z
    .string()
    .optional()
    .refine(value => !value || /^\+61 45\d{7}$/.test(value), {
      message: "Phone number must start with +61 4 and be followed by 8 digits."
    }),
  websiteUrl: z
    .string()
    .optional()
    .refine(value => !value || /^https?:\/\/[^\s$.?#].[^\s]*$/i.test(value), {
      message: "Website URL must be a valid URL (e.g., https://example.com)."
    })
});

const TeacherProfile = () => {
  const profileInfoForm = useForm<z.infer<typeof profileInfoFormSchema>>({
    resolver: zodResolver(profileInfoFormSchema),
    mode: "onChange",
    defaultValues: {
      avatarLink: teacherProfileDetail.avatarLink,
      name: teacherProfileDetail.name,
      email: teacherProfileDetail.email,
      phone: teacherProfileDetail.phone
    }
  });

  const avatarAlt = "@InnovateFoundation";

  const handleProfileInfoSubmit = (data: z.infer<typeof profileInfoFormSchema>) => {
    console.log("User Info Submitted: ", data);
    // TODO: Perform actions such as sending the data to the server
  };

  return (
    <div className="w-full flex flex-col justify-center">
      <div className="h-40 bg-accent relative">
        <div className="absolute top-10 left-8 flex gap-3 items-end">
          <Avatar
            avatarLink={profileInfoForm.watch("avatarLink")!}
            size={24}
            avatarAlt={avatarAlt}
            avatarPlaceholder={profileInfoForm.watch("name")}
            outline={true}
          />
          <div className="flex flex-col">
            <p className="text-lg leading-none font-bold">{profileInfoForm.watch("name")}</p>
            <p className="text-xs">{profileInfoForm.watch("email")}</p>
            <div className="flex gap-2 mt-2">
              <Badge variant={"secondary"} className="p-0 px-2 rounded-full font-light text-xs text-red-400 bg-red-100">
                {teacherProfileDetail.status}
              </Badge>
              <Badge variant={"outline"} className="p-0 px-2 rounded-full font-light text-xs text-red-400  border-red-200">
                {teacherProfileDetail.org.orgName}
              </Badge>
            </div>
          </div>
        </div>
      </div>
      <div className="h-4"></div>
      <div className="flex flex-col gap-4">
        <FormWrapper formTitle={"Teacher Information"} onSave={profileInfoForm.handleSubmit(handleProfileInfoSubmit)}>
          <Form {...profileInfoForm}>
            <div className="flex gap-4 w-full">
              <FormFieldItem fieldControl={profileInfoForm.control} name="name" label="Name" placeholder="Teacher Name" />
              <FormFieldItem fieldControl={profileInfoForm.control} name="email" label="Email" placeholder="Email" />
            </div>
            <FormFieldItem fieldControl={profileInfoForm.control} name="phone" label="Phone" placeholder="Phone Number" />
          </Form>
        </FormWrapper>
      </div>
    </div>
  );
};

export default TeacherProfile;
