import { useState } from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CalendarIcon, Eye, EyeOff } from "lucide-react";
import { ComponentProps } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import { formatDateToMMDDYY } from "@/utils/formatters";
import { DateRange, SelectRangeEventHandler } from "react-day-picker";

interface FormFieldItemProps<T extends FieldValues> extends ComponentProps<typeof Input> {
  fieldControl: Control<T>;
  name: FieldPath<T>;
  label: string;
  isDatePicker?: boolean;
  handleSelect?: SelectRangeEventHandler;
  selected?: DateRange;
}

export const FormFieldItem = <T extends FieldValues>({
  fieldControl,
  name,
  label,
  isDatePicker = false,
  selected,
  handleSelect,
  type = "text",
  ...inputProps
}: FormFieldItemProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormField
      control={fieldControl}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className="w-full text-primary-foreground30 flex flex-col">
          <FormLabel>{label}</FormLabel>
          {isDatePicker ? (
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "hover:bg-transparent w-full h-10 shadow-none pl-3 text-left font-normal bg-transparent",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {formatDateToMMDDYY(field.value?.from ?? "")} - {formatDateToMMDDYY(field.value?.to ?? "")}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="range"
                  max={30}
                  min={1}
                  selected={selected ?? field.value}
                  onSelect={handleSelect}
                  disabled={{ before: new Date() }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          ) : (
            <FormControl>
              <div className="relative">
                <Input
                  {...field}
                  type={type === "password" ? (showPassword ? "text" : "password") : type}
                  className={`${type === "password" ? "pr-10" : ""} ${
                    fieldState?.error ? "border-destructive focus-visible:ring-destructive" : "focus-visible:ring-primary"
                  }`}
                  {...inputProps}
                />
                {type === "password" && (
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                )}
              </div>
            </FormControl>
          )}
          {fieldState?.error ? (
            <div className="h-4">
              <FormMessage />
            </div>
          ) : (
            <div className="h-4"></div>
          )}
        </FormItem>
      )}
    />
  );
};
