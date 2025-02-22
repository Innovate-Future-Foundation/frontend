import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { ProfileInfo, Tour } from "@/types";
import { ACFormFieldItem } from "@/pages/Dashboard/components/ACFormFieldItem";
import ContactCard from "./ContactCard";

const leaderData: ProfileInfo = {
  id: "7c9e6679-7425-40de-944b-e07fc1f90ae7",
  roleCode: "OrgTeacher",

  name: "Alice Johnson",
  email: "alice.johnson@example.com",
  phone: "123-456-7890",
  avatarUrl: "https://github.com/shadcn.png",
  isActive: true,
  isConfirmed: true
};

const leaderEmailFormSchema = z.object({
  email: z.string().min(1, "Email is required").email({
    message: "Invalid email format."
  })
});

interface TourDetailFormProps {
  tourDetail: Tour;
}

const ContactLeaderForm: React.FC<TourDetailFormProps> = ({ tourDetail }) => {
  const leaderEmailForm = useForm<z.infer<typeof leaderEmailFormSchema>>({
    resolver: zodResolver(leaderEmailFormSchema),
    mode: "onChange",
    defaultValues: {
      email: tourDetail.leaderInfo?.email ?? ""
    }
  });

  // const handleSuccess = () => {
  //   if (tourInfoForm.formState.visitedFlags) {
  //     tourInfoForm.reset(tourInfoForm.getValues());
  //   }
  // };

  // const handleError = () => {
  //   if (tourInfoForm.formState.visitedFlags) {
  //     tourInfoForm.reset();
  //   }
  // };

  // const mutation = useUpdateTour({ handleSuccess, handleError });

  // const handleTourInfoSubmit = (data: z.infer<typeof tourInfoFormSchema>) => {
  //   console.log("User Info Submitted: ", data);
  //   // TODO: Perform actions such as sending the data to the server
  //   // mutation.mutate({ id: tourDetail.id!, bodyData: { ...data } });
  // };

  return (
    <div className="w-full flex flex-col justify-center">
      <div className="flex flex-col gap-4 mt-6">
        <Form {...leaderEmailForm}>
          <ACFormFieldItem
            disabled={false}
            name="email"
            type="email"
            label="Leader Email"
            placeholder="please enter a teacher's email"
            createSchema={leaderEmailForm}
          />
        </Form>
        <ContactCard profile={leaderData} />
      </div>
    </div>
  );
};

export default ContactLeaderForm;
