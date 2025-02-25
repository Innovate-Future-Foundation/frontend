import * as React from "react";

interface SvgRightTopMaskProps extends React.SVGProps<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
}

const SvgRightTopMask: React.FC<SvgRightTopMaskProps> = ({ width = 323, height = 327, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="none" viewBox="0 0 323 327" {...props}>
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M0 0h323v327h-.332c-4.063-48.723-44.895-87-94.668-87h-49c-53.019 0-96-42.981-96-96V95C83 46.598 46.802 6.65 0 .75z"
      clipRule="evenodd"
    ></path>
  </svg>
);

export default SvgRightTopMask;
