import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Badge } from "@/components/ui/badge";
import { Form } from "@/components/ui/form";
import Avatar from "@/components/Avatar";
import FormWrapper from "@/components/FormWrapper.tsx";
import { FormFieldItem } from "@/components/FormField";
import { Organisation, SubscriptionCode } from "@/types";
import { abbreviateName } from "@/utils/formatters";
import { useUpdateOrganisation } from "@/hooks/organisations/useUpdateOrganisation";
import { useState } from "react";
import { getImageBySubscription } from "@/constants/mapper";

const companyInfoFormSchema = z.object({
  logoUrl: z.string().optional(),
  orgName: z
    .string()
    .min(2, {
      message: "Company name must be at least 2 characters."
    })
    .max(50, {
      message: "Company name must not exceed 50 characters." // Restrains max length
    }),
  email: z.string().email({
    message: "Invalid email format."
  }),
  websiteUrl: z
    .string()
    .optional()
    .refine(value => !value || /^https?:\/\/[^\s$.?#].[^\s]*$/i.test(value), {
      message: "Website URL must be a valid URL (e.g., https://example.com)."
    })
});

const addressInfoFormSchema = z.object({
  street: z
    .string()
    .min(2, {
      message: "Street must be at least 2 characters."
    })
    .max(100, {
      message: "Street must not exceed 100 characters."
    })
    .optional(),
  suburb: z
    .string()
    .min(2, {
      message: "Suburb must be at least 2 characters."
    })
    .max(50, {
      message: "Suburb must not exceed 50 characters."
    })
    .optional(),
  state: z
    .string()
    .min(2, {
      message: "State must be at least 2 characters."
    })
    .max(20, {
      message: "State must not exceed 20 characters."
    })
    .optional(),
  postcode: z
    .string()
    .regex(/^\d{4}$/, {
      message: "Postcode must be a 4-digit number."
    })
    .optional(),
  country: z
    .string()
    .min(2, {
      message: "Country must be at least 2 characters."
    })
    .max(50, {
      message: "Country must not exceed 50 characters."
    })
    .optional()
});

