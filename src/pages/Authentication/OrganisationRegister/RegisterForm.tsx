import { FC, useState, useEffect } from "react";
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
  // Step 1: basic details
  orgName: z.string().min(2, "Organisation name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),

  // Step 2: address information
  address: z.object({
    street: z.string().min(2).optional(),
    suburb: z.string().min(2).optional(),

    state: z.string().min(2).optional(),
    postcode: z
      .string()
      .regex(/^\d{4}$/)
      .optional(),
    country: z.string().min(2).optional()
  }),

  // Step 3: security information
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")

    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/,
      "Password must contain at least one uppercase letter, lowercase letter, number and special character"
    ),

  // Step 4: optional information
  websiteUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  logoUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  subscription: z.enum(["Free", "Premium", "Enterprise"]).default("Free"),

  // Admin Info
  adminName: z.string().min(2, "Admin name must be at least 2 characters"),
  adminEmail: z.string().email("Please enter a valid email address"),

  verificationCode: z.string().length(6, "Verification code must be 6 digits").optional()
});

type RegisterFormValues = z.infer<typeof registerFormSchema>;

// add props interface
interface RegisterFormProps {
  onBackToLogin: () => void;
}

interface DraftData extends Partial<RegisterFormValues> {
  lastStep: number;
  updatedAt: string;
}

const steps = [
  { title: "Basic Details", section: "Organisation Info", step: 1 },
  { title: "Address", section: "Organisation Info", step: 2 },
  { title: "Brand", section: "Organisation Info", step: 3 },
  { title: "Security", section: "Admin Info", step: 4 },
  { title: "Subscription", section: "Admin Info", step: 5 },
  { title: "Admin Details", section: "Admin Info", step: 6 },
  { title: "Verification", section: "Admin Info", step: 7 }
];

// 临时模拟函数
const createOrganisation = async (data: any) => {
  console.log("Creating organisation:", data);
  return { id: "123" };
};

const sendVerificationEmail = async (email: string) => {
  console.log("Sending verification email to:", email);
  return Promise.resolve();
};

const resendVerificationCode = async (email: string) => {
  console.log("Resending verification code to:", email);
  return Promise.resolve();
};

