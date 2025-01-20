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

const userProfileData = {
  profileId: "123e4567-e89b-12d3-a456-426614174000",
  orgId: "654e7890-f12c-34a5-b678-921345678901",
  roleId: "987e6543-f21c-45d6-c789-234567890123",
  invitedBy: "321e7654-f45d-67a8-e987-345678901234",
  supervisedBy: "111e2222-c33d-44b5-d678-123456789012",
  name: "John Doe",
  email: "johndoe@example.com",
  phone: "+61 450123456",
  avatarLink: "https://github.com/davidmiller.png",
  isActive: true,
  createdAt: "2023-12-01T12:34:56Z",
  updatedAt: "2023-12-10T15:20:30Z"
};

const userProfileInfoFormSchema = z.object({
  avatarLink: z.string().optional(),
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

const ProfileDialog: React.FC<{ children: ReactNode }> = ({ children }) => {
  const userProfileInfoForm = useForm<z.infer<typeof userProfileInfoFormSchema>>({
    resolver: zodResolver(userProfileInfoFormSchema),
    mode: "onChange",
    defaultValues: {
      avatarLink: userProfileData.avatarLink,
      name: userProfileData.name,
      email: userProfileData.email,
      phone: userProfileData.phone
    }
  });

  const handleUserProfileInfoSubmit = (data: z.infer<typeof userProfileInfoFormSchema>) => {
    console.log("User Profile Info Submitted: ", data);
    // TODO: Perform actions such as sending the data to the server
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="p-0 max-w-[425px] rounded-md overflow-hidden">
        <div className="h-14 bg-accent">
          <Avatar
            className="absolute top-6 left-8"
            avatarLink={userProfileInfoForm.watch("avatarLink") ?? ""}
            avatarAlt={avatarAlt}
            avatarPlaceholder={abbreviateName(userProfileInfoForm.watch("name"))}
            size={14}
            outline={true}
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
            <Form {...userProfileInfoForm}>
              <FormFieldItem fieldControl={userProfileInfoForm.control} name="name" label="Name" placeholder="John Doe" />
              <FormFieldItem fieldControl={userProfileInfoForm.control} name="email" label="Email" placeholder="johndoe@example.com" />
              <FormFieldItem fieldControl={userProfileInfoForm.control} name="phone" label="Phone" placeholder="+61 400 123 456" />
            </Form>
          </div>
          <Separator className="my-4" />
          <DialogFooter>
            <div className="flex gap-4 justify-end">
              <Button onClick={userProfileInfoForm.handleSubmit(handleUserProfileInfoSubmit)}>Save changes</Button>
            </div>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDialog;
