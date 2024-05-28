"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
} from "@nextui-org/react";

import { useStores } from "@/hooks/useStores";
import { observer } from "mobx-react-lite";
import { useModal } from "@ebay/nice-modal-react";
import Message from "@/components/Message";

export const Login = observer(() => {
  const messageModal = useModal(Message);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [secretKey, setSecretKey] = useState("");
  const { user } = useStores();
  return (
    <Modal
      isOpen={user.loginModalVisible}
      size="lg"
      placement="bottom"
      onOpenChange={(isOpen) => {
        if (isOpen) {
          user.showLogin();
        } else {
          user.hideLogin();
        }
      }}
      isDismissable={false}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">登录</ModalHeader>
            <ModalBody className="flex items-center">
              <Textarea
                placeholder="请输入个人秘钥"
                value={secretKey}
                onValueChange={setSecretKey}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                关闭
              </Button>
              <Button
                isLoading={isLoginLoading}
                color="success"
                onPress={async () => {
                  try {
                    setIsLoginLoading(true);
                    const res = await fetch("/api/login", {
                      method: "POST",
                      body: JSON.stringify({ secretKey }),
                    });
                    const { result } = await res.json();
                    if (result.id) {
                      user.updateUserInfo(result);
                      messageModal.show({
                        type: "success",
                        content: "登录成功",
                      });
                      onClose();
                    } else {
                      messageModal.show({
                        type: "failure",
                        content: "登录失败",
                      });
                    }
                  } catch (error) {
                    messageModal.show({
                      type: "failure",
                      content: "登录失败",
                    });
                  } finally {
                    setIsLoginLoading(false);
                  }
                }}
              >
                确认
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
});
