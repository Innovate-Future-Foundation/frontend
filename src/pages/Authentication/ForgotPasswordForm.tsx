import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FormFieldItem } from "@/components/FormField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const forgotPasswordSchema = z.object({
  email: z.string().email({
    message: "Invalid email format."
  })
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordForm: React.FC = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onBlur",
    defaultValues: {
      email: ""
    }
  });

  const onSubmit = async (data: ForgotPasswordValues) => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      // TODO: to implement the reset password logic here
      console.log("Sending reset password email to:", data.email);

      // simulate the API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      setIsSuccess(true);
      setCountdown(60);

      // start the countdown
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      console.error("Failed to send reset password email:", error);
      // TODO: to show the error message
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        key="forgot-password"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="h-full flex items-start pt-[25vh] justify-center lg:ml-[35%] px-6"
      >
        <div className="w-full max-w-[460px]">
          <div className="min-h-[400px] flex flex-col items-center justify-center text-center space-y-8">
            {/* Green Check Animation */}
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 bg-green-100 rounded-full animate-scale-up" />
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  className="w-16 h-16 text-green-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path className="animate-check" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              {/* Floating Dots */}
              <div className="absolute top-0 right-0 w-3 h-3 bg-blue-300 rounded-full animate-float-1" />
              <div className="absolute bottom-0 left-0 w-3 h-3 bg-yellow-300 rounded-full animate-float-2" />
              <div className="absolute top-1/2 left-0 w-2 h-2 bg-green-300 rounded-full animate-float-3" />
              <div className="absolute bottom-1/4 right-0 w-2 h-2 bg-purple-300 rounded-full animate-float-4" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-semibold">Reset Instructions Sent!</h1>
              <p className="text-sm text-muted-foreground">We've sent password reset instructions to your email.</p>
              <p className="text-sm text-muted-foreground mt-2">Please check your inbox and follow the instructions.</p>
            </div>

            <div className="w-full space-y-4">
              <Button
                type="button"
                variant="ghost"
                disabled={countdown > 0}
                onClick={() => {
                  const email = form.getValues().email;
                  // TODO: Implement resend logic
                  console.log("Resending to:", email);
                  setCountdown(60);
                }}
                className="w-full text-sm"
              >
                {countdown > 0 ? `Resend instructions in ${countdown}s` : "Didn't receive the email? Resend"}
              </Button>
            </div>

            <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
              <Link
                className="flex items-center justify-center gap-2 text-sm text-secondary-foreground hover:text-secondary-foreground/80 w-full"
                to={"/auth/login"}
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      key="forgot-password"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full flex items-start pt-[25vh] justify-center lg:ml-[35%] px-6"
    >
      <div className="w-full max-w-[460px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="sm:max-w-[460px] w-full space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold text-center">Forgot password?</h1>
              <p className="text-sm text-muted-foreground text-center">No worries, we'll send you reset instructions.</p>
            </div>

            <div className="space-y-4">
              <FormFieldItem fieldControl={form.control} name="email" label="Email" placeholder="Enter your email" />
            </div>

            <Button type="submit" className="w-full bg-[#046FFB] hover:bg-blue-700" disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sending...
                </div>
              ) : (
                "Reset password"
              )}
            </Button>

            <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
              <Link
                className="flex items-center justify-center gap-2 text-sm text-secondary-foreground hover:text-secondary-foreground/80 w-full"
                to={"/auth/login"}
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Login
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </motion.div>
  );
};

export default ForgotPasswordForm;
