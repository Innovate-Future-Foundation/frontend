import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";
import { FormFieldItem } from "@/components/FormField";
import { Form } from "@/components/ui/form";
import { Link, useNavigate } from "react-router-dom";
import { useRegister } from "@/hooks/auth/useRegister";
import { RegisterOrgWithAdminCredentials } from "@/types/auth";
import SendEmailSuccess from "./SendEmailSuccess";
import { InputFile } from "@/components/InputFile";

const signupFormSchema = z.object({
  orgName: z.string().min(2, "Organisation name must be at least 2 characters"),
  orgEmail: z.string().email("Email should be an email").optional().or(z.literal("")),
  address: z.object({
    street: z
      .string()
      .min(2, "Street must be at least 2 characters if provided")
      .max(255, "Street cannot exceed 255 characters if provided")
      .optional()
      .or(z.literal("")),
    suburb: z
      .string()
      .min(2, "Suburb must be at least 2 characters if provided")
      .max(255, "Suburb cannot exceed 255 characters if provided")
      .optional()
      .or(z.literal("")),
    state: z
      .string()
      .optional()
      .refine(val => !val || /^[A-Za-z ]+$/.test(val), {
        message: "State can only contain letters if provided"
      }),
    postcode: z
      .string()
      .optional()
      .refine(val => !val || /^\d{4}$/.test(val), {
        message: "Postcode must be 4 digits if provided"
      }),
    country: z
      .string()
      .min(2, "Country must be at least 2 characters if provided")
      .max(255, "Country cannot exceed 255 characters if provided")
      .optional()
      .or(z.literal(""))
  }),
  websiteUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  logoUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  userName: z.string().min(2, "Admin name must be at least 2 characters"),
  userEmail: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/, "Password must include uppercase, lowercase, number, and special character.")
});

const steps = [
  {
    step: 1,
    title: "Let's start with your organisation's basic information."
  },
  {
    step: 2,
    title: "Where is your organisation located?"
  },
  {
    step: 3,
    title: "Share your online presence with us."
  },
  {
    step: 4,
    title: "Set up your admin account."
  }
];

const formFields: Record<number, string[]> = {
  1: ["orgName", "orgEmail"],
  2: ["address"],
  3: ["websiteUrl", "logoUrl"],
  4: ["userName", "userEmail", "password"]
};

