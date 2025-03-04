import { Button, buttonVariants } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Loader2, SquareArrowOutUpRight } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormFieldItem } from "@/components/FormField";
import { Form } from "@/components/ui/form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { useCallback, useEffect, useState } from "react";
import { ACFormFieldItem } from "./ACFormFieldItem";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RoleType } from "@/types";
import { mapRoleTypeToString } from "@/constants/mapper";
import { useInviteUser } from "@/hooks/auth/useInviteUser";
import SuccessAnimation from "@/components/SuccessAnimation";
import { useParent } from "@/hooks/profiles/useParent";
export interface FormInputs {
  name: string;
  email: string;
  parentEmail?: string;
}

interface props {
  roleInvited: RoleType;
  children: React.ReactNode;
}

const isVowel = (word: string) => /^[aeiouAEIOU]/.test(word);

const InviteModal: React.FC<props> = ({ roleInvited, children }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [isParentEmailShowToggle, setIsParentEmailShowToggle] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");
  const inviteUserFormSchema = (roleInvited: string) => {
    return z.object({
      avatarLink: z.string().optional(),
      name: z
        .string()
        .min(2, {
          message: "User name must be at least 2 characters."
        })
        .max(50, {
          message: "User name must not exceed 50 characters."
        }),
      email: z
        .string()
        .email({
          message: "Invalid email format."
        })
        .min(1, "Email is required"),
      parentEmail: roleInvited === "student" && isParentEmailShowToggle ? z.string().min(1, "Email is required") : z.string().optional()
    });
  };

  const inviteUserForm = useForm<FormInputs>({
    resolver: zodResolver(inviteUserFormSchema(roleInvited)),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      parentEmail: ""
    }
  });

  useEffect(() => {
    (async () => {
      await inviteUserForm.trigger();
      inviteUserForm.clearErrors();
    })();
  }, [inviteUserForm, isParentEmailShowToggle]);

  const { reset } = inviteUserForm;

  const { mutate, isPending, isSuccess, isError } = useInviteUser({});
  const { parentsData, isSuccessGetParents } = useParent({ limit: 8, searchKey: inputValue, filters: { isActive: true, isConfirmed: true } });

  const handleFormSubmit: SubmitHandler<FormInputs> = useCallback(
    async data => {
      if (roleInvited !== "Student" || !isParentEmailShowToggle) {
        delete data.parentEmail;
      }
      console.log("data", data);
      mutate({ ...data, roleCode: roleInvited });
    },
    [isParentEmailShowToggle, mutate, roleInvited]
  );

  const onCheckedChangeHandler = (checked: boolean) => {
    setIsParentEmailShowToggle(checked);
    inviteUserForm.setValue("parentEmail", "");
  };

  const onOpenChangeHandler = (open: boolean) => {
    reset();
    setIsParentEmailShowToggle(false);
    setIsDialogOpen(open);
  };

  useEffect(() => {
    console.log("isSuccess:", isSuccess);
    console.log("isError:", isError);
    if (isSuccess || isError) {
      setTimeout(() => {
        setIsAlertDialogOpen(false);
        setIsDialogOpen(false);
        reset();
        setIsParentEmailShowToggle(false);
      }, 1500);
    }
  }, [isSuccess, isError, reset]);

  return (
    <Dialog open={isDialogOpen} onOpenChange={onOpenChangeHandler}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[425px] sm:min-w-[450px] p-8">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Invite {isVowel(mapRoleTypeToString[roleInvited]) ? "an" : "a"} {mapRoleTypeToString[roleInvited]}
          </DialogTitle>
          <DialogDescription>Send an invite link to a team member. The role can be changed later.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 mt-4">
          <Form {...inviteUserForm}>
            <FormFieldItem fieldControl={inviteUserForm.control} name="name" label="Name" placeholder="example: John Doe" h-10 />
            <FormFieldItem fieldControl={inviteUserForm.control} name="email" type="email" label="Email" placeholder="example: johndoe@example.com" h-10 />
            {roleInvited === "Student" && (
              <>
                <div className="flex items-center space-x-2">
                  <Switch id="parentEmailSwitch" checked={isParentEmailShowToggle} onCheckedChange={onCheckedChangeHandler} />
                  <Label htmlFor="parentEmailSwitch">Parent Email</Label>
                </div>
                {isParentEmailShowToggle && (
                  <ACFormFieldItem
                    name="parentEmail"
                    type="email"
                    data={parentsData}
                    isSuccess={isSuccessGetParents}
                    label="Parent Email"
                    placeholder="example: johndoe@example.com"
                    createSchema={inviteUserForm}
                    disabled={false}
                    setInputValue={setInputValue}
                    inputValue={inputValue}
                  />
                )}
              </>
            )}
          </Form>
        </div>
        <DialogDescription className="-mt-3">
          Learn more about
          <Button variant="link" className="inline-flex items-center p-0 ml-1">
            <span>Team Member Roles</span>
            <SquareArrowOutUpRight />
          </Button>
        </DialogDescription>
        <DialogFooter>
          <AlertDialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
            <AlertDialogTrigger asChild>
              <Button size={"lg"} className="w-full rounded-full" disabled={!inviteUserForm.formState.isValid}>
                Invite
              </Button>
            </AlertDialogTrigger>
            {isSuccess ? (
              <AlertDialogContent className="max-w-[380px] text-justify">
                <SuccessAnimation title={"Invite Email Sent!"} subtitle="Please check your email to accept invitation." />
              </AlertDialogContent>
            ) : (
              <AlertDialogContent className="max-w-[380px] text-justify">
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>This action cannot be undone. This will permanently add the user specified into the server.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className={buttonVariants({ variant: "destructive" })}>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={inviteUserForm.handleSubmit(handleFormSubmit)}>
                    {isPending ? <Loader2 className="animate-spin" /> : "Confirm"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            )}
          </AlertDialog>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InviteModal;
