import { TitleWithIcon } from "@/components/TitleWithIcon";
import { Gauge } from "lucide-react";

const DefaultDashboardPage = () => {
  return (
    <div className="w-full flex flex-col justify-center">
      <TitleWithIcon icon={Gauge} title={"Dashboard"} />
    </div>
  );
};

export default DefaultDashboardPage;
