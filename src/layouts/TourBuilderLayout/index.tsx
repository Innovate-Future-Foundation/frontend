import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FC, ReactNode } from "react";

export interface TourBuilderLayout {
  children?: ReactNode;
  title: string;
  subTitle: string;
  handleBack?: () => void;
  handleNext?: () => void;
  handleComplete?: () => void;
}

const TourBuilderLayout: FC<TourBuilderLayout> = ({
  children,
  title,
  subTitle,
  handleBack = undefined,
  handleNext = undefined,
  handleComplete = undefined
}) => {
  return (
    <Card className="flex-1 border-none min-w-[600px] max-w-[800px] h-[calc(100vh-7rem)]">
      <p className="font-bold text-2xl text-foreground/80 mb-1 pt-6 px-6">{title}</p>
      <p className="font-normal text-foreground/60 px-6 pb-4">{subTitle}</p>

      <div className="h-[calc(100vh-18rem)] overflow-y-scroll">{children}</div>

      <Separator />
      <div className="h-20 w-full px-10 relative">
        {handleBack && (
          <Button variant={"secondary"} className="absolute top-6 px-12 left-10" onClick={handleBack}>
            <div className="flex gap-2 items-center text-lg">
              <ChevronLeft /> Back
            </div>
          </Button>
        )}
        {handleNext && (
          <Button variant={"default"} className="absolute top-6 px-12 right-10" onClick={handleNext}>
            <div className="flex gap-2 items-center text-lg">
              Next
              <ChevronRight />
            </div>
          </Button>
        )}
        {handleComplete && (
          <Button variant={"default"} className="absolute top-6 px-12 right-10" onClick={handleComplete}>
            <div className="flex gap-2 items-center text-lg">
              Complete
              <ChevronRight />
            </div>
          </Button>
        )}
      </div>
    </Card>
  );
};

export default TourBuilderLayout;
