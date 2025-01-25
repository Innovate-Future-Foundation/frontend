import { useState } from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Eye, EyeOff } from "lucide-react";
import { ComponentProps } from "react";

interface FormFieldItemProps<T extends FieldValues> extends ComponentProps<typeof Input> {
  fieldControl: Control<T>;
  name: FieldPath<T>;
  label: string;
}

export const FormFieldItem = <T extends FieldValues>({ fieldControl, name, label, type = "text", ...inputProps }: FormFieldItemProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormField
      control={fieldControl}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className="w-full text-primary-foreground30">
          <FormLabel>{label}</FormLabel>
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
          {fieldState?.error ? <FormMessage /> : <div className="h-4"></div>}
        </FormItem>
      )}
    />
  );
};
