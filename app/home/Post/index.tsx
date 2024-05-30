"use client";

import React, { useRef, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
  Image,
} from "@nextui-org/react";
import { uploadFileOnAliCloudOSS } from "@/util/uploadFile";
import { ImageUp as ImageUpIcon } from "lucide-react";
import { Trash2 as TrashIcon } from "lucide-react";
import { observer } from "mobx-react-lite";
import { useModal } from "@ebay/nice-modal-react";
import Message from "@/components/Message";
import { useStores } from "@/hooks/useStores";
import { commonColors } from "@nextui-org/theme";

export const PhotoUploader = observer(() => {
  const { news } = useStores();
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const hasPhotos = news.draft.photoUrls.length > 0;
  if (hasPhotos) {
    const currentPhoto = news.draft.photoUrls[0];
    return (
      <div className="relative rounded-lg overflow-hidden">
        <Image
          width={110}
          height={60}
          // 多图支持
          src={currentPhoto.src}
          radius="none"
          className="object-cover z-0"
        />
        <Button
          variant="light"
          className="flex justify-end absolute z-10 bottom-0 right-0 bg-gradient-to-t from-black w-full px-2 py-2 cursor-pointer rounded-none"
          onClick={() => {
            news.updateDraft({
              photoUrls: [],
            });
          }}
        >
          <TrashIcon size={20} color={commonColors.red[500]} />
        </Button>
      </div>
    );
  }
  return (
    <>
      <input
        type="file"
        onChange={(event) => {
          const file = event.target.files?.[0];
          const reads = new FileReader();
          if (file) {
            reads.readAsDataURL(file);
            reads.onload = (e) => {
              const base64Url = e.target?.result as string;
              news.updateDraft({
                photoUrls: [
                  {
                    file,
                    uploaded: false,
                    src: base64Url,
                  },
                ],
              });
            };
          }
        }}
        ref={hiddenFileInput}
        className="hidden"
      />
      <Button
        size="md"
        variant="ghost"
        color="default"
        startContent={<ImageUpIcon size={20} />}
        onPress={() => {
          hiddenFileInput.current?.click();
        }}
      >
        图片
      </Button>
    </>
  );
});

export const Post = observer(() => {
  const [isPublishLoading, setIsPublishLoading] = useState(false);
  const { user, news, location } = useStores();
  const draft = news.draft;
  const messageModal = useModal(Message);
  const userInfo = user.userInfo;

  return (
    <>
      <Modal
        size="lg"
        isOpen={news.isPosting}
        placement={"bottom"}
        className="min-w-[60%]"
        onOpenChange={(isOpen) => {
          if (isOpen) {
            news.showPostingModal();
          } else {
            news.hidePostingModal();
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
                  placeholder="温馨提示，再不睡头发就要掉光光喽。"
                  value={draft.content || ""}
                  onValueChange={(value) => {
                    news.updateDraft({
                      content: value,
                    });
                  }}
                />
                <div className="flex gap-2 justify-between items-center">
                  <PhotoUploader />
                </div>
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
                      const { content } = draft;
                      let { photoUrls } = draft;
                      if (content.trim() === "") {
                        messageModal.show({
                          type: "failure",
                          content: "请输入需要发布的内容",
                        });
                        return;
                      }
                      // 多图支持
                      const currentPhoto = photoUrls[0];
                      if (
                        currentPhoto &&
                        !currentPhoto.uploaded &&
                        currentPhoto.file
                      ) {
                        try {
                          const file = currentPhoto.file;
                          const response = await uploadFileOnAliCloudOSS(file);
                          photoUrls = [
                            {
                              file: null,
                              uploaded: true,
                              src: response.url,
                            },
                          ];
                        } catch (error) {
                          messageModal.show({
                            type: "failure",
                            content: "上传图片失败，请重新上传",
                          });
                          return;
                        }
                      }
                      const res = await fetch("/api/add-news", {
                        method: "POST",
                        body: JSON.stringify({
                          content: content,
                          pictures: photoUrls.map((v) => v.src),
                          secretKey: userInfo.secretKey,
                          longitude: location.longitude,
                          latitude: location.latitude,
                        }),
                      });
                      const { result } = await res.json();
                      if (result) {
                        onClose();
                        messageModal.show({
                          type: "success",
                          content: "发布成功",
                        });
                        news.clearDraft();
                      } else {
                        messageModal.show({
                          type: "failure",
                          content: "发布失败",
                        });
                      }
                    } catch (error) {
                      messageModal.show({
                        type: "failure",
                        content: "发布失败",
                      });
                    } finally {
                      setIsPublishLoading(false);
                    }
                  }}
                >
                  发送
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
});
