import { TitleWithIcon } from "@/components/TitleWithIcon";
import { UserRoundPen } from "lucide-react";

const TourPage = () => {
  return (
    <div className="w-full flex flex-col justify-center">
      <TitleWithIcon icon={UserRoundPen} title={"Tour list"} />
    </div>
  );
};

export default TourPage;
