import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const loginFormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address."
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters."
  })
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: ""
    },
    mode: "onChange"
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log("Login data:", data);
    // TODO: handle login logic
  };

  return (
    <Card className="w-[400px] shadow-none border-none">
      <CardHeader className="space-y-5 mb-8">
        <CardTitle className="text-3xl text-center">Login Now</CardTitle>
        <p className="text-sm text-muted-foreground text-center">Please enter the details below to continue</p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="h-[70px]">
                  <FormControl>
                    <Input placeholder="Email address" type="email" className="px-4 py-6" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="h-[70px]">
                  <FormControl>
                    <div className="relative">
                      <Input placeholder="Password" type={showPassword ? "text" : "password"} className="px-4 py-6" {...field} />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <Eye className="h-4 w-4 text-muted-foreground" /> : <EyeOff className="h-4 w-4 text-muted-foreground" />}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button variant="link" className="text-sm text-blue-600 hover:text-blue-800 px-0" type="button">
                Forgot Password?
              </Button>
            </div>

            <Button type="submit" className="w-full py-6">
              LOGIN
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Button variant="link" className="text-blue-600 hover:text-blue-800 p-0" type="button">
                Register
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
