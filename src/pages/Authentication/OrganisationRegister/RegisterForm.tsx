import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { FormFieldItem } from "@/components/FormField";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";

// Define form validation schema
const registerFormSchema = z.object({
  // Step 1
  password: z.string().min(8, "Password must be at least 8 characters").max(50, "Password must be less than 50 characters"),

  // Step 2
  orgName: z.string().min(2, "Organisation name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),

  // Step 3
  address: z.string().min(5, "Please enter a valid address"),

  // Step 4
  websiteUrl: z.string().url("Please enter a valid website URL").optional(),

  // Step 5
  logoUrl: z.string().url("Please enter a valid logo URL").optional(),

  // Step 6
  subscription: z.enum(["Free", "Premium", "Enterprise"])
});

type RegisterFormValues = z.infer<typeof registerFormSchema>;

// 添加 Props 接口
interface RegisterFormProps {
  onBackToLogin: () => void;
}

const RegisterForm: FC<RegisterFormProps> = ({ onBackToLogin }) => {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    mode: "onChange",
    defaultValues: {
      password: "",
      orgName: "",
      email: "",
      address: "",
      websiteUrl: "",
      logoUrl: "",
      subscription: "Free"
    }
  });

  const nextStep = () => {
    const currentFields = {
      1: ["password"],
      2: ["orgName"],
      3: ["address", "email"],
      4: ["websiteUrl"],
      5: ["logoUrl"],
      6: ["subscription"]
    }[step];

    // Validate fields for current step
    form.trigger(currentFields as any).then(isValid => {
      if (isValid) {
        setDirection(1);
        setStep(prev => Math.min(prev + 1, 6));
      }
    });
  };

  const prevStep = () => {
    setDirection(-1);
    setStep(prev => Math.max(prev - 1, 1));
  };

  const onSubmit = async (data: RegisterFormValues) => {
    // TODO: Call API to register
    console.log("Form submitted:", data);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <Card className="p-6">
        <div className="min-h-[400px] flex flex-col items-center justify-center text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold">YOU'RE REGISTERED WITH US</h1>
            <p className="text-sm text-muted-foreground">Your organisation account has been created successfully.</p>
          </div>

          <div className="w-full space-y-4">
            <Button onClick={() => (window.location.href = "/dashboard")} className="w-full h-11 bg-black text-white hover:bg-gray-800">
              Go to Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <div className="space-y-4 pt-6">
              <p className="text-sm font-medium">Or</p>

              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full h-11 justify-between hover:bg-gray-50"
                  onClick={() => {
                    /* TODO: Add functionality */
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span>Send Money</span>
                  </div>
                  <ArrowRight className="h-4 w-4" />
                </Button>

                <Button
                  variant="outline"
                  className="w-full h-11 justify-between hover:bg-gray-50"
                  onClick={() => {
                    /* TODO: Add functionality */
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span>Manage Settings</span>
                  </div>
                  <ArrowRight className="h-4 w-4" />
                </Button>

                <Button
                  variant="outline"
                  className="w-full h-11 justify-between hover:bg-gray-50"
                  onClick={() => {
                    /* TODO: Add functionality */
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span>View Profile</span>
                  </div>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="flex flex-col items-center w-full"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full sm:max-w-[460px] space-y-8 motion-preset-fade motion-duration-2000 motion-delay-500">
          {/* <div className="space-y-2 px-8">
            <h1 className="text-4xl font-semibold text-center">Register Now</h1>
            <p className="text-sm text-muted-foreground text-center">Please complete all steps below to continue.</p>
            <p className="text-sm text-muted-foreground text-center">Step {step} of 6</p>
          </div> */}

          <div className="min-h-[400px] relative px-8">
            {/* 把返回按钮移到 AnimatePresence 外面 */}
            {step > 1 && (
              <Button
                type="button"
                onClick={prevStep}
                variant="ghost"
                size="icon"
                className="absolute -left-16 w-10 h-10 rounded-full border hover:bg-gray-100 z-10"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}

            <AnimatePresence initial={false} mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                initial={{ x: direction > 0 ? 200 : -200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction < 0 ? 200 : -200, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute inset-0 flex flex-col"
              >
                {step === 1 && (
                  <div className="relative space-y-6">
                    <div className="space-y-2 text-center relative">
                      <div className="flex items-center justify-center">
                        <h1 className="text-2xl font-semibold">Let's secure your account first</h1>
                      </div>
                      <p className="text-sm text-muted-foreground">Don't worry, you can change your password anytime later</p>
                    </div>

                    <div className="space-y-4">
                      <FormFieldItem fieldControl={form.control} name="password" label="Password" type="password" placeholder="Enter your password" />

                      <div className="flex justify-end">
                        <Button
                          type="button"
                          onClick={nextStep}
                          variant="ghost"
                          size="icon"
                          className="w-12 h-12 rounded-full bg-[#046FFB] hover:bg-blue-700 text-white"
                        >
                          <ArrowRight className="h-6 w-6" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="relative space-y-6">
                    <div className="space-y-2 text-center relative">
                      <div className="flex items-center justify-center">
                        <h1 className="text-2xl font-semibold whitespace-nowrap">How should we call your organisation?</h1>
                      </div>
                      <p className="text-sm text-muted-foreground">Tell us about your company so we can personalize your experience</p>
                    </div>

                    <div className="space-y-4">
                      <FormFieldItem fieldControl={form.control} name="orgName" label="Organisation Name" placeholder="Enter organisation name" />

                      <div className="flex justify-end">
                        <Button
                          type="button"
                          onClick={nextStep}
                          variant="ghost"
                          size="icon"
                          className="w-12 h-12 rounded-full bg-black hover:bg-gray-800 text-white"
                        >
                          <ArrowRight className="h-6 w-6" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="relative space-y-6">
                    <div className="space-y-2 text-center relative">
                      <div className="flex items-center justify-center">
                        <h1 className="text-2xl font-semibold">How do we get in touch?</h1>
                      </div>
                      <p className="text-sm text-muted-foreground">Leave us your details and we'll reach out within 24 hours!</p>
                    </div>

                    <div className="space-y-4">
                      <FormFieldItem fieldControl={form.control} name="address" label="Address" placeholder="Enter address" />

                      <FormFieldItem fieldControl={form.control} name="email" label="Business Email" type="email" placeholder="Enter business email" />

                      <Button type="button" onClick={nextStep} className="w-full h-11 bg-black text-white hover:bg-gray-800">
                        Continue
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="relative space-y-6">
                    <div className="space-y-2 text-center relative">
                      <div className="flex items-center justify-center">
                        <h1 className="text-2xl font-semibold">Where can we find you online?</h1>
                      </div>
                      <p className="text-sm text-muted-foreground">Share your website so others can learn more about you</p>
                    </div>

                    <div className="space-y-4">
                      <FormFieldItem fieldControl={form.control} name="websiteUrl" label="Website URL" type="url" placeholder="Enter website URL" />

                      <Button type="button" onClick={nextStep} className="w-full h-11 bg-black text-white hover:bg-gray-800">
                        Continue
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {step === 5 && (
                  <div className="relative space-y-6">
                    <div className="space-y-2 text-center relative">
                      <div className="flex items-center justify-center">
                        <h1 className="text-2xl font-semibold">Let's make your profile stand out</h1>
                      </div>
                      <p className="text-sm text-muted-foreground">Add your logo to help others recognize your brand</p>
                    </div>

                    <div className="space-y-4">
                      <FormFieldItem fieldControl={form.control} name="logoUrl" label="Logo URL" type="url" placeholder="Enter logo URL" />

                      <Button type="button" onClick={nextStep} className="w-full h-11 bg-black text-white hover:bg-gray-800">
                        Continue
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {step === 6 && (
                  <div className="relative space-y-6">
                    <div className="space-y-2 text-center relative">
                      <div className="flex items-center justify-center">
                        <h1 className="text-2xl font-semibold">Almost there! Choose your plan</h1>
                      </div>
                      <p className="text-sm text-muted-foreground">Pick the best option that suits your needs</p>
                    </div>

                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="subscription"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subscription Plan</FormLabel>
                            <FormControl>
                              <select
                                {...field}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                <option value="Free">Free</option>
                                <option value="Premium">Premium</option>
                                <option value="Enterprise">Enterprise</option>
                              </select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit" className="w-full h-11 bg-black text-white hover:bg-gray-800">
                        Submit
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center space-x-2">
            <span className="text-sm text-muted-foreground">Already have an account?</span>
            <button type="button" onClick={onBackToLogin} className="text-blue-600 hover:text-blue-700 text-sm">
              Back to Login
            </button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
};

export default RegisterForm;
