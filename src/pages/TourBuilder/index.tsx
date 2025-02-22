import { Card } from "@/components/ui/card";
import { StepBack } from "lucide-react";
import { ProgresBar } from "./ProgressBar";
import clsx from "clsx";
import { Outlet, useParams } from "react-router-dom";
import { useTourBuilderNavigation } from "@/hooks/useTourBuilderNavigation";
import { navMenu } from "./navMenu";
import { useEffect } from "react";

export interface MenuContent {
  index: number;
  visitedFlags: boolean;
}
const TourBuilderPage = () => {
  const { currentStep, visitedFlags, handleSetCurrentStep, handleBackTourList, setTourId } = useTourBuilderNavigation();
  const { id } = useParams();

  useEffect(() => {
    setTourId(id);
  }, [id, setTourId]);

  return (
    <div className="bg-muted h-screen p-6 flex flex-col gap-4 overflow-y-hidden">
      <div className="flex h-12 items-center relative justify-center">
        <Card className="absolute left-0 z-10 w-12 h-12 border-none flex items-center justify-center cursor-pointer">
          <StepBack className="text-muted-foreground/80 hover:text-secondary-foreground" size={20} onClick={handleBackTourList} />
        </Card>
        <Card className="w-96 h-12 border-none flex items-center p-2 px-4">
          <ProgresBar />
        </Card>
      </div>
      <div className="flex gap-4 ">
        <Card className="relative flex flex-col gap-1 cursor-pointer border-none w-64 p-1 text-md text-foreground/80 font-medium h-fit">
          <div className="absolute right-4 bg-primary-light top-4 w-[2px] justify-center items-center flex flex-col gap-8">
            {navMenu?.length > 0 &&
              Array.from({ length: navMenu.length }, (_, index) => index).map(index => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${currentStep === index ? "bg-primary-foreground30" : visitedFlags[index] ? "bg-primary" : "bg-muted"}`}
                ></div>
              ))}
          </div>
          {navMenu.map((menuItem, index) => (
            <div
              key={menuItem.label}
              onClick={() => handleSetCurrentStep(index)}
              className={clsx(
                `flex gap-2 items-center hover:bg-primary/10 p-2 rounded-lg z-10 ${currentStep === index && "bg-primary/10"} ${!visitedFlags[index] && "text-primary-foreground60"}`
              )}
            >
              <menuItem.icon size={18} />
              <p>{menuItem.label}</p>
            </div>
          ))}
        </Card>
        <Outlet />
      </div>
    </div>
  );
};

export default TourBuilderPage;
