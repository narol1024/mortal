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
import { Check as CheckIcon } from "lucide-react";
import { X as XIcon } from "lucide-react";
import { isString } from "radash";
import { commonColors } from "@nextui-org/theme";
import { noop } from "@/util/noop";

interface MessageProps {
  title?: string;
  type: "default" | "success" | "failure";
  content?: string | React.ReactNode;
  cancelText?: string;
  confirmText?: string;
  confirmColor?:
    | "default"
    | "success"
    | "primary"
    | "danger"
    | "secondary"
    | "warning";
  cancelColor?:
    | "default"
    | "success"
    | "primary"
    | "danger"
    | "secondary"
    | "warning";
  onCancel?: (e?: any) => void | Promise<void>;
  onConfirm?: (e?: any) => void | Promise<void>;
  showCancelButton?: boolean;
}

export default NiceModal.create((props: MessageProps) => {
  const modal = useModal();
  const {
    title,
    content,
    type = "default",
    cancelText = "取消",
    confirmText = "好的",
    confirmColor = "primary",
    cancelColor = "danger",
    showCancelButton = false,
    onCancel = noop,
    onConfirm = noop,
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
                    <CheckIcon
                      width={28}
                      height={28}
                      color={commonColors.green[500]}
                    />
                  )}
                  {type === "failure" && (
                    <XIcon
                      width={28}
                      height={28}
                      color={commonColors.red[500]}
                    />
                  )}
                  <p className="text-base">{content}</p>
                </div>
              ) : (
                content
              )}
            </ModalBody>
            <ModalFooter>
              {showCancelButton && (
                <Button
                  color={cancelColor}
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
                color={confirmColor}
                onPress={async () => {
                  await onConfirm();
                  _onClose();
                }}
              >
                {confirmText}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
});
