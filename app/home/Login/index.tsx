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
import { useLocalStorage, useCopyToClipboard } from "@uidotdev/usehooks";
import { getRandomString } from "../util";
import { UserData } from "../types";

const _defaultUsername = "Mortal_" + getRandomString();

export function Login() {
  const [username, setUsername] = useState<string>(_defaultUsername);
  const [loginMode, setLoginMode] = useState<"new" | "recover">("new");
  const [sk, setSk] = useState<string>("");
  const [_, copyToClipboard] = useCopyToClipboard();
  const [_2, saveUserData] = useLocalStorage<Omit<UserData, "id"> | null>(
    "user",
    null
  );
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isCopiedOpen,
    onOpen: onCopiedOpen,
    onOpenChange: onCopiedOpenChange,
  } = useDisclosure();
  const isNewLoginMode = loginMode === "new";
  return (
    <>
      <Button
        color="success"
        size="lg"
        variant="light"
        onClick={() => {
          setLoginMode("new");
          setSk(getRandomString(28));
          onOpen();
        }}
        className="w-full"
      >
        创建帐号
      </Button>
      <Button
        color="warning"
        size="lg"
        variant="light"
        onClick={() => {
          setLoginMode("recover");
          setSk("");
          onOpen();
        }}
        className="w-full"
      >
        找回帐号
      </Button>
      <Modal
        size="xs"
        placement="center"
        backdrop="blur"
        isOpen={isCopiedOpen}
        onOpenChange={onCopiedOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                复制成功
              </ModalHeader>
              <ModalBody>
                <p>请保存好你的密钥到本地，以便下次再次登录</p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  好的
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isOpen}
        size="lg"
        placement={"bottom"}
        onOpenChange={onOpenChange}
        isDismissable={false}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {isNewLoginMode ? "你的Mortal帐号" : "找回帐号"}
              </ModalHeader>
              <ModalBody>
                {isNewLoginMode && (
                  <Input
                    size="lg"
                    type="text"
                    placeholder="Mortal"
                    defaultValue={username}
                    onValueChange={setUsername}
                    isRequired
                    endContent={
                      <Button
                        variant="light"
                        color="default"
                        onClick={() => {
                          setUsername(getRandomString());
                        }}
                      >
                        随机生成
                      </Button>
                    }
                  />
                )}
                <Input
                  isReadOnly={isNewLoginMode}
                  size="lg"
                  type="text"
                  placeholder="你的个人秘钥"
                  defaultValue={sk}
                  onValueChange={setSk}
                  endContent={
                    isNewLoginMode && (
                      <Button
                        variant="light"
                        color="default"
                        onClick={() => {
                          copyToClipboard(sk);
                          onCopiedOpen();
                        }}
                      >
                        复制
                      </Button>
                    )
                  }
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  关闭
                </Button>
                <Button
                  color="primary"
                  onPress={async () => {
                    const res = await fetch(
                      isNewLoginMode ? "/api/add-user" : "/api/recover-user",
                      {
                        method: "POST",
                        body: JSON.stringify(
                          isNewLoginMode ? { username, sk } : { sk }
                        ),
                      }
                    );
                    const { result } = await res.json();
                    if (result) {
                      onClose();
                      saveUserData({
                        username: result.username,
                        sk: result.sk,
                      });
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
    </>
  );
}
