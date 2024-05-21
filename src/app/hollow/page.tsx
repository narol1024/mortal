"use client";

import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  useDisclosure,
} from "@nextui-org/react";
import { Cobe } from "./cobe";
import { CameraIcon } from "./icons/CameraIcon";

export default function Hollow() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Cobe />
      <Button size="lg" variant="light" onClick={onOpen} className="w-full">
        在这里，分享你的新鲜事
      </Button>
      <Modal isOpen={isOpen} placement={"bottom"} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                告诉Mortal，你的新鲜事
              </ModalHeader>
              <ModalBody>
                <Input
                  size="lg"
                  type="text"
                  placeholder="Mortal"
                  endContent={
                    <Button variant="light" color="default">
                      随机生成
                    </Button>
                  }
                />
                <Input
                  size="lg"
                  type="text"
                  placeholder="温馨提示，再不睡头发就要掉光光喽。"
                />
                <Button
                  variant="ghost"
                  color="default"
                  startContent={<CameraIcon />}
                >
                  上传图片
                </Button>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  发送出去
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
