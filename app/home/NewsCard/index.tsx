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

export function NewsCard(props: NewsData) {
  return (
    <RawCard shadow="none" className="mb-8">
      <CardHeader className="flex gap-3">
        <Image height={28} src={avatars[props.avatarId]} width={28} />
        <div className="flex flex-col">
          <p className="text-small">{props.username}</p>
          <p className="text-small text-default-500">
            {dayjs.utc(props.createdTime).local().format("YYYY/MM/DD HH:mm:ss")}
          </p>
        </div>
      </CardHeader>
      <CardBody>
        <p className="mb-2">{props.content}</p>
        {props.pictures[0] && (
          <Image
            width={220}
            height={110}
            src={props.pictures[0]}
            className="object-contain"
          />
        )}
      </CardBody>
      <Divider />
    </RawCard>
  );
}
