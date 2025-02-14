import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Badge } from "@/components/ui/badge";
import { Form } from "@/components/ui/form";
import Avatar from "@/components/Avatar";
import FormWrapper from "@/components/FormWrapper.tsx";
import { FormFieldItem } from "@/components/FormField";
import { useUpdateProfile } from "@/hooks/profiles/useUpdateProfile";
import { Profile } from "@/types";
import { abbreviateName } from "@/utils/formatters";
import { getColorStyleByIsActive } from "@/constants/mapper";
import clsx from "clsx";

const profileInfoFormSchema = z.object({
  avatarUrl: z
    .string()
    .optional()
    .refine(value => !value || /^https?:\/\/[^\s$.?#].[^\s]*$/i.test(value), {
      message: "Avatar URL must be a valid URL (e.g., https://example.com)."
    }),
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
    })
});

interface ProfileFormProps {
  userProfileDetail: Profile;
}
const ProfileForm: React.FC<ProfileFormProps> = ({ userProfileDetail }) => {
  const profileInfoForm = useForm<z.infer<typeof profileInfoFormSchema>>({
    resolver: zodResolver(profileInfoFormSchema),
    mode: "onChange",
    defaultValues: {
      avatarUrl: userProfileDetail.avatarUrl ?? "",
      name: userProfileDetail.name ?? "",
      email: userProfileDetail.email ?? "",
      phone: userProfileDetail.phone ?? ""
    }
  });

  const avatarAlt = "@InnovateFoundation";

  const handleSuccess = () => {
    if (profileInfoForm.formState.isDirty) {
      profileInfoForm.reset(profileInfoForm.getValues());
    }
  };

  const handleError = () => {
    if (profileInfoForm.formState.isDirty) {
      profileInfoForm.reset();
    }
  };

  const mutation = useUpdateProfile({ handleSuccess, handleError });

  const handleProfileInfoSubmit = (data: z.infer<typeof profileInfoFormSchema>) => {
    console.log("User Info Submitted: ", data);
    // TODO: Perform actions such as sending the data to the server
    mutation.mutate({ id: userProfileDetail.id!, bodyData: { ...data } });
  };

  return (
    <div className="w-full flex flex-col justify-center">
      <div className="h-32 bg-accent mt-4 rounded-md flex items-center pl-4">
        <div className="top-10 left-8 flex gap-3 items-end">
          <Avatar
            avatarLink={profileInfoForm.watch("avatarUrl")!}
            size={24}
            avatarAlt={avatarAlt}
            avatarPlaceholder={abbreviateName(profileInfoForm.watch("name"))}
            outline={true}
          />
          <div className="flex flex-col">
            <p className="text-lg leading-none font-bold capitalize">{profileInfoForm.watch("name")}</p>
            <p className="text-xs lowercase">{profileInfoForm.watch("email")}</p>
            <div className="flex gap-2 mt-2">
              <Badge
                variant={"secondary"}
                className={clsx(getColorStyleByIsActive.get(userProfileDetail.isActive ?? false), "lowercase p-0 px-2 rounded-full font-medium text-xs")}
              >
                {userProfileDetail.isActive ? "active" : "suspended"}
              </Badge>
              <Badge variant={"outline"} className="lowercase p-0 px-2 rounded-full font-medium text-xs">
                {userProfileDetail.organisation?.orgName}
              </Badge>
            </div>
          </div>
        </div>
      </div>
      <div className="h-4"></div>
      <div className="flex flex-col gap-4">
        <FormWrapper
          disabled={!profileInfoForm.formState.isDirty}
          isPending={mutation.isPending}
          isSuccess={!profileInfoForm.formState.isDirty && mutation.isSuccess}
          isError={!profileInfoForm.formState.isDirty && mutation.isError}
          formTitle={"Personal Information"}
          onSave={profileInfoForm.handleSubmit(handleProfileInfoSubmit)}
        >
          <Form {...profileInfoForm}>
            <div className="flex gap-4 w-full">
              <FormFieldItem fieldControl={profileInfoForm.control} name="name" label="Name" placeholder="Name" />
              <FormFieldItem fieldControl={profileInfoForm.control} name="email" label="Email" placeholder="Email" />
            </div>
            <FormFieldItem fieldControl={profileInfoForm.control} name="phone" label="Phone" placeholder="Phone Number" />
          </Form>
        </FormWrapper>
      </div>
    </div>
  );
};

export default ProfileForm;
