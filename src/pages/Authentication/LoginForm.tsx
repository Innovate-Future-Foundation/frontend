import { useForm } from "react-hook-form";
import { FormFieldItem } from "@/components/FormField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

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
    <motion.div
      key="login"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full flex items-start pt-[25vh] justify-center lg:ml-[35%] px-6"
    >
      <div className="w-full max-w-[460px]">
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
                <Link className="text-sm text-secondary-foreground hover:text-secondary-foreground/80" to={"/auth/forgot-password"}>
                  Forgot Password?
                </Link>
              </div>
            </div>

            <Button type="submit" className="w-full">
              LOGIN
            </Button>
            <div className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link className="text-secondary-foreground hover:text-secondary-foreground/80" to={"/auth/register"}>
                Register
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </motion.div>
  );
};

export default LoginForm;
