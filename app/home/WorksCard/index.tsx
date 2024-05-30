"use client";

import React from "react";
import {
  Card as RawCard,
  CardBody,
  Image,
  Divider,
  Button,
  commonColors,
} from "@nextui-org/react";
import dayjs from "dayjs";
import { WorksData } from "@/types";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { Trash2 as TrashIcon } from "lucide-react";
import { noop } from "@/util/noop";
import logo from "@/assets/logo.png";

dayjs.extend(utc);
dayjs.extend(timezone);

interface WorksCardProps extends WorksData {
  onRemove?: () => void;
  isLast?: boolean;
}

export const WorksCard = React.memo(function NewsCard(props: WorksCardProps) {
  const { onRemove = noop } = props;
  return (
    <RawCard radius="sm" shadow="none" className="border-none">
      <CardBody className="flex flex-row overflow-visible gap-4">
        <Image
          shadow="sm"
          radius="sm"
          className="object-cover h-[110px] w-[90px]"
          src={props.picture || logo.src}
        />
        <div className="flex flex-col flex-1 justify-between gap-2">
          <div>
            <p className="text-sm line-clamp-2 w-full">{props.content}</p>
            <p className="text-sm text-default-500">
              {dayjs
                .utc(props.createdTime)
                .local()
                .format("YYYY/MM/DD HH:mm:ss")}
            </p>
          </div>
          <Button
            isIconOnly
            variant="light"
            aria-label="Like"
            onPress={() => {
              onRemove();
            }}
          >
            <TrashIcon size={20} color={commonColors.red[500]} />
          </Button>
        </div>
      </CardBody>
      {!props.isLast && <Divider className="mt-2 mb-2" />}
    </RawCard>
  );
});
