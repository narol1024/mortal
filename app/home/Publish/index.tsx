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
  Textarea,
} from "@nextui-org/react";
import { CameraIcon } from "../icons/CameraIcon";
import { observer } from "mobx-react-lite";
import { useModal } from "@ebay/nice-modal-react";
import Message from "../Message";
import { useStores } from "@/hooks/useStores";

export const Publish = observer(() => {
  const [isPublishLoading, setIsPublishLoading] = useState(false);
  const [content, setContent] = useState("温馨提示，再不睡头发就要掉光光喽。");
  const messageModal = useModal(Message);
  const { user, news } = useStores();
  const userInfo = user.userInfo;

  return (
    <>
      <Modal
        size="lg"
        isOpen={news.showPublishModal}
        placement={"bottom"}
        onOpenChange={(isOpen) => {
          if (isOpen) {
            news.showPublish();
          } else {
            news.hidePublish();
          }
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                告诉Mortal，你的新鲜事
              </ModalHeader>
              <ModalBody>
                <Textarea
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
                  isLoading={isPublishLoading}
                  color="primary"
                  onPress={async () => {
                    try {
                      setIsPublishLoading(true);
                      let res = await fetch("/api/add-news", {
                        method: "POST",
                        body: JSON.stringify({
                          content: content,
                          secretKey: userInfo.secretKey,
                        }),
                      });
                      const { result } = await res.json();
                      if (result) {
                        onClose();
                        messageModal.show({
                          content: "发布成功",
                        });
                      } else {
                        messageModal.show({
                          content: "发布失败",
                        });
                      }
                    } catch (error) {
                      messageModal.show({
                        content: "发布失败",
                      });
                    } finally {
                      setIsPublishLoading(false);
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
});
