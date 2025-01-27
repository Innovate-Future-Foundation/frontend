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
import { useToast } from "@/hooks/use-toast";

export interface FormInputs {
  name: string;
  email: string;
  parentEmail?: string;
}

interface props {
  roleInvited: "teacher" | "admin" | "student" | "parent";
  onSubmit: (data: FormInputs) => Promise<void>;
  children: React.ReactNode;
}

const isVowel = (word: string) => /^[aeiouAEIOU]/.test(word);

const InviteModal: React.FC<props> = ({ roleInvited, onSubmit, children }) => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [isParentEmailShowToggle, setIsParentEmailShowToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
      parentEmail:
        roleInvited === "student" && isParentEmailShowToggle
          ? z.string().email("Invalid parent email").min(1, "Parent email is required")
          : z.string().optional()
    });
  };

  const inviteUserForm = useForm<FormInputs>({
    resolver: zodResolver(inviteUserFormSchema(roleInvited)),
    mode: "onChange",
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

  const handleFormSubmit: SubmitHandler<FormInputs> = useCallback(
    async data => {
      setIsLoading(true);
      setIsAlertDialogOpen(false);
      if (roleInvited !== "student" || !isParentEmailShowToggle) {
        delete data.parentEmail;
      }
      try {
        await onSubmit(data);
        toast({
          title: "Successfully",
          description: "You have invited a team member."
        });
      } catch (error) {
        toast({
          title: "Invite failed ",
          description: `${error}`
        });
      } finally {
        reset();
        setIsLoading(false);
        setIsParentEmailShowToggle(false);
      }
    },
    [roleInvited, isParentEmailShowToggle, onSubmit, toast, reset]
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

  return (
    <Dialog open={isDialogOpen} onOpenChange={onOpenChangeHandler}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Invite {isVowel(roleInvited) ? "an" : "a"} {roleInvited}
          </DialogTitle>
          <DialogDescription>Send an invite link to a team member. The role can be changed later.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Form {...inviteUserForm}>
            <FormFieldItem disabled={isLoading} fieldControl={inviteUserForm.control} name="name" label="Name" placeholder="example: John Doe" />
            <FormFieldItem
              disabled={isLoading}
              fieldControl={inviteUserForm.control}
              name="email"
              type="email"
              label="Email"
              placeholder="example: johndoe@example.com"
            />
            {roleInvited === "student" && (
              <>
                <div className="flex items-center space-x-2">
                  <Switch disabled={isLoading} id="parentEmailSwitch" checked={isParentEmailShowToggle} onCheckedChange={onCheckedChangeHandler} />
                  <Label htmlFor="parentEmailSwitch">Parent Email</Label>
                </div>
                {isParentEmailShowToggle && (
                  <ACFormFieldItem
                    disabled={isLoading}
                    name="parentEmail"
                    type="email"
                    label="Parent Email"
                    placeholder="example: johndoe@example.com"
                    createSchema={inviteUserForm}
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
              <Button disabled={!inviteUserForm.formState.isValid || isLoading}>{isLoading ? <Loader2 className="animate-spin" /> : "Invite"}</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>This action cannot be undone. This will permanently add the user specified into the server.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className={buttonVariants({ variant: "destructive" })}>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={inviteUserForm.handleSubmit(handleFormSubmit)}>Confirm</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InviteModal;