const RegisterForm: FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    mode: "onBlur",
    defaultValues: {
      orgName: "",
      orgEmail: "",
      address: {
        street: "",
        suburb: "",
        state: "",
        postcode: "",
        country: ""
      },
      websiteUrl: "",
      logoUrl: "",
      userName: "",
      userEmail: "",
      password: ""
    }
  });
  const { setFocus, reset, formState, getValues, getFieldState, trigger, handleSubmit, control } = form;
  const handleSuccess = () => {
    if (formState.isDirty) {
      reset(getValues());
    }
  };

  const mutation = useRegister({ handleSuccess });

  const onSubmit = (data: z.infer<typeof signupFormSchema>) => {
    console.log("data", data);
    mutation.mutate(data as RegisterOrgWithAdminCredentials);
  };

  const handleStepClick = async (targetStep: number) => {
    if (targetStep === currentStep) return;

    if (targetStep > currentStep) {
      if (currentStep === 4) {
        handleSubmit(onSubmit)();
        return;
      } else {
        const currentFields = formFields[currentStep];
        const isValid = await trigger(currentFields as any, { shouldFocus: true });
        if (!isValid) return;

        if (targetStep - currentStep > 1) {
          const sectionIsTouched = formFields[targetStep].some(field => getFieldState(field as keyof RegisterOrgWithAdminCredentials).isTouched === true);
          if (sectionIsTouched === true) {
            setDirection(1);
            setCurrentStep(targetStep);
            return;
          } else {
            return;
          }
        }
      }
    }
    setDirection(targetStep > currentStep ? 1 : -1);
    setCurrentStep(targetStep);
  };

  const handleResendVerificationEmail = () => {
    console.log("handleResendVerificationEmail...");
    //todo: call ResendVerificationEmail api
  };

  const handleGetUrl = async (url: string) => {
    await form.setValue("logoUrl", url, { shouldDirty: true });
  };

  useEffect(() => {
    if (currentStep === 1) {
      setTimeout(() => setFocus("orgName"), 400);
    } else if (currentStep === 2) {
      setTimeout(() => setFocus("address.street"), 400);
    } else if (currentStep === 3) {
      setTimeout(() => setFocus("websiteUrl"), 400);
    } else if (currentStep === 4) {
      setTimeout(() => setFocus("userName"), 400);
    }
  }, [currentStep, setFocus]);

  return (
    <div className="h-[calc(100vh-5rem)] min-h-[640px] flex flex-col items-center pt-[15vh] px-6 overflow-hidden relative">
      {mutation.isSuccess ? (
        <div className="w-full max-w-[460px] 2xl:max-w-[600px] flex flex-col items-center justify-center ">
          <SendEmailSuccess handleButtonClick={handleResendVerificationEmail} />
          <Button type="button" onClick={() => navigate("/")} className="w-full" size={"xl"}>
            Back to Home
          </Button>
        </div>
      ) : (
        <>
          <div className="w-full max-w-[460px] 2xl:max-w-[600px]">
            <Form {...form}>
              <div className="space-y-10 px-4">
                <div className="space-y-2">
                  <h1 className="text-4xl font-semibold text-left">{"Sign Up"}</h1>
                  <p className="text-sm text-muted-foreground text-left">{steps.find(s => s.step === currentStep)?.title}</p>
                </div>
                <AnimatePresence initial={false} mode="wait" custom={direction}>
                  <motion.div
                    key={currentStep}
                    custom={direction}
                    initial={{ x: direction > 0 ? 200 : -200, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: direction < 0 ? 200 : -200, opacity: 0 }}
                    transition={{ duration: 0.3, type: "tween" }}
                    className="inset-0"
                  >
                    {currentStep === 1 && (
                      <div className="space-y-6">
                        <FormFieldItem fieldControl={control} name="orgName" label="*Organisation Name" placeholder="Enter organisation name" />
                        <FormFieldItem fieldControl={control} name="orgEmail" label="Business Email" type="email" placeholder="Enter business email" />
                        <Button type="button" onClick={() => handleStepClick(currentStep + 1)} className="w-full h-11">
                          Continue
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    )}
                    {currentStep === 2 && (
                      <div className="space-y-4">
                        <FormFieldItem fieldControl={control} name="address.street" label="Street" placeholder="Enter street address" />
                        <div className="grid grid-cols-2 gap-4">
                          <FormFieldItem fieldControl={control} name="address.suburb" label="Suburb" placeholder="Enter suburb" />
                          <FormFieldItem fieldControl={control} name="address.state" label="State" placeholder="Enter state" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <FormFieldItem fieldControl={control} name="address.postcode" label="Postcode" placeholder="Enter postcode" />
                          <FormFieldItem fieldControl={control} name="address.country" label="Country" placeholder="Enter country" />
                        </div>
                        <Button type="button" onClick={() => handleStepClick(currentStep + 1)} className="w-full h-11">
                          Continue
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    )}
                    {currentStep === 3 && (
                      <div className="space-y-4">
                        <FormFieldItem fieldControl={control} name="websiteUrl" label="Website URL" type="url" placeholder="Enter website URL" />
                        {/* <FormFieldItem fieldControl={control} name="logoUrl" label="Logo URL" type="url" placeholder="Enter logo URL" /> */}
                        <div className="h-24">
                          <InputFile title="Logo Upload" getUrl={handleGetUrl} orgName={form.watch("orgName")} />
                        </div>
                        <Button type="button" onClick={() => handleStepClick(currentStep + 1)} className="w-full h-11">
                          Continue
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    )}
                    {currentStep === 4 && (
                      <div className="space-y-4">
                        <FormFieldItem fieldControl={control} name="userName" label="*Admin Name" placeholder="Enter admin name" />
                        <FormFieldItem fieldControl={control} name="userEmail" label="*Admin Email" type="email" placeholder="Enter admin email" />
                        <FormFieldItem fieldControl={control} name="password" label="*Password" type="password" placeholder="Enter your password" />
                        <Button
                          type="button"
                          onClick={() => handleStepClick(5)}
                          disabled={mutation.isPending || !formState.isValid}
                          className="w-full flex items-center justify-center"
                          size={"xl"}
                        >
                          {mutation.isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : "Send Verification Email"}
                        </Button>
                      </div>
                    )}
                    <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                      <span>Already have an account?</span>
                      <Link className="font-bold text-secondary-foreground hover:text-secondary-foreground/80" to={"/auth"}>
                        Back to Login
                      </Link>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </Form>
          </div>
          {/* Progress Bar */}
          <div className="w-full h-[5rem] absolute bottom-0 max-w-[460px] flex flex-col justify-end gap-4">
            <div className="flex gap-1">
              {steps.map(s => {
                const isCompleted = currentStep > s.step;
                const isCurrent = currentStep === s.step;

                return (
                  <div key={s.step} className={`relative flex-1 ${"cursor-pointer"}`} onClick={() => handleStepClick(s.step)}>
                    <div
                      className={`
                          h-2 rounded-full w-full bg-muted
                        `}
                    />

                    {(isCompleted || isCurrent) && (
                      <div
                        className={`
                            absolute top-0 left-0 h-2 rounded-full bg-primary
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
        </>
      )}
    </div>
  );
};

export default RegisterForm;
