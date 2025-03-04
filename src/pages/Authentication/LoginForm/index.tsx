import { useForm } from "react-hook-form";
import { FormFieldItem } from "@/components/FormField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useLogin } from "@/hooks/auth/useLogin";
import { LoginCredential } from "@/types/auth";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

// setting up the validation schema
const loginFormSchema = z.object({
  email: z.string().email({
    message: "Invalid email format."
  }),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{6,20}$/,
      "Password must be 6-20 characters and contain at least one uppercase letter, lowercase letter, number and special character"
    )
});

// inferring the type from the schema
type LoginFormValues = z.infer<typeof loginFormSchema>;

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: ""
    }
  });
  const { setFocus, reset, formState, getValues } = form;

  const handleSuccess = () => {
    if (formState.isDirty) {
      reset(getValues());
    }
    login();
    navigate("/dashboard");
  };

  const mutation = useLogin({ handleSuccess });

  const onSubmit = (data: LoginFormValues) => {
    mutation.mutate(data as LoginCredential);
  };

  useEffect(() => {
    setFocus("email");
  }, [setFocus]);
  return (
    <div className="h-[calc(100vh-5rem)] min-h-[640px] flex flex-col items-center pt-[15vh] px-6 overflow-hidden relative">
      <div className="w-full max-w-[460px] 2xl:max-w-[600px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10 w-full">
            <div className="space-y-2">
              <h1 className="text-4xl font-semibold text-left">Sign In</h1>
              <p className="text-sm text-muted-foreground text-left">Welcome to IFA!</p>
            </div>

            <div className="space-y-4">
              <FormFieldItem fieldControl={form.control} name="email" label="Email" placeholder="Enter your email" />

              <FormFieldItem type="password" fieldControl={form.control} name="password" label="Password" placeholder="Enter your password" />

              <div className="text-right">
                <Link className="font-bold text-sm text-secondary-foreground hover:text-secondary-foreground/80" to={"/auth/forgot-password"}>
                  Forgot Password?
                </Link>
              </div>
            </div>
            <Button type="submit" className="w-full flex items-center justify-center" size={"xl"}>
              {mutation.isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : "Sign In"}
            </Button>
          </form>
        </Form>
        <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-muted-foreground">
          <span> Don't have an account? </span>
          <Link className="font-bold text-secondary-foreground hover:text-secondary-foreground/80" to={"/auth/signup"}>
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
