import { ControllerRenderProps, FieldPath, FieldValues, Path, UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ComponentProps, useCallback, useEffect, useMemo, useState } from "react";
import ParentsDetail from "./ParentsDetail";
import { abbreviateName } from "@/utils/formatters";
import { ProfileInfo } from "@/types";
import { debounce } from "lodash";
import { DEBOUNCE_TIME_MS } from "@/constants/appConfig";
import { CircleOff } from "lucide-react";
interface ACFormFieldItemProps<T extends FieldValues> extends ComponentProps<typeof Input> {
  createSchema: UseFormReturn<T>;
  data: ProfileInfo[];
  isSuccess: boolean;
  inputValue: string;
  name: FieldPath<T>;
  label: string;
  disabled: boolean;
  setInputValue: (inputValue: string) => void;
}

export const ACFormFieldItem = <T extends FieldValues>({
  createSchema,
  data,
  isSuccess,
  inputValue,
  name,
  label,
  disabled,
  setInputValue,
  ...inputProps
}: ACFormFieldItemProps<T>) => {
  const [details, setDetails] = useState<ProfileInfo[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [isSuggestionOpen, setIsSuggestionOpen] = useState(false);

  const debounceSearchChange = useMemo(
    () =>
      debounce((event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(String(event.target.value));
      }, DEBOUNCE_TIME_MS),
    [setInputValue]
  );

  const onInputChangeHandler = useCallback(
    (field: ControllerRenderProps<T, Path<T>>, e: React.ChangeEvent<HTMLInputElement>) => {
      if (isSelecting) {
        setIsSelecting(false);
      }
      field.onChange(e);
      debounceSearchChange(e);
    },
    [debounceSearchChange, isSelecting]
  );

  const handleBlur = (field: ControllerRenderProps<T, Path<T>>, e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeout(() => {
      const isValid = details.some(parent => parent.email === e.target.value);
      if (!isValid) {
        setInputValue("");
        field.onChange("");
      }
      setIsSuggestionOpen(false);
    }, 150);
  };

  useEffect(() => {
    if (inputValue && !isSelecting && isSuccess) {
      setDetails(data);
      setIsSuggestionOpen(true);
    } else if (!inputValue) {
      setDetails([]);
      setTimeout(() => {
        setIsSuggestionOpen(false);
      }, 500);
    }
    return () => {
      debounceSearchChange.cancel();
    };
  }, [debounceSearchChange, inputValue, isSelecting, isSuccess, data]);

  const handleSelectSuggestion = (field: ControllerRenderProps<T, Path<T>>, email: string) => {
    setIsSelecting(true);
    setInputValue(email);
    field.onChange(email);
    setIsSuggestionOpen(false);
  };

  return (
    <FormField
      control={createSchema.control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className="w-full">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                {...inputProps}
                {...field}
                disabled={disabled}
                onChange={e => onInputChangeHandler(field, e)}
                onBlur={e => handleBlur(field, e)}
                className={`${fieldState?.error ? "h-10 border-destructive focus-visible:ring-destructive" : "h-10 focus-visible:ring-primary"}`}
              />
              {isSuggestionOpen && (
                <div className="absolute top-11 z-10 w-full bg-background border rounded shadow-lg max-h-48 overflow-y-auto">
                  {details.length > 0 ? (
                    details.map((parent, index) => (
                      <div
                        key={index}
                        className="p-1 pl-[11px] hover:bg-accent cursor-pointer"
                        onClick={() => handleSelectSuggestion(field, parent.email ?? "")}
                      >
                        <ParentsDetail
                          avatarLink={parent.avatarUrl ?? ""}
                          avatarAlt="Parent Portrait"
                          avatarPlaceholder={abbreviateName(parent.name ?? "")}
                          name={parent.name ?? ""}
                          email={parent.email ?? ""}
                        />
                      </div>
                    ))
                  ) : (
                    <div className="text-sm flex gap-2 w-full p-2 items-center justify-center text-primary-foreground50">
                      <CircleOff className="inline-block" size={12} />
                      <p>No results.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </FormControl>
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
