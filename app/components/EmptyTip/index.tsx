"use client";

import React, { useEffect } from "react";
import { TriangleAlert as TriangleAlertIcon } from "lucide-react";
import { commonColors } from "@nextui-org/theme";

export const EmptyTip = () => {
  return (
    <div className="flex flex-col w-full justify-center items-center gap-4">
      <TriangleAlertIcon size={50} className="text-default-500" />
      <p className="text-default-500 text-sm">列表空空如也</p>
    </div>
  );
};
