import { TitleWithIcon } from "@/components/TitleWithIcon";
import { UserRoundPen } from "lucide-react";

const TeacherPage = () => {
  return (
    <div className="w-full flex flex-col justify-center">
      <TitleWithIcon icon={UserRoundPen} title={"teacher list"} />
    </div>
  );
};

export default TeacherPage;
