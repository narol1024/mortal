"use client";

import React from "react";
import {
  Card as RawCard,
  CardBody,
  Image,
  CardFooter,
} from "@nextui-org/react";
import dayjs from "dayjs";
import { WorksData } from "@/types";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

interface WorksCardProps extends WorksData {}

export const WorksCard = React.memo(function NewsCard(props: WorksCardProps) {
  const hasPicture = props.pictures.length > 0;
  return (
    <RawCard radius="sm" className="border-none">
      <Image
        shadow="sm"
        radius="none"
        width="100%"
        className="w-full object-cover aspect-[1/1.3]"
        src={props.pictures[0]}
      />
      <CardFooter className="justify-between py-1 absolute bottom-0 z-10 bg-gradient-to-t from-black to-transparent">
        <p className="flex-shrink-0 mb-2 text-sm line-clamp-3 w-full">
          {props.content}
        </p>
      </CardFooter>
    </RawCard>
  );
});
