"use client";

import React from "react";
import {
  Card as RawCard,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@nextui-org/react";
import dayjs from "dayjs";
import { NewsData } from "@/types";
import { avatars } from "@/constants";

export function NewsCard(props: NewsData) {
  return (
    <RawCard shadow="none" className="mb-8">
      <CardHeader className="flex gap-3">
        <Image height={28} src={avatars[props.avatarId]} width={28} />
        <div className="flex flex-col">
          <p className="text-small">{props.username}</p>
          <p className="text-small text-default-500">
            {dayjs(props.createdtime).format("YYYY/MM/DD HH:mm:ss")}
          </p>
        </div>
      </CardHeader>
      <CardBody>
        <p>{props.content}</p>
      </CardBody>
      <Divider />
    </RawCard>
  );
}
