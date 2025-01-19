import { TitleWithIcon } from "@/components/TitleWithIcon";
import { Backpack } from "lucide-react";

const StudentPage = () => {
  return (
    <div className="w-full flex flex-col justify-center">
      <TitleWithIcon icon={Backpack} title={"Students list"} />
    </div>
  );
};

export default StudentPage;
