import { Control, FieldPath, FieldValues } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

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