const RegisterForm: FC<RegisterFormProps> = ({ onBackToLogin }) => {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showDraftPrompt, setShowDraftPrompt] = useState(false);
  const [draftKey] = useState(`register_draft_${Date.now()}`);
  const [countdown, setCountdown] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    mode: "onChange",
    defaultValues: {
      password: "",
      orgName: "",
      email: "",
      address: {
        street: "",
        suburb: "",
        state: "",
        postcode: "",
        country: ""
      },
      websiteUrl: "",
      logoUrl: "",
      subscription: "Free",
      adminName: "",
      adminEmail: "",
      verificationCode: ""
    }
  });

  const handleStepClick = async (targetStep: number) => {
    if (targetStep === step) return;

    if (targetStep > step) {
      if (step === 6 && targetStep === 7) {
        const data = form.getValues();
        try {
          // create organisation record
          await createOrganisation({
            org_name: data.orgName,
            email: data.email,
            website_url: data.websiteUrl,
            logo_url: data.logoUrl,
            address: data.address,
            subscription: data.subscription,
            status: "pending"
          });
          await sendVerificationEmail(data.email);
          setCountdown(60); // set initial countdown
        } catch (error) {
          console.error(error);
          return;
        }
      } else {
        // normal validation for other steps
        for (let i = step; i < targetStep; i++) {
          const currentFields = {
            1: ["orgName", "email"],
            2: ["address"],
            3: ["websiteUrl", "logoUrl"],
            4: ["password"],
            5: ["subscription"],
            6: ["adminName", "adminEmail"],
            7: ["verificationCode"]
          }[i];

          const isValid = await form.trigger(currentFields as any);
          if (!isValid) return;
        }
      }
    }

    setDirection(targetStep > step ? 1 : -1);
    setStep(targetStep);
    saveDraft();
  };

  const onSubmit = async (data: RegisterFormValues) => {
    console.log("onSubmit called, current step:", step);

    // validate different fields based on current step
    const currentFields = {
      1: ["orgName", "email"],
      2: ["address"],
      3: ["websiteUrl", "logoUrl"],
      4: ["password"],
      5: ["subscription"],
      6: ["adminName", "adminEmail"],
      7: ["verificationCode"]
    }[step];

    const isValid = await form.trigger(currentFields as any);
    console.log("Current step validation result:", isValid);

    if (!isValid) {
      console.log("Validation errors:", form.formState.errors);
      return;
    }

    try {
      if (step === 6) {
        setIsLoading(true);

        // 模拟 API 调用延迟
        await new Promise(resolve => setTimeout(resolve, 1000));

        console.log("Form submitted:", data);

        // 直接设置步骤为 7
        setStep(7);
        setCountdown(60);
      } else if (step === 7) {
        // 验证码验证逻辑
        if (data.verificationCode === "123456") {
          localStorage.removeItem(draftKey);
          setIsSuccess(true);
        } else {
          setError("Invalid verification code");
        }

        /* TODO: backend integration version
        try {
          await verifyCode({
            email: data.email,

            code: data.verificationCode
          });
          localStorage.removeItem(draftKey);
          setIsSuccess(true);
        } catch (error) {
          setError('Invalid verification code');
        }
        */
      }
    } catch (error) {
      console.error("Error in onSubmit:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const saveDraft = () => {
    const formData = form.getValues();
    const draft: DraftData = {
      ...formData,
      lastStep: step,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(draftKey, JSON.stringify(draft));
  };

  useEffect(() => {
    const savedDraft = localStorage.getItem(draftKey);
    if (savedDraft) {
      const draft = JSON.parse(savedDraft);
      form.reset(draft);
      setStep(draft.lastStep || 1);
    }
  }, [draftKey, form]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

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
      {showDraftPrompt && (
        <div className="mb-4 p-4 bg-blue-50 rounded-md">
          <p className="text-sm text-blue-800">You have an unfinished registration. Would you like to continue where you left off?</p>
          <div className="mt-2 space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const savedDraft = JSON.parse(localStorage.getItem(draftKey)!);
                form.reset(savedDraft);
                setStep(savedDraft.lastStep || 1);
                setShowDraftPrompt(false);
              }}
            >
              Continue
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                localStorage.removeItem(draftKey);
                setShowDraftPrompt(false);
              }}
            >
              Start Over
            </Button>
          </div>
        </div>
      )}

      <Form {...form}>
        <form
          onSubmit={async e => {
            e.preventDefault();
            const currentFields = {
              1: ["orgName", "email"],
              2: ["address"],
              3: ["websiteUrl", "logoUrl"],
              4: ["password"],
              5: ["subscription"],
              6: ["adminName", "adminEmail"],
              7: ["verificationCode"]
            }[step];

            const isValid = await form.trigger(currentFields as any);
            if (!isValid) {
              console.log("Form validation errors:", form.formState.errors);
              return;
            }

            form.handleSubmit(onSubmit)(e);
          }}
          className="space-y-6"
        >
          <div className="space-y-4 px-8">
            <h1 className="text-4xl font-semibold text-center">Register Now</h1>
            <p className="text-sm text-muted-foreground text-center">Please complete all steps below to continue.</p>

            <div className="flex items-center justify-center gap-4 mt-6">
              <div className={`flex items-center ${step <= 4 ? "text-blue-600" : "text-gray-400"}`}>
                <div
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mr-2 
                  ${step <= 4 ? "border-blue-600 bg-blue-50" : "border-gray-300"}`}
                >
                  1
                </div>
                <span className="text-sm font-medium">Organisation Info</span>
              </div>

              <div className="w-16 h-[2px] bg-gray-200" />

              <div className={`flex items-center ${step > 4 ? "text-blue-600" : "text-gray-400"}`}>
                <div
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mr-2
                  ${step > 4 ? "border-blue-600 bg-blue-50" : "border-gray-300"}`}
                >
                  2
                </div>
                <span className="text-sm font-medium">Admin Info</span>
              </div>
            </div>

            <div className="relative mt-8">
              {/* 进度条容器 */}
              <div className="flex gap-1 w-full">
                {steps.map((s, index) => {
                  const isCompleted = step > s.step;
                  const isCurrent = step === s.step;
                  const isClickable = step >= s.step - 1;

                  return (
                    <div
                      key={s.step}
                      className={`relative flex-1 ${isClickable ? "cursor-pointer" : "cursor-not-allowed"}`}
                      onClick={() => (isClickable ? handleStepClick(s.step) : null)}
                    >
                      {/* background bar */}
                      <div
                        className={`
                        h-2 rounded-full w-full
                        ${
                          index === 0
                            ? "bg-gradient-to-r from-gray-100 to-gray-200"
                            : index === steps.length - 1
                              ? "bg-gradient-to-r from-gray-200 to-gray-100"
                              : "bg-gray-200"
                        }
                      `}
                      />

                      {/* The active progress bar */}
                      {(isCompleted || isCurrent) && (
                        <div
                          className={`
                            absolute top-0 left-0 h-2 rounded-full
                            transition-all duration-500 ease-out
                            ${isCompleted ? "w-full" : isCurrent ? "w-1/2" : "w-0"}
                            ${
                              index === 0
                                ? "bg-gradient-to-r from-[#E8B6F5] to-[#A2CBFB]"
                                : index === 1
                                  ? "bg-gradient-to-r from-[#A2CBFB] to-[#A2CBFB]"
                                  : index === 2
                                    ? "bg-gradient-to-r from-[#A2CBFB] to-[#A2CBFB]"
                                    : index === 3
                                      ? "bg-gradient-to-r from-[#A2CBFB] to-[#A2CBFB]"
                                      : index === 4
                                        ? "bg-gradient-to-r from-[#A2CBFB] to-[#A2CBFB]"
                                        : "bg-gradient-to-r from-[#A2CBFB] to-[#E8B6F5]"
                            }
                          `}
                        />
                      )}

                      {/* Add hover effect */}
                      <div
                        className={`
                        absolute top-0 left-0 w-full h-2 rounded-full
                        transition-opacity duration-200
                        hover:bg-gray-300/20
                      `}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="min-h-[400px] relative px-8">
            {step > 1 && (
              <Button
                type="button"
                onClick={() => handleStepClick(step - 1)}
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
                        <h1 className="text-2xl font-semibold">Organisation Info (1/4): Basic Details</h1>
                      </div>
                      <p className="text-sm text-muted-foreground">Tell us about your company so we can personalize your experience</p>
                    </div>

                    <div className="space-y-4">
                      <FormFieldItem fieldControl={form.control} name="orgName" label="Organisation Name" placeholder="Enter organisation name" />

                      <FormFieldItem fieldControl={form.control} name="email" label="Business Email" type="email" placeholder="Enter business email" />

                      <Button type="button" onClick={() => handleStepClick(step + 1)} className="w-full h-11 bg-black text-white hover:bg-gray-800">
                        Continue
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="relative space-y-6">
                    <div className="space-y-2 text-center relative">
                      <div className="flex items-center justify-center">
                        <h1 className="text-2xl font-semibold">Organisation Info (2/4): Address</h1>
                      </div>
                      <p className="text-sm text-muted-foreground">Let us know where your organisation is located</p>
                    </div>

                    <div className="space-y-4">
                      <FormFieldItem fieldControl={form.control} name="address.street" label="Street" placeholder="Enter street address" />

                      {/* Suburb and State in the same row */}
                      <div className="grid grid-cols-2 gap-4">
                        <FormFieldItem fieldControl={form.control} name="address.suburb" label="Suburb" placeholder="Enter suburb" />

                        <FormFieldItem fieldControl={form.control} name="address.state" label="State" placeholder="Enter state" />
                      </div>

                      {/* Postcode and Country in the same row */}
                      <div className="grid grid-cols-2 gap-4">
                        <FormFieldItem fieldControl={form.control} name="address.postcode" label="Postcode" placeholder="Enter postcode" />

                        <FormFieldItem fieldControl={form.control} name="address.country" label="Country" placeholder="Enter country" />
                      </div>

                      <Button type="button" onClick={() => handleStepClick(step + 1)} className="w-full h-11 bg-black text-white hover:bg-gray-800">
                        Continue
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="relative space-y-6">
                    <div className="space-y-2 text-center relative">
                      <div className="flex items-center justify-center">
                        <h1 className="text-2xl font-semibold">Organisation Info (3/4): Website</h1>
                      </div>
                      <p className="text-sm text-muted-foreground">Share your online presence with others</p>
                    </div>

                    <div className="space-y-4">
                      <FormFieldItem fieldControl={form.control} name="websiteUrl" label="Website URL" type="url" placeholder="Enter website URL" />

                      <FormFieldItem fieldControl={form.control} name="logoUrl" label="Logo URL" type="url" placeholder="Enter logo URL" />

                      <Button type="button" onClick={() => handleStepClick(step + 1)} className="w-full h-11 bg-black text-white hover:bg-gray-800">
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
                        <h1 className="text-2xl font-semibold">Admin Info (1/2): Security</h1>
                      </div>
                      <p className="text-sm text-muted-foreground">Set up your admin account password</p>
                    </div>

                    <div className="space-y-4">
                      <FormFieldItem fieldControl={form.control} name="password" label="Password" type="password" placeholder="Enter your password" />

                      <Button type="button" onClick={() => handleStepClick(step + 1)} className="w-full h-11 bg-black text-white hover:bg-gray-800">
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
                        <h1 className="text-2xl font-semibold">Admin Info (2/3): Subscription</h1>
                      </div>
                      <p className="text-sm text-muted-foreground">Choose the plan that best suits your needs</p>
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

                      <Button type="button" onClick={() => handleStepClick(step + 1)} className="w-full h-11 bg-black text-white hover:bg-gray-800">
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
                        <h1 className="text-2xl font-semibold">Admin Info (3/3): Details</h1>
                      </div>
                      <p className="text-sm text-muted-foreground">Set up your admin account information</p>
                    </div>

                    <div className="space-y-4">
                      <FormFieldItem fieldControl={form.control} name="adminName" label="Admin Name" placeholder="Enter admin name" />

                      <FormFieldItem fieldControl={form.control} name="adminEmail" label="Admin Email" type="email" placeholder="Enter admin email" />

                      <Button
                        type="button"
                        onClick={() => handleStepClick(7)}
                        disabled={isLoading}
                        className="w-full h-11 bg-black text-white hover:bg-gray-800"
                      >
                        {isLoading ? (
                          <>
                            Submitting...
                            <span className="ml-2 animate-spin">⚪</span>
                          </>
                        ) : (
                          <>
                            Submit
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                )}

                {step === 7 && (
                  <div className="relative space-y-6">
                    <div className="space-y-2 text-center relative">
                      <div className="flex items-center justify-center">
                        <h1 className="text-2xl font-semibold">Admin Info (3/3): Verification</h1>
                      </div>
                      <p className="text-sm text-muted-foreground">We've sent a verification code to your email</p>
                    </div>

                    <div className="space-y-4">
                      <FormFieldItem fieldControl={form.control} name="verificationCode" label="Verification Code" placeholder="Enter 6-digit code" />

                      <Button type="submit" className="w-full h-11 bg-black text-white hover:bg-gray-800">
                        Verify & Continue
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>

                      <Button
                        type="button"
                        variant="ghost"
                        disabled={countdown > 0}
                        onClick={() => {
                          // TODO: Connect to backend API - resendVerificationCode
                          // POST /api/resend-verification
                          // Request body: {
                          //   email: string
                          // }
                          const email = form.getValues().email;
                          resendVerificationCode(email);
                          setCountdown(60);
                        }}
                        className="w-full text-sm"
                      >
                        {countdown > 0 ? `Resend code in ${countdown}s` : "Resend verification code"}
                      </Button>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center space-x-2 pb-6">
            <span className="text-sm text-muted-foreground">Already have an account?</span>
            <button type="button" onClick={onBackToLogin} className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Back to Login
            </button>
          </div>

          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
        </form>
      </Form>
    </motion.div>
  );
};

export default RegisterForm;
