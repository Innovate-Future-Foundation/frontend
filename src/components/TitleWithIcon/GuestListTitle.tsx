import { FC } from "react";
import { LucideIcon } from "lucide-react";

interface TitleWithIconProps {
  icon: LucideIcon;
  title: string;
}

export const TitleWithIcon: FC<TitleWithIconProps> = ({ icon: Icon, title }) => {
  return (
    <div className="inline-flex items-center gap-3">
      <div className="p-2 border-2 border-gray-900 rounded-full">
        <Icon className="h-5 w-5" />
      </div>
      <h2 className="text-lg font-bold">{title}</h2>
    </div>
  );
};
