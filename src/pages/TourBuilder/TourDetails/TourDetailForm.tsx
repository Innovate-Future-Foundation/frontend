import { UseFormReturn } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { FormFieldItem } from "@/components/FormField";
import ImageUploader from "../ImgUploader";
import { DateRange } from "react-day-picker";
import { useState } from "react";
import RichEditor from "../RichEditor";

interface TourDetailFormProps {
  form: UseFormReturn<any>;
  dateTimeRange?: "date" | "time";
}

const TourDetailForm: React.FC<TourDetailFormProps> = ({ form, dateTimeRange = undefined }) => {
  const { control, setValue, watch, trigger } = form;
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange | undefined>(watch("dateRange"));

  // const [selectedTimeRange, setSelectedTimeRange] = useState<Value | undefined>(watch("timeRange"));

  const handleDateRangeSelect = (range?: DateRange) => {
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

  // const handleTimeOnchange = (value?: Value) => {
  //   setSelectedTimeRange(value);
  //   setValue("timeRange", value, { shouldDirty: true });
  //   trigger("timeRange");
  // };
  return (
    <Form {...form}>
      <div className="space-y-4">
        <ImageUploader imageUrl={watch("coverImgUrl")} getImageUrl={hanleSetImgUrl} />
        <FormFieldItem fieldControl={control} name="title" label="Title*" placeholder="Enter title" />
        <FormFieldItem fieldControl={control} name="summary" label="Summary" placeholder="Optional Summary" />
        <FormFieldItem fieldControl={control} name="comment" label="Comment" placeholder="Optional Comment" />
        {dateTimeRange === "date" && (
          <FormFieldItem
            fieldControl={control}
            name="dateRange"
            label="Duration"
            isDatePicker
            selected={selectedDateRange}
            handleSelect={handleDateRangeSelect}
          />
        )}
        {dateTimeRange === "time" && (
          // <div className="flex w-full ">
          //   <TimeRangePicker onChange={handleTimeOnchange} value={selectedTimeRange} />
          // </div>
          <p>help</p>
        )}
        <RichEditor setEditorContent={handleEditorChange} editorContent={watch("text")} />
      </div>
    </Form>
  );
};

export default TourDetailForm;
