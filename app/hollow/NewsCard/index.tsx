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
import avatar from "@/assets/logo.png";
import { NewsData } from "../types";

export function NewsCard(props: NewsData) {
  return (
    <RawCard shadow="none">
      <CardHeader className="flex gap-3">
        <Image height={28} src={avatar.src} width={28} />
        <div className="flex flex-col">
          <p className="text-small">{props.username}</p>
          <p className="text-small text-default-500">
            {dayjs(props.createdtime).format("YYYY/MM/DD HH:mm:ss")}
          </p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>{props.content}</p>
      </CardBody>
    </RawCard>
  );
}
