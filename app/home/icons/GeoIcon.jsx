

import React from "react";

export const GeoIcon = ({
  color = "#ffffff",
  height = 24,
  width = 24,
  ...props
}) => {
  return (
    <svg width={width} height={height} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill={color} {...props}>
        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
    </svg>
  );
};