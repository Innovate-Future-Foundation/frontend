import React, { ReactNode } from "react";

interface BlurBadgeProps {
  children: ReactNode;
}
const BlurBadge: React.FC<BlurBadgeProps> = ({ children }) => {
  return (
    <div className="relative rounded-full p-[1px]">
      <div
        className="absolute inset-0 rounded-full border border-transparent bg-gradient-to-r from-white/80 to-primary-foreground80"
        style={{
          WebkitMask: "linear-gradient(white 0 0) padding-box, linear-gradient(white 0 0)",
          WebkitMaskComposite: "destination-out",
          maskComposite: "exclude"
        }}
      ></div>
      <div className="p-2 px-4 bg-secondary/10 backdrop-blur-md rounded-full motion-preset-focus motion-duration-2000">{children}</div>
    </div>
  );
};

export default BlurBadge;
