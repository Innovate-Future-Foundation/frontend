import React, { ReactNode } from "react";
import { Edit } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface FormPieceProp {
  formTitle: string;
  children: ReactNode;
}

const FormWrapper: React.FC<FormPieceProp> = ({ formTitle, children }) => {
  return (
    <Card className="rounded-md shadow-none w-full overflow-hidden">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">{formTitle}</CardTitle>
          <Button variant={"outline"} className="rounded-full">
            Edit <Edit />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4 pb-8">{children}</form>
      </CardContent>
    </Card>
  );
};

export default FormWrapper;
