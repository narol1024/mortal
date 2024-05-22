"use client";

import React, { useCallback, useEffect, useState } from "react";
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
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { getRandomString } from "@/util/randomString";
import { getRangeNumber } from "@/util/rangeNumber";
import { useModal } from "@ebay/nice-modal-react";
import Message from "../Message";
import { InfoIcon } from "../icons/InfoIcon";
import { observer } from "mobx-react-lite";
import { useStores } from "@/hooks/userStores";

import { avatars } from "@/constants";

const _defaultUsername = "Mortal_" + getRandomString();

export const Register = observer(() => {
  const messageModal = useModal(Message);
  const messageModal2 = useModal(Message);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [avatarId, setAvatarId] = useState(getRangeNumber(0, 5));
  const [username, setUsername] = useState<string>(_defaultUsername);
  const [_, copyToClipboard] = useCopyToClipboard();

  const { user } = useStores();

  const onRegisterSuccess = useCallback((publickKey: string) => {
    messageModal.show({
      title: "提示",
      content: (
        <>
          <Textarea defaultValue={publickKey} className="max-w-xs" />
          <div className="flex flex-row gap-1">
            <InfoIcon width={16} height={16} color="orange" />
            <p className="text-xs">请保存好密钥到本地，以便下次再次登录。</p>
          </div>
        </>
      ),
      showCancelButton: true,
      cancelText: "关闭",
      okText: "复制",
      onOk: async () => {
        copyToClipboard(publickKey);
        setTimeout(() => {
          messageModal2.show({
            title: "注册成功",
            content: "请保存好你的密钥到本地，以便下次再次登录。",
          });
        }, 500);
        return Promise.resolve();
      },
    });
  }, []);
  return (
    <Modal
      isOpen={user.showRegisterModal}
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
                  src={avatars[avatarId]}
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
                        setUsername("Mortal_" + getRandomString());
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
                      onRegisterSuccess(result.secretKey);
                    } else {
                      messageModal.show({
                        title: "注册失败",
                        content:
                          "看起来注册过程中发生了一点小波折。请仔细检查您的信息是否有误。",
                      });
                    }
                  } catch (error) {
                    messageModal.show({
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
