import { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import Avatar from "@/components/Avatar";
import { FormFieldItem } from "@/components/FormField";
import { abbreviateName } from "@/utils/formatters";
import { Form } from "../ui/form";
import { ProfileInfo } from "@/types";

const userProfileInfoFormSchema = z.object({
  avatarUrl: z.string().optional(),
  name: z
    .string()
    .min(2, {
      message: "User name must be at least 2 characters."
    })
    .max(50, {
      message: "User name must not exceed 50 characters." // Restrains max length
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

const avatarAlt = "@InnovateFoundation";

const ProfileDialog: React.FC<{ children: ReactNode; profile: ProfileInfo }> = ({ children, profile }) => {
  const userProfileInfoForm = useForm<z.infer<typeof userProfileInfoFormSchema>>({
    resolver: zodResolver(userProfileInfoFormSchema),
    mode: "onChange",
    defaultValues: {
      avatarUrl: profile.avatarUrl ?? "",
      name: profile.name ?? "",
      email: profile.email ?? "",
      phone: profile.phone ?? ""
    }
  });

  const handleUserProfileInfoSubmit = (data: z.infer<typeof userProfileInfoFormSchema>) => {
    console.log("User Profile Info Submitted: ", data);
    // TODO: Perform actions such as sending the data to the server
  };

  const getUploadedUrl = async (url: string) => {
    console.log("url", url);
    console.log("isDirty", userProfileInfoForm.formState.isDirty);
    await userProfileInfoForm.setValue("avatarUrl", url, { shouldDirty: true });
    console.log("isDirty", userProfileInfoForm.formState.isDirty);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="p-0 max-w-[425px] rounded-md overflow-hidden"
        onEscapeKeyDown={e => e.preventDefault()}
        onPointerDown={e => e.preventDefault()}
        onInteractOutside={e => e.preventDefault()}
      >
        <Form {...userProfileInfoForm}>
          <div className="h-14 bg-accent">
            <Avatar
              className="absolute top-6 left-8"
              avatarLink={userProfileInfoForm.watch("avatarUrl") ?? ""}
              avatarAlt={avatarAlt}
              avatarPlaceholder={abbreviateName(userProfileInfoForm.watch("name"))}
              size={14}
              outline={true}
              clickable={true}
              getUploadedUrl={getUploadedUrl}
            />
          </div>
          <div className="p-8 pt-6">
            <DialogHeader>
              <div className="flex-col flex items-start">
                <DialogTitle className="truncate max-w-20">{userProfileInfoForm.watch("name")}</DialogTitle>
                <DialogDescription className="truncate max-w-40">{userProfileInfoForm.watch("email")}</DialogDescription>
              </div>
            </DialogHeader>
            <Separator className="my-4" />
            <div className="grid gap-4 ">
              <FormFieldItem fieldControl={userProfileInfoForm.control} name="name" label="Name" placeholder="John Doe" />
              <FormFieldItem fieldControl={userProfileInfoForm.control} name="email" label="Email" placeholder="johndoe@example.com" />
              <FormFieldItem fieldControl={userProfileInfoForm.control} name="phone" label="Phone" placeholder="+61 400 123 456" />
            </div>
            <Separator className="my-4" />
            <DialogFooter>
              <div className="flex gap-4 justify-end">
                <Button onClick={userProfileInfoForm.handleSubmit(handleUserProfileInfoSubmit)}>Save changes</Button>
              </div>
            </DialogFooter>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDialog;
