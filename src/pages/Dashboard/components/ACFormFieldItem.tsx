import { ControllerRenderProps, FieldPath, FieldValues, Path, UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ComponentProps, useCallback, useEffect, useState } from "react";
import ParentsDetail from "./ParentsDetail";
import { abbreviateName } from "@/utils/formatters";
import useDebounce from "@/utils/debounce";
import { dummyParentsData } from "./dummyData";

const fetchParentsData = async (query: string) => {
  return dummyParentsData.filter(data => data.email.toLocaleLowerCase().includes(query.toLocaleLowerCase()));
};

interface ACFormFieldItemProps<T extends FieldValues> extends ComponentProps<typeof Input> {
  createSchema: UseFormReturn<T>;
  name: FieldPath<T>;
  label: string;
  disabled: boolean;
}

export const ACFormFieldItem = <T extends FieldValues>({ createSchema, name, label, disabled, ...inputProps }: ACFormFieldItemProps<T>) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [details, setDetails] = useState<{ name: string; email: string; avatarLink: string }[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [isSuggestionOpen, setIsSuggestionOpen] = useState(false);

  const debouncedInputValue = useDebounce(inputValue, 500);

  const onInputChangeHandler = useCallback(
    (field: ControllerRenderProps<T, Path<T>>, e: React.ChangeEvent<HTMLInputElement>) => {
      if (isSelecting) {
        setIsSelecting(false);
      }
      field.onChange(e);
      setInputValue(e.target.value);
    },
    [isSelecting]
  );

  useEffect(() => {
    if (debouncedInputValue && !isSelecting) {
      const fetchParents = async (query: string) => {
        try {
          const data = await fetchParentsData(query);
          setDetails(data);
          setIsSuggestionOpen(true);
        } catch (err) {
          console.error(err);
        }
      };
      fetchParents(debouncedInputValue);
    } else if (!debouncedInputValue) {
      setDetails([]);
    }
  }, [debouncedInputValue, isSelecting]);

  const handleSelectSuggestion = (field: ControllerRenderProps<T, Path<T>>, email: string) => {
    setIsSelecting(true);
    setInputValue(email);
    field.onChange(email);
    setIsSuggestionOpen(false);
  };

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
                value={inputValue}
                className={`${fieldState?.error ? "border-destructive focus-visible:ring-destructive" : "focus-visible:ring-primary"}`}
              />
              {isSuggestionOpen && (
                <div className="absolute top-10 z-10 w-full bg-background border rounded shadow-lg max-h-48 overflow-y-auto">
                  {details.map((parent, index) => (
                    <div key={index} className="p-1 pl-[11px] hover:bg-accent cursor-pointer" onClick={() => handleSelectSuggestion(field, parent.email)}>
                      <ParentsDetail
                        avatarLink={parent.avatarLink}
                        avatarAlt="Parent Portrait"
                        avatarPlaceholder={abbreviateName(parent.name)}
                        name={parent.name}
                        email={parent.email}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </FormControl>
          {fieldState?.error ? <FormMessage /> : <div className="h-4"></div>}
        </FormItem>
      )}
    />
  );
};
