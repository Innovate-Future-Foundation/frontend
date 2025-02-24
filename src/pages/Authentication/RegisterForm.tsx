import { FC, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { FormFieldItem } from "@/components/FormField";
import { Form } from "@/components/ui/form";
import { Link } from "react-router-dom";

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
  onBackToLogin?: () => void;
}

interface DraftData extends Partial<RegisterFormValues> {
  lastStep: number;
  updatedAt: string;
}

const steps = [
  {
    step: 1,
    title: "Let's start with your organisation's basic information. This will help us get to know your business better."
  },
  {
    step: 2,
    title: "Where is your organisation located? This helps us provide location-specific services and support."
  },
  {
    step: 3,
    title: "Share your online presence with us. This helps establish your organisation's digital identity."
  },
  {
    step: 4,
    title: "Set up your admin account. This will be your primary access to manage your organisation."
  }
];

// temporary mock function
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

const RegisterForm: FC<RegisterFormProps> = () => {
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
      if (step === 5) {
        const data = form.getValues();
        try {
          setIsLoading(true);
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
          setIsSuccess(true); // set success status directly
          localStorage.removeItem(draftKey);
        } catch (error) {
          console.error(error);
          setError("Something went wrong. Please try again.");
          return;
        } finally {
          setIsLoading(false);
        }
      } else {
        // normal validation for other steps
        const currentFields = {
          1: ["orgName", "email"],
          2: ["address"],
          3: ["websiteUrl", "logoUrl"],
          4: ["adminName", "adminEmail", "password"],
          5: ["verificationCode"]
        }[step];

        const isValid = await form.trigger(currentFields as any);
        if (!isValid) return;
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
      4: ["adminName", "adminEmail", "password"],
      5: ["verificationCode"]
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

        // mock api call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        console.log("Form submitted:", data);

        // set step to 7
        setStep(7);
        setCountdown(60);
      } else if (step === 7) {
        // verification code validation logic
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
      <motion.div
        key="register"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, x: -200 }}
        className="h-full flex items-center pl-[20%] px-6"
      >
        <div className="w-full max-w-[460px]">
          <Card className="p-6">
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
                <h1 className="text-2xl font-semibold">Registration Complete!</h1>
                <p className="text-sm text-muted-foreground">Your organisation account has been created successfully.</p>
                <p className="text-sm text-muted-foreground mt-2">Please check your email to verify your account.</p>
              </div>

              <div className="w-full space-y-4">
                <Button
                  type="button"
                  variant="ghost"
                  disabled={countdown > 0}
                  onClick={() => {
                    const email = form.getValues().email;
                    resendVerificationCode(email);
                    setCountdown(60);
                  }}
                  className="w-full text-sm"
                >
                  {countdown > 0 ? `Resend verification email in ${countdown}s` : "Didn't receive the email? Resend"}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      key="register"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -200 }}
      className="h-full flex items-center pl-[20%] px-6"
    >
      <div className="w-full max-w-[460px]">
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
                  4: ["adminName", "adminEmail", "password"],
                  5: ["verificationCode"]
                }[step];

                const isValid = await form.trigger(currentFields as any);
                if (!isValid) {
                  console.log("Form validation errors:", form.formState.errors);
                  return;
                }

                form.handleSubmit(onSubmit)(e);
              }}
              className="w-full max-w-[600px]"
            >
              <div className="space-y-6 px-4">
                <div className="space-y-2">
                  <h1 className="text-2xl font-semibold mb-4">{step === 5 ? "" : step <= 3 ? "Organisation Info" : "Admin Info"}</h1>
                  <p className="text-sm text-muted-foreground">{steps.find(s => s.step === step)?.title}</p>
                </div>

                <div className="min-h-[400px] relative">
                  <AnimatePresence initial={false} mode="wait" custom={direction}>
                    <motion.div
                      key={step}
                      custom={direction}
                      initial={{ x: direction > 0 ? 200 : -200, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: direction < 0 ? 200 : -200, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="absolute inset-0"
                    >
                      {step === 1 && (
                        <div className="space-y-6">
                          <FormFieldItem fieldControl={form.control} name="orgName" label="Organisation Name" placeholder="Enter organisation name" />
                          <FormFieldItem fieldControl={form.control} name="email" label="Business Email" type="email" placeholder="Enter business email" />
                          <Button type="button" onClick={() => handleStepClick(step + 1)} className="w-full h-11 bg-[#046FFB] hover:bg-blue-700 text-white">
                            Continue
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      )}
                      {step === 2 && (
                        <div className="space-y-4">
                          <FormFieldItem fieldControl={form.control} name="address.street" label="Street" placeholder="Enter street address" />
                          <div className="grid grid-cols-2 gap-4">
                            <FormFieldItem fieldControl={form.control} name="address.suburb" label="Suburb" placeholder="Enter suburb" />
                            <FormFieldItem fieldControl={form.control} name="address.state" label="State" placeholder="Enter state" />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <FormFieldItem fieldControl={form.control} name="address.postcode" label="Postcode" placeholder="Enter postcode" />
                            <FormFieldItem fieldControl={form.control} name="address.country" label="Country" placeholder="Enter country" />
                          </div>
                          <Button type="button" onClick={() => handleStepClick(step + 1)} className="w-full h-11 bg-[#046FFB] hover:bg-blue-700 text-white">
                            Continue
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      )}
                      {step === 3 && (
                        <div className="space-y-4">
                          <FormFieldItem fieldControl={form.control} name="websiteUrl" label="Website URL" type="url" placeholder="Enter website URL" />
                          <FormFieldItem fieldControl={form.control} name="logoUrl" label="Logo URL" type="url" placeholder="Enter logo URL" />
                          <Button type="button" onClick={() => handleStepClick(step + 1)} className="w-full h-11 bg-[#046FFB] hover:bg-blue-700 text-white">
                            Continue
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      )}
                      {step === 4 && (
                        <div className="space-y-4">
                          <FormFieldItem fieldControl={form.control} name="adminName" label="Admin Name" placeholder="Enter admin name" />
                          <FormFieldItem fieldControl={form.control} name="adminEmail" label="Admin Email" type="email" placeholder="Enter admin email" />
                          <FormFieldItem fieldControl={form.control} name="password" label="Password" type="password" placeholder="Enter your password" />
                          <Button
                            type="button"
                            onClick={() => handleStepClick(5)}
                            disabled={isLoading}
                            className="w-full h-11 bg-[#046FFB] hover:bg-blue-700 text-white"
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
                      )}
                      {step === 5 && (
                        <div className="space-y-8 flex flex-col items-center">
                          {/* Success Animation */}
                          <div className="relative w-24 h-24">
                            {/* Circle Background */}
                            <div className="absolute inset-0 bg-emerald-100 rounded-full animate-scale-up" />

                            {/* Checkmark Animation */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <svg
                                className="w-12 h-12 transform animate-checkmark"
                                fill="none"
                                stroke="#10B981" // emerald-500 color
                                viewBox="0 0 24 24"
                                strokeWidth={3}
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            </div>

                            {/* Floating Dots */}
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-300 rounded-full animate-float-1" />
                            <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-emerald-200 rounded-full animate-float-2" />
                            <div className="absolute -top-1 -left-1 w-2 h-2 bg-emerald-400 rounded-full animate-float-3" />
                            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-emerald-300 rounded-full animate-float-4" />
                          </div>

                          {/* 其他内容保持不变 */}
                          <div className="space-y-2 text-center">
                            <h1 className="text-2xl font-semibold">Registration Complete!</h1>
                            <p className="text-sm text-muted-foreground">Your organisation account has been created successfully.</p>
                            <p className="text-sm text-muted-foreground mt-2">Please check your email to verify your account.</p>
                          </div>

                          {/* Resend Button */}
                          <div className="w-full">
                            <Button
                              type="button"
                              variant="ghost"
                              disabled={countdown > 0}
                              onClick={() => {
                                const email = form.getValues().email;
                                resendVerificationCode(email);
                                setCountdown(60);
                              }}
                              className="w-full text-sm"
                            >
                              {countdown > 0 ? `Resend verification email in ${countdown}s` : "Didn't receive the email? Resend"}
                            </Button>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                  <span>Already have an account?</span>
                  <Link className="text-sm text-secondary-foreground hover:text-secondary-foreground/80" to={"/auth/login"}>
                    Back to Login
                  </Link>
                </div>

                <div className="mt-4">
                  <div className="flex gap-1 w-full">
                    {steps.map(s => {
                      const isCompleted = step > s.step;
                      const isCurrent = step === s.step;
                      const isClickable = step >= s.step - 1;

                      return (
                        <div
                          key={s.step}
                          className={`relative flex-1 ${isClickable ? "cursor-pointer" : "cursor-not-allowed"}`}
                          onClick={() => (isClickable ? handleStepClick(s.step) : null)}
                        >
                          <div
                            className={`
                          h-2 rounded-full w-full bg-gray-100
                        `}
                          />

                          {(isCompleted || isCurrent) && (
                            <div
                              className={`
                            absolute top-0 left-0 h-2 rounded-full bg-[#046FFB]
                            transition-all duration-500 ease-out
                            ${isCompleted ? "w-full" : isCurrent ? "w-1/2" : "w-0"}
                          `}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {error && <div className="text-red-500 text-sm text-center">{error}</div>}
            </form>
          </Form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default RegisterForm;