interface OrganisationProfileProps {
  disabled?: boolean;
  orgProfileDetail: Organisation;
}
type FormName = "company" | "address" | null;
const OrganisationProfile: React.FC<OrganisationProfileProps> = ({ disabled = false, orgProfileDetail }) => {
  const [handleFormName, setHandleFormName] = useState<FormName>(null);
  const companyInfoForm = useForm<z.infer<typeof companyInfoFormSchema>>({
    resolver: zodResolver(companyInfoFormSchema),
    mode: "onChange",
    defaultValues: {
      logoUrl: orgProfileDetail.logoUrl ?? "",
      orgName: orgProfileDetail.orgName ?? "",
      email: orgProfileDetail.email ?? "",
      websiteUrl: orgProfileDetail.websiteUrl ?? ""
    }
  });

  const addressInfoForm = useForm<z.infer<typeof addressInfoFormSchema>>({
    resolver: zodResolver(addressInfoFormSchema),
    mode: "onChange",
    defaultValues: {
      street: orgProfileDetail.address?.street ?? "",
      suburb: orgProfileDetail.address?.suburb ?? "",
      state: orgProfileDetail.address?.state ?? "",
      postcode: orgProfileDetail.address?.postcode ?? "",
      country: orgProfileDetail.address?.country ?? ""
    }
  });

  const avatarAlt = "@InnovateFoundation";

  const handleSuccess = () => {
    if (companyInfoForm.formState.visitedFlags) {
      companyInfoForm.reset(companyInfoForm.getValues());
      setTimeout(() => {
        setHandleFormName(null);
      }, 3000);
    }
    if (addressInfoForm.formState.visitedFlags) {
      addressInfoForm.reset(addressInfoForm.getValues());
      setTimeout(() => {
        setHandleFormName(null);
      }, 3000);
    }
  };

  const handleError = () => {
    if (companyInfoForm.formState.visitedFlags) {
      companyInfoForm.reset();
      setTimeout(() => {
        setHandleFormName(null);
      }, 3000);
    }
    if (addressInfoForm.formState.visitedFlags) {
      addressInfoForm.reset();
      setTimeout(() => {
        setHandleFormName(null);
      }, 3000);
    }
  };

  const mutation = useUpdateOrganisation({ handleSuccess, handleError });

  const handleCompanyInfoSubmit = (data: z.infer<typeof companyInfoFormSchema>) => {
    setHandleFormName("company");
    mutation.mutate({ id: orgProfileDetail.id!, bodyData: { ...data } });
  };

  const handleAddressInfoSubmit = (data: z.infer<typeof addressInfoFormSchema>) => {
    setHandleFormName("address");
    mutation.mutate({
      id: orgProfileDetail.id!,
      bodyData: {
        address: {
          street: data.street ?? "",
          suburb: data.suburb ?? "",
          state: data.state ?? "",
          postcode: data.postcode ?? "",
          country: data.country ?? ""
        }
      }
    });
  };

  return (
    <div className="w-full flex flex-col justify-center">
      <div className="h-32 bg-accent mt-4 rounded-md flex items-center pl-4">
        <div className="top-10 left-8 flex gap-3 items-end">
          <Avatar
            avatarLink={companyInfoForm.watch("logoUrl")!}
            size={24}
            avatarAlt={avatarAlt}
            avatarPlaceholder={abbreviateName(companyInfoForm.watch("orgName"))}
            outline={true}
            clickable={true}
          />
          <div className="flex flex-col">
            <p className="text-lg leading-none font-bold capitalize">{companyInfoForm.watch("orgName")}</p>
            <p className="text-xs">{companyInfoForm.watch("websiteUrl")}</p>
            <div className="flex gap-2 mt-2">
              <Badge variant="secondary" className="text-muted-foreground bg-muted px-1">
                <div className="capitalize mr-1">{orgProfileDetail.subscriptionCode}</div>
                <Avatar
                  avatarLink={getImageBySubscription[orgProfileDetail.subscriptionCode as SubscriptionCode]}
                  avatarPlaceholder={abbreviateName(orgProfileDetail.subscriptionCode ?? "")}
                  size={4}
                />
              </Badge>
              <Badge variant={"secondary"} className="lowercase p-0 px-2 rounded-full font-medium text-xs text-secondary-foregroundGreen bg-secondary-green">
                {orgProfileDetail.orgStatusCode}
              </Badge>
              <Badge variant={"outline"} className="lowercase p-0 px-2 rounded-full font-medium text-xs">
                {orgProfileDetail.orgName}
              </Badge>
            </div>
          </div>
        </div>
      </div>
      <div className="h-4"></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <FormWrapper
          disabled={!companyInfoForm.formState.visitedFlags}
          isPending={handleFormName === "company" && mutation.isPending}
          isSuccess={handleFormName === "company" && !companyInfoForm.formState.visitedFlags && mutation.isSuccess}
          isError={handleFormName === "company" && !companyInfoForm.formState.visitedFlags && mutation.isError}
          formTitle={"Company Information"}
          onSave={disabled ? undefined : companyInfoForm.handleSubmit(handleCompanyInfoSubmit)}
        >
          <Form {...companyInfoForm}>
            <div className="flex gap-4 w-full">
              <FormFieldItem fieldControl={companyInfoForm.control} name="orgName" label="Company Name" placeholder="Company Name" disabled={disabled} />
              <FormFieldItem fieldControl={companyInfoForm.control} name="email" label="Email" placeholder="Email" disabled={disabled} />
            </div>
            <FormFieldItem fieldControl={companyInfoForm.control} name="websiteUrl" label="Website Url" placeholder="Website Url" disabled={disabled} />
          </Form>
        </FormWrapper>
        <FormWrapper
          disabled={!addressInfoForm.formState.visitedFlags}
          isPending={handleFormName === "address" && mutation.isPending}
          isSuccess={handleFormName === "address" && !addressInfoForm.formState.visitedFlags && mutation.isSuccess}
          isError={handleFormName === "address" && !addressInfoForm.formState.visitedFlags && mutation.isError}
          formTitle={"Address"}
          onSave={disabled ? undefined : addressInfoForm.handleSubmit(handleAddressInfoSubmit)}
        >
          <Form {...addressInfoForm}>
            <div className="flex gap-4 w-full">
              <FormFieldItem fieldControl={addressInfoForm.control} name="country" label="Country" placeholder="AU" disabled={disabled} />
              <FormFieldItem fieldControl={addressInfoForm.control} name="state" label="State" placeholder="New South Wales" disabled={disabled} />
            </div>
            <div className="flex gap-4 w-full">
              <FormFieldItem fieldControl={addressInfoForm.control} name="suburb" label="Suburb" placeholder="Gilberton" disabled={disabled} />
              <FormFieldItem fieldControl={addressInfoForm.control} name="postcode" label="Postcode" placeholder="5000" disabled={disabled} />
            </div>
            <FormFieldItem fieldControl={addressInfoForm.control} name="street" label="Street" placeholder="60 Walkerville Rd" disabled={disabled} />
          </Form>
        </FormWrapper>
      </div>
    </div>
  );
};

export default OrganisationProfile;
