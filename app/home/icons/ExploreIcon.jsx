import React from "react";

export const ExploreIcon = ({
  fill = "currentColor",
  height = 24,
  width = 24,
  ...props
}) => {
  return (
    <svg id="SvgjsSvg1012" width={width} height={height} {...props}>
      <defs id="SvgjsDefs1002"></defs>
      <g id="SvgjsG1008" transform="matrix(1,0,0,1,0,0)">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 29 29"
          width={width} height={height}
        >
          <circle
            cx="5"
            cy="5.5"
            r="2.5"
            fill="#ffffff"
          ></circle>
          <path
            fill="none"
            stroke="#ffffff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeWidth="2"
            d="M12.5 6h14"
          ></path>
          <circle
            cx="5"
            cy="14.5"
            r="2.5"
            fill="#ffffff"
          ></circle>
          <path
            fill="none"
            stroke="#ffffff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeWidth="2"
            d="M12.5 15h14"
          ></path>
          <circle
            cx="5"
            cy="23.5"
            r="2.5"
            fill="#ffffff"
          ></circle>
          <path
            fill="none"
            stroke="#ffffff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeWidth="2"
            d="M12.5 24h14"
          ></path>
        </svg>
      </g>
    </svg>
  );
};
