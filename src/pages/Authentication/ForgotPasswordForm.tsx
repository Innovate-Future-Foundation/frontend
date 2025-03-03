import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FormFieldItem } from "@/components/FormField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForgotPassword } from "@/hooks/auth/useForgotPassword";
import { Loader2 } from "lucide-react";
import EmailSendAnimation from "./EmailSendAnimation";

const forgotPasswordSchema = z.object({
  email: z.string().email({
    message: "Invalid email format."
  })
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordForm: React.FC = () => {
  const [isDirty, setIsDirty] = useState(false);
  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onSubmit",
    defaultValues: {
      email: ""
    }
  });
  const { setFocus } = form;

  const handleSuccess = () => {
    setIsDirty(true);
  };

  const { mutate, isPending, isSuccess } = useForgotPassword({ handleSuccess });

  const onSubmit = async (data: ForgotPasswordValues) => {
    console.log("Sending reset password email to:", data.email);
    mutate({ email: data.email });
  };

  useEffect(() => {
    setFocus("email");
  }, [setFocus]);

  return (
    <div className="h-[calc(100vh-5rem)] min-h-[640px] flex flex-col items-center pt-[15vh] px-6 overflow-hidden relative">
      <div className="w-full max-w-[460px] 2xl:max-w-[600px]">
        {isDirty ? (
          <div className="w-full max-w-[460px] 2xl:max-w-[600px] flex flex-col items-center justify-center ">
            <EmailSendAnimation handleButtonClick={form.handleSubmit(onSubmit)} isSuccess={isSuccess} />
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="sm:max-w-[460px] w-full space-y-10">
              <div className="space-y-2">
                <h1 className="text-4xl font-semibold text-left">Forgot password?</h1>
                <p className="text-sm text-muted-foreground text-left">No worries, we'll send you reset instructions.</p>
              </div>

              <div className="space-y-4">
                <FormFieldItem fieldControl={form.control} name="email" label="Email" placeholder="Enter your email" />
              </div>

              <Button size={"xl"} type="submit" className="w-full">
                {isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : "Send Reset Password Email"}
              </Button>
            </form>
          </Form>
        )}
        <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-muted-foreground">
          <Link className="font-bold text-secondary-foreground hover:text-secondary-foreground/80" to={"/auth"}>
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
