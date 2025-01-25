import { LucideIcon } from "lucide-react";

export interface TitleWithIconProps {
  icon: LucideIcon;
  title: string;
}

export const TitleWithIcon: React.FC<TitleWithIconProps> = ({ icon: Icon, title }) => {
  return (
    <div className="inline-flex items-center gap-2 my-4">
      <div className="p-2 bg-background rounded-md shadow-sm">
        <Icon className="h-4 w-4 text-secondary-foreground" />
      </div>
      <h2 className="capitalize text-xl font-semibold text-foreground">{title}</h2>
    </div>
  );
};
