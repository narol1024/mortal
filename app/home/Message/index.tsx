"use client";

import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { OKIcon } from "../icons/OKIcon";
import { ErrorIcon } from "../icons/ErrorIcon";
import { isString } from "radash";
import { commonColors } from "@nextui-org/theme";

interface MessageProps {
  title?: string;
  type: "default" | "success" | "failure";
  content?: string | React.ReactNode;
  cancelText?: string;
  okText?: string;
  onCancel?: (e?: any) => void | Promise<void>;
  onOk?: (e?: any) => void | Promise<void>;
  showCancelButton?: boolean;
}

function noop() {}

export default NiceModal.create((props: MessageProps) => {
  const modal = useModal();
  const {
    title,
    content,
    type = "default",
    cancelText = "取消",
    okText = "好的",
    showCancelButton = false,
    onCancel = noop,
    onOk = noop,
  } = props;
  return (
    <Modal
      size="xs"
      placement="center"
      backdrop="blur"
      isOpen={modal.visible}
      onOpenChange={(isOpen) => {
        if (isOpen) {
          modal.show();
        } else {
          modal.hide();
        }
      }}
    >
      <ModalContent>
        {(_onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>
              {isString(content) ? (
                <div className="flex flex-row items-center gap-2">
                  {type === "success" && (
                    <OKIcon
                      width={28}
                      height={28}
                      color={commonColors.green[500]}
                    />
                  )}
                  {type === "failure" && (
                    <ErrorIcon
                      width={28}
                      height={28}
                      color={commonColors.red[500]}
                    />
                  )}
                  <p>{content}</p>
                </div>
              ) : (
                content
              )}
            </ModalBody>
            <ModalFooter>
              {showCancelButton && (
                <Button
                  color="danger"
                  variant="light"
                  onPress={async () => {
                    await onCancel();
                    _onClose();
                  }}
                >
                  {cancelText}
                </Button>
              )}
              <Button
                color="primary"
                onPress={async () => {
                  await onOk();
                  _onClose();
                }}
              >
                {okText}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
});
