import SuccessAnimation from "@/components/SuccessAnimation";
import { ResetPasswordCredential } from "@/types/auth";
import { useEffect } from "react";
import { FadeLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { useResetPassword } from "@/hooks/auth/useResetPassword";
import { FormFieldItem } from "@/components/FormField";
import { Button } from "@/components/ui/button"; // ✅ Corrected import
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorAnimation from "@/components/ErrorAnimation";
import { Form } from "@/components/ui/form";

const resetPasswordFormSchema = z
  .object({
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{6,20}$/,
        "Password must be 6-20 characters and contain at least one uppercase letter, lowercase letter, number and special character"
      ),
    doublePassword: z.string()
  })
  .refine(data => data.password === data.doublePassword, {
    message: "Passwords must match",
    path: ["doublePassword"]
  });

type ResetPasswordFormValues = z.infer<typeof resetPasswordFormSchema>;

const ResetPassword = () => {
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(window.location.search);
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordFormSchema),
    mode: "onSubmit",
    defaultValues: {
      password: "",
      doublePassword: ""
    }
  });

  const { setFocus, getValues, handleSubmit } = form;

  const handleSuccess = () => {
    setTimeout(() => {
      navigate("/auth/signup");
    }, 5000);
  };

  const { error, isPending, isError, isSuccess, mutate } = useResetPassword({ handleSuccess });

  useEffect(() => {
    setFocus("password");
  }, [setFocus]);

  const onSubmit = () => {
    if (!token || !email) {
      alert("Invalid or expired reset link.");
      return;
    }
    const newPassword = getValues("password");
    mutate({ newPassword, email, resetPasswordToken: token } as ResetPasswordCredential);
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      {isPending ? (
        <FadeLoader />
      ) : isSuccess ? (
        <SuccessAnimation title="Reset Password Successfully!" subtitle="Redirecting to signup page..." />
      ) : isError ? (
        <ErrorAnimation title="Reset Password Failed!" subTitle={error.message} />
      ) : (
        <div className="flex flex-col items-center justify-center w-full max-w-96">
          <img src="/assets/images/logo1.png" alt="logo" className="w-20 h-20 mb-12" />
          <Form {...form}>
            <div className="flex flex-col w-full w-max-[640px] gap-6">
              <FormFieldItem type="password" fieldControl={form.control} name="password" label="New Password" placeholder="Enter your new password" />
              <FormFieldItem
                type="password"
                fieldControl={form.control}
                name="doublePassword"
                label="Confirm Password"
                placeholder="Re-enter your new password"
              />
              <Button size={"xl"} onClick={handleSubmit(onSubmit)} type="submit" className="w-full flex items-center justify-center">
                {isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : "Reset Password"}
              </Button>
            </div>
          </Form>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
