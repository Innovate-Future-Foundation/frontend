import { Control, FieldPath, FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import Avatar from "@/components/Avatar";
import FormWrapper from "@/components/FormWrapper.tsx";
import { Badge } from "@/components/ui/badge";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const orgProfileDetail = {
  orgName: "JR Academy",
  email: "admin@jracademy.com.au",
  logoUrl: "https://github.com/shadcn.png",
  websiteUrl: "https://jiangren.com.au/",

  address: {
    street: "123 Main Street",
    suburb: "Sydney",
    state: "NSW",
    postcode: "2000",
    country: "Australia"
  },

  subscription: "free",
  status: "pending"
};

const companyInfoFormSchema = z.object({
  logoUrl: z.string().optional(),
  name: z
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

const OrganisationProfile = () => {
  const companyInfoForm = useForm<z.infer<typeof companyInfoFormSchema>>({
    resolver: zodResolver(companyInfoFormSchema),
    mode: "onChange",
    defaultValues: {
      logoUrl: orgProfileDetail.logoUrl,
      name: orgProfileDetail.orgName,
      email: orgProfileDetail.email,
      websiteUrl: orgProfileDetail.websiteUrl
    }
  });

  const addressInfoForm = useForm<z.infer<typeof addressInfoFormSchema>>({
    resolver: zodResolver(addressInfoFormSchema),
    mode: "onChange",
    defaultValues: {
      street: orgProfileDetail.address?.street,
      suburb: orgProfileDetail.address?.suburb,
      state: orgProfileDetail.address?.state,
      postcode: orgProfileDetail.address?.postcode,
      country: orgProfileDetail.address?.country
    }
  });

  const avatarAlt = "@InnovateFoundation";

  const handleCompanyInfoSubmit = (data: z.infer<typeof companyInfoFormSchema>) => {
    console.log("Company Info Submitted: ", data);
    // TODO: Perform actions such as sending the data to the server
  };

  const handleAddressInfoSubmit = (data: z.infer<typeof addressInfoFormSchema>) => {
    console.log("Address Info Submitted: ", data);
    // TODO: Perform actions such as sending the data to the server
  };

  return (
    <div className="w-full flex flex-col justify-center">
      <div className="h-16 bg-accent relative">
        <div className="absolute top-10 left-8 flex gap-3 items-end">
          <Avatar
            avatarLink={companyInfoForm.watch("logoUrl")!}
            size={24}
            avatarAlt={avatarAlt}
            avatarPlaceholder={companyInfoForm.watch("name")}
            outline={true}
          />
          <div className="flex flex-col">
            <p className="text-lg leading-none font-bold">{companyInfoForm.watch("name")}</p>
            <p className="text-xs">{companyInfoForm.watch("websiteUrl")}</p>
            <div className="flex gap-2 mt-2">
              <Badge variant={"secondary"} className="p-0 px-2 rounded-full font-light text-xs text-red-400 bg-red-100">
                {orgProfileDetail.status}
              </Badge>
              <Badge variant={"outline"} className="p-0 px-2 rounded-full font-light text-xs text-red-400  border-red-200">
                {orgProfileDetail.subscription}
              </Badge>
            </div>
          </div>
        </div>
      </div>
      <div className="h-24"></div>
      <div className="flex flex-col gap-4">
        <FormWrapper formTitle={"Company Information"} onSave={companyInfoForm.handleSubmit(handleCompanyInfoSubmit)}>
          <Form {...companyInfoForm}>
            <div className="flex gap-4 w-full">
              <FormFieldItem fieldControl={companyInfoForm.control} name="name" label="Name" placeholder="Company Name" />
              <FormFieldItem fieldControl={companyInfoForm.control} name="email" label="Email" placeholder="Email" />
            </div>
            <FormFieldItem fieldControl={companyInfoForm.control} name="websiteUrl" label="Website Url" placeholder="Website Url" />
          </Form>
        </FormWrapper>

        <FormWrapper formTitle={"Address"} onSave={addressInfoForm.handleSubmit(handleAddressInfoSubmit)}>
          <Form {...addressInfoForm}>
            <div className="flex gap-4 w-full">
              <FormFieldItem fieldControl={addressInfoForm.control} name="country" label="Country" placeholder="AU" />
              <FormFieldItem fieldControl={addressInfoForm.control} name="state" label="State" placeholder="New South Wales" />
            </div>
            <div className="flex gap-4 w-full">
              <FormFieldItem fieldControl={addressInfoForm.control} name="suburb" label="Suburb" placeholder="Gilberton" />
              <FormFieldItem fieldControl={addressInfoForm.control} name="postcode" label="Postcode" placeholder="5000" />
            </div>
            <FormFieldItem fieldControl={addressInfoForm.control} name="street" label="Street" placeholder="60 Walkerville Rd" />
          </Form>
        </FormWrapper>
      </div>
    </div>
  );
};

export default OrganisationProfile;

interface FormFieldItemProps<T extends FieldValues> {
  fieldControl: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder: string;
}

export const FormFieldItem = <T extends FieldValues>({ fieldControl, name, label, placeholder }: FormFieldItemProps<T>) => {
  return (
    <FormField
      control={fieldControl}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              onChange={e => {
                field.onChange(e);
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
