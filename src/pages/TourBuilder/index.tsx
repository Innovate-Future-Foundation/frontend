import { Card } from "@/components/ui/card";
import { CalendarCheck2, ContactRound, ListCollapse, StepBack, UserPlus } from "lucide-react";
import { ProgresBar } from "./ProgressBar";
import { useState } from "react";
import clsx from "clsx";
import { Outlet, useNavigate, useParams } from "react-router-dom";

const navMenu = [
  {
    icon: ListCollapse,
    label: "Tour details",
    path: "summary"
  },
  {
    icon: ContactRound,
    label: "Contact leader",
    path: "leader"
  },
  {
    icon: CalendarCheck2,
    label: "Schedule",
    path: "schedule"
  },
  {
    icon: UserPlus,
    label: "Students enrollment",
    path: "studentsEnrollment"
  }
];

export interface MenuContent {
  index: number;
  isDirty: boolean;
}
const TourBuilderPage = () => {
  const { id } = useParams();
  console.log("id", id);
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isDirty, setIsDirty] = useState(() => new Array(navMenu?.length || 0).fill(false));

  const handleBack = () => {
    navigate("/dashboard/tours");
  };
  return (
    <div className="bg-muted h-screen p-6 flex flex-col gap-4 overflow-y-hidden">
      <div className="flex h-12 items-center relative justify-center">
        <Card className="absolute left-0 z-10 w-12 h-12 border-none flex items-center justify-center">
          <StepBack className="text-muted-foreground/80" size={20} onClick={handleBack} />
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
                navigate(menuItem.path);
              }}
              className={clsx(`flex gap-2 items-center hover:bg-primary/10 p-2 rounded-lg z-10 ${currentStep === index && "bg-primary/10"}`)}
            >
              <menuItem.icon size={18} />
              {menuItem.label}
            </div>
          ))}
        </Card>
        <Outlet />
      </div>
    </div>
  );
};

export default TourBuilderPage;
