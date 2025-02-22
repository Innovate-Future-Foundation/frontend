import { UseFormReturn } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { ACFormFieldItem } from "@/pages/Dashboard/components/ACFormFieldItem";

interface AddEmailFormProps {
  form: UseFormReturn<any>;
}

const AddEmailForm: React.FC<AddEmailFormProps> = ({ form }) => {
  return (
    <div className="w-full flex flex-col justify-center">
      <div className="flex flex-col gap-4 mt-6">
        <Form {...form}>
          <ACFormFieldItem disabled={false} name="email" type="email" label="Leader Email" placeholder="please enter a teacher's email" createSchema={form} />
        </Form>
      </div>
    </div>
  );
};

export default AddEmailForm;
