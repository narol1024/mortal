"use client";

import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Avatar,
  Textarea,
} from "@nextui-org/react";
import { getRandomString } from "@/util/randomString";
import { getRangeNumber } from "@/util/rangeNumber";
import { useModal } from "@ebay/nice-modal-react";
import Message from "@/components/Message";
import { observer } from "mobx-react-lite";
import { useStores } from "@/hooks/useStores";
import { useSecretKeyModal } from "@/hooks/useSecretKey";

import { avatars } from "@/constants";

function getRandomUsername() {
  return "Mortal_" + getRandomString();
}

function getRandomAvatarId() {
  return getRangeNumber(0, 5);
}

export const Register = observer(() => {
  const messageModal = useModal(Message);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [avatarId, setAvatarId] = useState(-1);
  const [username, setUsername] = useState("");
  const { showSecretKeyModal } = useSecretKeyModal();
  const { user } = useStores();

  useEffect(() => {
    setUsername(getRandomUsername());
    setAvatarId(getRandomAvatarId());
  }, [user.registerModalVisible]);

  return (
    <Modal
      isOpen={user.registerModalVisible}
      size="lg"
      placement={"bottom"}
      onOpenChange={(isOpen) => {
        if (isOpen) {
          user.showRegister();
        } else {
          user.hideRegister();
        }
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              注册你的Mortal帐号
            </ModalHeader>
            <ModalBody className="flex items-center">
              <>
                <Avatar
                  className="w-40 h-40 text-large"
                  src={avatars[avatarId] || ""}
                />
                <Input
                  size="lg"
                  type="text"
                  placeholder="Mortal"
                  value={username}
                  onValueChange={setUsername}
                  isRequired
                  endContent={
                    <Button
                      variant="light"
                      color="default"
                      onClick={() => {
                        setUsername(getRandomUsername());
                        setAvatarId(getRandomAvatarId());
                      }}
                    >
                      随机生成
                    </Button>
                  }
                />
              </>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                关闭
              </Button>
              <Button
                color="success"
                isLoading={isRegisterLoading}
                onPress={async () => {
                  try {
                    setIsRegisterLoading(true);
                    const res = await fetch("/api/add-user", {
                      method: "POST",
                      body: JSON.stringify({ username, avatarId }),
                    });
                    const { result } = await res.json();
                    if (result.id) {
                      onClose();
                      user.updateUserInfo(result);
                      showSecretKeyModal({
                        publickKey: result.secretKey,
                        title: "注册成功",
                      });
                    } else {
                      messageModal.show({
                        type: "failure",
                        title: "注册失败",
                        content:
                          "看起来注册过程中发生了一点小波折。请仔细检查您的信息是否有误。",
                      });
                    }
                  } catch (error) {
                    messageModal.show({
                      type: "failure",
                      title: "注册失败",
                      content:
                        "看起来注册过程中发生了一点小波折。请仔细检查您的信息是否有误。",
                    });
                  } finally {
                    setIsRegisterLoading(false);
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
