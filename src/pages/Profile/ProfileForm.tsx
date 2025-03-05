import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Badge } from "@/components/ui/badge";
import { Form } from "@/components/ui/form";
import Avatar from "@/components/Avatar";
import FormWrapper, { SaveButton } from "@/components/FormWrapper.tsx";
import { FormFieldItem } from "@/components/FormField";
import { useUpdateProfile } from "@/hooks/profiles/useUpdateProfile";
import { Profile } from "@/types";
import { abbreviateName } from "@/utils/formatters";
import { useState } from "react";
import { useUserStore } from "@/store";

const avatarUrlSchema = z.object({ avatarUrl: z.string().optional() });
type FormName = "profile" | "avatarUrl" | null;

const profileInfoFormSchema = z.object({
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
  disabled?: boolean;
  userProfileDetail: Profile;
}
const ProfileForm: React.FC<ProfileFormProps> = ({ userProfileDetail, disabled }) => {
  const [handleFormName, setHandleFormName] = useState<FormName>(null);
  const { setUserProfile, userProfile } = useUserStore();
  const avatarUrlForm = useForm<z.infer<typeof avatarUrlSchema>>({
    resolver: zodResolver(avatarUrlSchema),
    mode: "onChange",
    defaultValues: {
      avatarUrl: userProfileDetail.avatarUrl ?? ""
    }
  });

  const profileInfoForm = useForm<z.infer<typeof profileInfoFormSchema>>({
    resolver: zodResolver(profileInfoFormSchema),
    mode: "onChange",
    defaultValues: {
      name: userProfileDetail.name ?? "",
      email: userProfileDetail.email ?? "",
      phone: userProfileDetail.phone ?? ""
    }
  });

  const avatarAlt = "@InnovateFoundation";

  const handleSuccess = () => {
    if (avatarUrlForm.formState.isDirty) {
      //update state
      if (userProfileDetail.id === userProfile?.id) {
        setUserProfile({ ...userProfile, ...avatarUrlForm.getValues() });
      }
      avatarUrlForm.reset(avatarUrlForm.getValues());
    }
    if (profileInfoForm.formState.isDirty) {
      //update state
      if (userProfileDetail.id === userProfile?.id) {
        setUserProfile({ ...userProfile, ...profileInfoForm.getValues() });
      }
      profileInfoForm.reset(profileInfoForm.getValues());
    }
    setTimeout(() => {
      setHandleFormName(null);
    }, 3000);
  };

  const handleError = () => {
    if (avatarUrlForm.formState.isDirty) {
      avatarUrlForm.reset();
    }
    if (profileInfoForm.formState.isDirty) {
      profileInfoForm.reset();
    }
    setTimeout(() => {
      setHandleFormName(null);
    }, 3000);
  };

  const mutation = useUpdateProfile({ handleSuccess, handleError });

  const handleProfileInfoSubmit = (data: z.infer<typeof profileInfoFormSchema>) => {
    console.log("User Info Submitted: ", data);
    setHandleFormName("profile");
    mutation.mutate({ id: userProfileDetail.id!, bodyData: { ...data } });
  };

  const handleAvatarUrlSubmit = (data: z.infer<typeof avatarUrlSchema>) => {
    console.log("avatarUrl Info Submitted: ", data);
    setHandleFormName("avatarUrl");
    mutation.mutate({ id: userProfileDetail.id!, bodyData: { avatarUrl: data.avatarUrl } });
  };

  const getUploadedUrl = async (url: string) => {
    console.log("url", url);
    console.log("isDirty", avatarUrlForm.formState.isDirty);
    await avatarUrlForm.setValue("avatarUrl", url, { shouldDirty: true });
    console.log("isDirty", avatarUrlForm.formState.isDirty);
  };

  return (
    <div className="w-full flex flex-col gap-4 mt-4 justify-center">
      <div className="grid grid-cols-1 bg-muted/50 rounded-lg p-6">
        <Form {...avatarUrlForm}>
          <div className="flex justify-between">
            <div className="flex gap-4 items-center">
              <Avatar
                avatarLink={avatarUrlForm.watch("avatarUrl")!}
                size={20}
                avatarAlt={avatarAlt}
                avatarPlaceholder={abbreviateName(profileInfoForm.watch("name"))}
                outline={true}
                clickable={true}
                getUploadedUrl={getUploadedUrl}
              />
              <div className="flex flex-col">
                <p className="text-lg leading-none font-bold capitalize">{profileInfoForm.watch("name")}</p>
                <div className="flex gap-2 mt-2">
                  <Badge
                    variant={"secondary"}
                    className="lowercase p-0 px-2 rounded-full font-medium text-xs text-secondary-foregroundGreen bg-secondary-green"
                  >
                    {userProfileDetail.roleCode}
                  </Badge>
                </div>
              </div>
            </div>
            <SaveButton
              disabled={!avatarUrlForm.formState.isDirty}
              isPending={handleFormName === "avatarUrl" && mutation.isPending}
              isSuccess={handleFormName === "avatarUrl" && !avatarUrlForm.formState.isDirty && mutation.isSuccess}
              isError={handleFormName === "avatarUrl" && !avatarUrlForm.formState.isDirty && mutation.isError}
              onSave={disabled ? undefined : avatarUrlForm.handleSubmit(handleAvatarUrlSubmit)}
            />
          </div>
        </Form>
      </div>
      <div className="flex flex-col gap-4">
        <FormWrapper
          disabled={!profileInfoForm.formState.isDirty}
          isPending={handleFormName === "profile" && mutation.isPending}
          isSuccess={handleFormName === "profile" && !profileInfoForm.formState.isDirty && mutation.isSuccess}
          isError={handleFormName === "profile" && !profileInfoForm.formState.isDirty && mutation.isError}
          formTitle={"Personal Information"}
          onSave={disabled ? undefined : profileInfoForm.handleSubmit(handleProfileInfoSubmit)}
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
