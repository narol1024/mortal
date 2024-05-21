"use client";

import React, { useState } from "react";
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
import { useLocalStorage } from "@uidotdev/usehooks";
import { CameraIcon } from "../icons/CameraIcon";
import { UserData } from "../types";

export function Publish() {
  const [content, setContent] = useState("温馨提示，再不睡头发就要掉光光喽。");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [userData] = useLocalStorage<UserData>("user");
  if (!userData) {
    return <></>;
  }
  return (
    <>
      <div className="flex justify-center flex-col gap-4">
        <p className="w-full text-center">{userData.username}，你好</p>
        <div className="flex justify-center">
          <Button size="lg" variant="ghost" onClick={onOpen}>
            去分享
          </Button>
        </div>
      </div>
      <Modal
        size="lg"
        isOpen={isOpen}
        placement={"bottom"}
        onOpenChange={onOpenChange}
      >
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
                  placeholder={content}
                  defaultValue={content}
                  onValueChange={setContent}
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
                  取消
                </Button>
                <Button
                  color="primary"
                  onPress={async () => {
                    let res = await fetch("/api/add-news", {
                      method: "POST",
                      body: JSON.stringify({
                        content: content,
                        sk: userData.sk,
                      }),
                    });
                    const { result } = await res.json();
                    if (result) {
                      onClose();
                    }
                  }}
                >
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
