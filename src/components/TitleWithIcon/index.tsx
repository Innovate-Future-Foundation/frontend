import { LucideIcon } from "lucide-react";

interface TitleWithIconProps {
  icon: LucideIcon;
  title: string;
}

export const TitleWithIcon: React.FC<TitleWithIconProps> = ({ icon: Icon, title }) => {
  return (
    <div className="inline-flex items-center gap-2 my-4">
      <div className="p-2 bg-slate-200 rounded-md">
        <Icon className="h-5 w-5 text-zinc-600" />
      </div>
      <h2 className="capitalize text-2xl font-semibold">{title}</h2>
    </div>
  );
};
