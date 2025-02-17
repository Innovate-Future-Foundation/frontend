import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FC, ReactNode } from "react";

export interface TourBuilderLayout {
  children?: ReactNode;
  title: string;
  subTitle: string;
}

const TourBuilderLayout: FC<TourBuilderLayout> = ({ children, title, subTitle }) => {
  return (
    <>
      <p className="font-bold text-2xl text-foreground/80 mb-1 pt-6 px-6">{title}</p>
      <p className="font-normal text-foreground/60 px-6">{subTitle}</p>

      <div className="h-[calc(100vh-17rem)] overflow-y-scroll px-6">{children}</div>
      <Separator />
      <div className="h-20 w-full flex justify-between items-center px-10">
        <Button variant={"secondary"} className="px-12">
          <div className="flex gap-2 items-center text-lg">
            <ChevronLeft /> Back
          </div>
        </Button>
        <Button variant={"default"} className="px-12 text-lg">
          <div className="flex gap-2 items-center text-lg">
            Next
            <ChevronRight />
          </div>
        </Button>
      </div>
    </>
  );
};

export default TourBuilderLayout;
