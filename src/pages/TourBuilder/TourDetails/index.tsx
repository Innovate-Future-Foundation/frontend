import TourBuilderLayout from "@/layouts/TourBuilderLayout";
import TourDetailForm from "./TourDetailForm";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTourBuilderNavigation } from "@/hooks/useTourBuilderNavigation";
import { useTourBuilderStore } from "@/store";

export const tourInfoFormSchema = z.object({
  coverImgUrl: z
    .string()
    .optional()
    .refine(value => !value || /^https?:\/\/[^\s$.?#].[^\s]*$/i.test(value), {
      message: "Cover image URL must be a valid URL (e.g., https://example.com)."
    }),
  title: z
    .string()
    .min(2, {
      message: "Title must be at least 2 characters."
    })
    .max(255, {
      message: "Title must not exceed 50 characters."
    }),
  summary: z
    .string()
    .optional()
    .refine(val => (val ? val.length : 0 <= 255), {
      message: "Summary can't be more than 255 characters"
    }),
  comment: z
    .string()
    .optional()
    .refine(val => (val ? val.length : 0 <= 255), {
      message: "Comment can't be more than 500 characters"
    }),
  dateRange: z.object({
    from: z.date(),
    to: z.date()
  }),
  // timeRange: z.array(z.string().nullable(), z.string().nullable()),
  text: z.string().optional()
});

const TourDetails = () => {
  const { setTourDetails, tourDetails } = useTourBuilderStore();
  const tourInfoForm = useForm<z.infer<typeof tourInfoFormSchema>>({
    resolver: zodResolver(tourInfoFormSchema),
    mode: "onChange",
    defaultValues: {
      coverImgUrl: tourDetails?.coverImgUrl ?? "",
      title: tourDetails?.title ?? "",
      summary: tourDetails?.summary ?? "",
      comment: tourDetails?.comment ?? "",
      dateRange: {
        from: tourDetails?.startTime ? new Date(tourDetails.startTime) : new Date(),
        to: tourDetails?.endTime ? new Date(tourDetails.endTime) : new Date()
      },
      text: tourDetails?.text ?? ""
    }
  });
  const { handleGoToNextStep } = useTourBuilderNavigation();
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

  const handleSubmit = tourInfoForm.handleSubmit(data => {
    console.log("Submitted Data:", data);
    console.log("is form dirty?:", Object.keys(tourInfoForm.formState.dirtyFields).length != 0);
    // console.log("is imageUrl changed?:", imageUrl);
    //todo: api
    // mutation.mutate({ id: tourDetail.id!, bodyData: { ...data } });
    //todo: if successfully
    setTourDetails({ ...data });
    handleGoToNextStep();
  });

  return (
    <TourBuilderLayout title={"Tour Details"} subTitle={"Please fill the details about the tour."} handleNext={handleSubmit}>
      <div className="p-6 pt-0">
        <TourDetailForm form={tourInfoForm} dateTimeRange={"date"} />
      </div>
    </TourBuilderLayout>
  );
};

export default TourDetails;
