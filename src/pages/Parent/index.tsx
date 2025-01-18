import { TitleWithIcon } from "@/components/TitleWithIcon";
import { Backpack } from "lucide-react";

const ParentsPage = () => {
  return (
    <div className="w-full flex flex-col justify-center">
      <TitleWithIcon icon={Backpack} title={"parents list"} />
    </div>
  );
};

export default ParentsPage;
