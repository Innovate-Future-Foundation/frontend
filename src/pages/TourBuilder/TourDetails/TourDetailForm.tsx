import { UseFormReturn } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { FormFieldItem } from "@/components/FormField";
import ImageUploader from "../ImgUploader";
import { DateRange } from "react-day-picker";
import { useState } from "react";
import RichEditor from "../RichEditor";

interface TourDetailFormProps {
  form: UseFormReturn<any>;
  // initialImageUrl?: string;
  // getImageUrl: (imgUrl?: string) => void;
}

const TourDetailForm: React.FC<TourDetailFormProps> = ({ form }) => {
  const { control, setValue, watch, trigger } = form;
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange | undefined>(watch("dateRange"));

  const handleSelect = (range?: DateRange) => {
    setSelectedDateRange(range);
    setValue("dateRange", range, { shouldDirty: true });
    trigger("dateRange");
  };

  const handleEditorChange = (name: string, value: string) => {
    setValue(name, value, { shouldDirty: true });
    trigger(name);
  };

  const hanleSetImgUrl = (imgUrl?: string) => {
    setValue("coverImgUrl", imgUrl, { shouldDirty: true });
    trigger("coverImgUrl");
  };
  return (
    <Form {...form}>
      <div className="space-y-4">
        <ImageUploader imageUrl={watch("coverImgUrl")} getImageUrl={hanleSetImgUrl} />

        <FormFieldItem fieldControl={control} name="title" label="Title*" placeholder="Enter title" />
        <FormFieldItem fieldControl={control} name="summary" label="Summary" placeholder="Optional Summary" />
        <FormFieldItem fieldControl={control} name="comment" label="Comment" placeholder="Optional Comment" />

        <FormFieldItem fieldControl={control} name="dateRange" label="Duration" isDatePicker selected={selectedDateRange} handleSelect={handleSelect} />

        <RichEditor setEditorContent={handleEditorChange} editorContent={watch("text")} />
      </div>
    </Form>
  );
};

export default TourDetailForm;
