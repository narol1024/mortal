import React, { useCallback, useState } from "react";
import { Textarea } from "@nextui-org/react";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { useModal } from "@ebay/nice-modal-react";
import Message from "@/components/Message";
import { Info as InfoIcon } from "lucide-react";

interface SecretKeyModalParams {
  publickKey: string;
  title?: string;
  copySuccessTitle?: string;
}

export function useSecretKeyModal() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const messageModal = useModal(Message);
  const messageModal2 = useModal(Message);
  const [, copyToClipboard] = useCopyToClipboard();

  const showSecretKeyModal = useCallback(
    ({
      publickKey,
      title = "提示",
      copySuccessTitle = "复制成功",
    }: SecretKeyModalParams) => {
      setIsModalVisible(true);
      messageModal.show({
        title,
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
              type: "success",
              title: copySuccessTitle,
              content: "请保存好你的密钥到本地，以便下次再次登录。",
            });
          }, 500);
          return Promise.resolve();
        },
      });
    },
    []
  );

  return { showSecretKeyModal, isModalVisible };
}
