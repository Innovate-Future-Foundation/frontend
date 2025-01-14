import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormFieldProps {
  id: string;
  label: string;
  value?: string;
  type?: FormType;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

type FormType = "text" | "number" | "email" | "file";

const FormField: React.FC<FormFieldProps> = ({ id, label, value = "", type = "text", onChange }) => {
  return (
    <div className="flex flex-col items-start gap-1">
      <Label htmlFor={id} className="text-right text-sm">
        {label}
      </Label>
      <Input id={id} type={type} value={value} className="py-2" onChange={onChange} />
    </div>
  );
};

export default FormField;
