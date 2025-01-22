import { TitleWithIcon } from "@/components/TitleWithIcon";
import { UserRoundPen } from "lucide-react";

const EventPage = () => {
  return (
    <div className="w-full flex flex-col justify-center">
      <TitleWithIcon icon={UserRoundPen} title={"Event list"} />
    </div>
  );
};

export default EventPage;
