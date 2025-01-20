import { WalletCards } from "lucide-react";

import { TitleWithIcon } from "@/components/TitleWithIcon";
import TeacherProfile from "./TeacherProfile";

const TeacherDetailPage = () => {
  return (
    <div className="w-full flex flex-col gap-4 justify-center">
      <TitleWithIcon icon={WalletCards} title={"teacher profile"} />
      <TeacherProfile />
    </div>
  );
};

export default TeacherDetailPage;
