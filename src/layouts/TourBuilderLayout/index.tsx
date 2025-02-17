import { FC, ReactNode } from "react";

export interface TourBuilderLayout {
  children?: ReactNode;
  title: string;
  subTitle: string;
}

const TourBuilderLayout: FC<TourBuilderLayout> = ({ children, title, subTitle }) => {
  return (
    <div className="p-4 px-6">
      <p className="font-bold text-2xl text-foreground/80 mb-1">{title}</p>
      <p className="font-normal text-foreground/60">{subTitle}</p>
      {children}
    </div>
  );
};

export default TourBuilderLayout;
