import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import { FormFieldItem } from "@/components/FormField";
import { Tour } from "@/types";
import ImageUploader from "../ImgUploader";
import { DateRange, SelectRangeEventHandler } from "react-day-picker";
import { useState } from "react";
import { useCurrentEditor } from "@tiptap/react";
import RichEditor from "../RichEditor";

const tourInfoFormSchema = z.object({
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
  })
});

interface TourDetailFormProps {
  tourDetail: Tour;
}
const TourDetailForm: React.FC<TourDetailFormProps> = ({ tourDetail }) => {
  const [selected, setSelected] = useState<DateRange | undefined>(undefined);
  const editor = useCurrentEditor();
  console.log("editor", editor);
  const tourInfoForm = useForm<z.infer<typeof tourInfoFormSchema>>({
    resolver: zodResolver(tourInfoFormSchema),
    mode: "onChange",
    defaultValues: {
      coverImgUrl: tourDetail.coverImgUrl ?? "",
      title: tourDetail.title ?? "",
      summary: tourDetail.summary ?? "",
      comment: tourDetail.comment ?? "",
      dateRange: tourDetail.dateRange ?? undefined
    }
  });

  // const handleSuccess = () => {
  //   if (tourInfoForm.formState.isDirty) {
  //     tourInfoForm.reset(tourInfoForm.getValues());
  //   }
  // };

  // const handleError = () => {
  //   if (tourInfoForm.formState.isDirty) {
  //     tourInfoForm.reset();
  //   }
  // };

  // const mutation = useUpdateTour({ handleSuccess, handleError });

  // const handleTourInfoSubmit = (data: z.infer<typeof tourInfoFormSchema>) => {
  //   console.log("User Info Submitted: ", data);
  //   // TODO: Perform actions such as sending the data to the server
  //   // mutation.mutate({ id: tourDetail.id!, bodyData: { ...data } });
  // };

  const handleSelect: SelectRangeEventHandler = (range?: DateRange) => {
    if (!range) return;

    const { from, to } = range;

    setSelected(range);

    console.log("Selected Range:", from, to);
  };

  return (
    <div className="w-full flex flex-col justify-center">
      <div className="pb-4">
        <ImageUploader />
      </div>
      <div className="h-4"></div>
      <div className="flex flex-col gap-4">
        <Form {...tourInfoForm}>
          <FormFieldItem fieldControl={tourInfoForm.control} name="title" label="Title*" placeholder="Title" />
          <div className="flex gap-4 w-full">
            <FormFieldItem fieldControl={tourInfoForm.control} name="summary" label="Summary" placeholder="Summary" />
            <FormFieldItem fieldControl={tourInfoForm.control} name="comment" label="Comment" placeholder="Comment" />
          </div>
          <div className="flex gap-4 w-full">
            <FormFieldItem
              fieldControl={tourInfoForm.control}
              name="dateRange"
              label="Duration"
              placeholder="start date - end date"
              isDatePicker={true}
              selected={selected}
              handleSelect={handleSelect}
            />
          </div>
          <div className="">
            <RichEditor />
          </div>
          <div className="flex gap-4 w-full"></div>
        </Form>
      </div>
    </div>
  );
};

export default TourDetailForm;
