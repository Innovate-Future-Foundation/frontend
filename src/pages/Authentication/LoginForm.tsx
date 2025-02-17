import { useForm } from "react-hook-form";
import { FormFieldItem } from "@/components/FormField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

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

// add props interface
interface LoginFormProps {
  onRegisterClick: () => void;
  onForgotPasswordClick: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onRegisterClick, onForgotPasswordClick }) => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="sm:max-w-[460px] w-full space-y-6 motion-preset-fade motion-duration-2000 motion-delay-500">
        <div className="space-y-4">
          <h1 className="text-4xl font-semibold text-center">Login Now</h1>
          <p className="text-sm text-muted-foreground text-center">Please enter the details below to continue.</p>
        </div>

        <div className="space-y-4">
          <FormFieldItem fieldControl={form.control} name="email" label="Email" placeholder="Enter your email" />

          <FormFieldItem type="password" fieldControl={form.control} name="password" label="Password" placeholder="Enter your password" />

          <div className="text-right">
            <button type="button" onClick={onForgotPasswordClick} className="text-sm text-blue-600 hover:text-blue-700">
              Forgot Password?
            </button>
          </div>
        </div>

        <Button type="submit" className="w-full">
          LOGIN
        </Button>
        <div className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <button type="button" onClick={onRegisterClick} className="text-secondary-foreground hover:text-secondary-foreground/80">
            Register
          </button>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
