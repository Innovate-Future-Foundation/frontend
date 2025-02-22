import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { Tour } from "@/types";
import { ACFormFieldItem } from "@/pages/Dashboard/components/ACFormFieldItem";

const studentEmailFormSchema = z.object({
  email: z.string().min(1, "Email is required").email({
    message: "Invalid email format."
  })
});

interface TourDetailFormProps {
  tourDetail: Tour;
}
const StudentErollmentForm: React.FC<TourDetailFormProps> = ({ tourDetail }) => {
  const leaderEmailForm = useForm<z.infer<typeof studentEmailFormSchema>>({
    resolver: zodResolver(studentEmailFormSchema),
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
            label="Student Email"
            placeholder="please enter a student's email"
            createSchema={leaderEmailForm}
          />
        </Form>
      </div>
    </div>
  );
};

export default StudentErollmentForm;
