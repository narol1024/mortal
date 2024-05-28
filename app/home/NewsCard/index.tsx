"use client";

import React from "react";
import {
  Card as RawCard,
  CardHeader,
  CardBody,
  Divider,
  Image,
} from "@nextui-org/react";
import dayjs from "dayjs";
import { NewsData } from "@/types";
import { avatars } from "@/constants";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

interface NewsCardProps extends NewsData {
  isLast?: boolean;
}

export const NewsCard = React.memo(function NewsCard(props: NewsCardProps) {
  const hasPicture = props.pictures.length > 0;
  let aspectRatio = 0;
  try {
    aspectRatio = props.pictureWidth / props.pictureHeight;
  } catch (error) {
    aspectRatio = 1;
  }
  return (
    <RawCard
      shadow="none"
      className={`flex flex-col mb-8 ${hasPicture ? "h-[280px]" : "h-[180px]"}`}
    >
      <CardHeader className="flex flex-shrink-0 gap-3 h-[40px]">
        <Image height={28} src={avatars[props.avatarId]} width={28} />
        <div className="flex flex-col">
          <p className="text-small">{props.username}</p>
          <p className="text-small text-default-500">
            {dayjs.utc(props.createdTime).local().format("YYYY/MM/DD HH:mm:ss")}
          </p>
        </div>
      </CardHeader>
      <CardBody className="flex flex-1 flex-col">
        <p className="flex-shrink-0 mb-2 text-sm line-clamp-3">
          {props.content}
        </p>
        {props.pictures[0] && (
          <div className="flex-1 overflow-hidden">
            <Image
              src={props.pictures[0]}
              className="object-cover h-full"
              classNames={{
                wrapper: "h-full",
              }}
              style={{
                aspectRatio,
              }}
            />
          </div>
        )}
      </CardBody>
      {!props.isLast && <Divider />}
    </RawCard>
  );
});
