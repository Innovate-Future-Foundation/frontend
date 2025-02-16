import { Card } from "@/components/ui/card";
import { CalendarCheck2, ContactRound, ListCollapse, StepBack, UserPlus } from "lucide-react";
import { ProgresBar } from "./ProgresBar";
import { useState } from "react";
import clsx from "clsx";
import { Outlet } from "react-router-dom";

const navMenu = [
  {
    icon: ListCollapse,
    label: "Tour details"
  },
  {
    icon: ContactRound,
    label: "Contact leader"
  },
  {
    icon: CalendarCheck2,
    label: "Schedule"
  },
  {
    icon: UserPlus,
    label: "Students enrollment"
  }
];

export interface MenuContent {
  index: number;
  isDirty: boolean;
}
const TourBuilderPage = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isDirty, setIsDirty] = useState<boolean[]>([true, false, false, false]);
  // const

  return (
    <div className="bg-muted h-screen p-6 flex flex-col gap-4">
      <div className="flex items-center relative justify-center">
        <Card className="absolute left-0 z-10 w-12 h-12 border-none flex items-center justify-center">
          <StepBack className="text-muted-foreground/80" size={20} />
        </Card>
        <Card className="w-96 h-12 border-none flex items-center p-2 px-4">
          <ProgresBar />
        </Card>
      </div>
      <div className="flex gap-4">
        <Card className="relative flex flex-col gap-1 border-none w-64 p-1 text-md text-primary-foreground30 font-medium">
          <div className="absolute right-4 bg-primary-light top-4 w-[2px] justify-center items-center flex flex-col gap-8">
            {Array.from({ length: navMenu.length }, (_, index) => index).map(index => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${currentStep === index ? "bg-primary-foreground30" : isDirty[index] ? "bg-primary" : "bg-muted"}`}
              ></div>
            ))}
          </div>
          {navMenu.map((menuItem, index) => (
            <div
              key={menuItem.label}
              onClick={() => {
                setCurrentStep(index);
                setIsDirty(prev => {
                  const newArr = [...prev];
                  newArr[index] = true;
                  return newArr;
                });
              }}
              className={clsx(`flex gap-2 items-center hover:bg-primary/10 p-2 rounded-lg z-10 ${currentStep === index && "bg-primary/10"}`)}
            >
              <menuItem.icon size={18} />
              {menuItem.label}
            </div>
          ))}
        </Card>
        <Card className="flex-1 border-none min-w-[600px]">
          <Outlet />
        </Card>
        <Card className="ml-8 w-[400px] border-none"></Card>
      </div>
    </div>
  );
};

export default TourBuilderPage;
