import React, { ReactNode } from "react";
import { Save } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface FormPieceProp {
  formTitle: string;
  children: ReactNode;
  onSave?: () => void;
}

const FormWrapper: React.FC<FormPieceProp> = ({ formTitle, children, onSave }) => {
  return (
    <Card className="rounded-md shadow-none w-full overflow-hidden">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">{formTitle}</CardTitle>
          {onSave && (
            <div className="flex gap-4">
              <Button className="rounded-full" onClick={onSave}>
                Save <Save />
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4 pb-4">{children}</form>
      </CardContent>
    </Card>
  );
};

export default FormWrapper;
