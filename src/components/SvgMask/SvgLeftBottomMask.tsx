import * as React from "react";

interface SvgLeftBottomMaskProps extends React.SVGProps<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
}

const SvgLeftBottomMask: React.FC<SvgLeftBottomMaskProps> = ({ width = 323, height = 327, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="none" viewBox="0 0 323 327" {...props}>
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M323 327H0V0h.332C4.395 48.723 45.227 87 95 87h49c53.019 0 96 42.981 96 96v49c0 48.402 36.198 88.35 83 94.249z"
      clipRule="evenodd"
    ></path>
  </svg>
);

export default SvgLeftBottomMask;
