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
import { PictureMeta } from "@/types";

export const PictureUploader = observer(() => {
  const { news } = useStores();
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const hasPic = news.draft.picture.url;
  if (hasPic) {
    const currentPic = news.draft.picture;
    return (
      <div className="relative rounded-lg overflow-hidden">
        <Image
          width={110}
          height={60}
          // 多图支持
          src={currentPic.url}
          radius="none"
          className="object-cover z-0"
        />
        <Button
          variant="light"
          className="flex justify-end absolute z-10 bottom-0 right-0 bg-gradient-to-t from-black w-full px-2 py-2 cursor-pointer rounded-none"
          onClick={() => {
            news.updateDraft({
              picture: {
                file: null,
                uploaded: false,
                url: "",
                width: 0,
                height: 0,
              },
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
              const _image = new window.Image();
              _image.src = base64Url;
              _image.onload = () => {
                news.updateDraft({
                  picture: {
                    file,
                    uploaded: false,
                    url: base64Url,
                    width: _image.width,
                    height: _image.height,
                  },
                });
              };
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
  const { user, news,  } = useStores();
  const location = user.location;
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
                  <PictureUploader />
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
                      const { picture } = draft;
                      let _picture: PictureMeta = picture;
                      if (content.trim() === "") {
                        messageModal.show({
                          type: "failure",
                          content: "请输入需要发布的内容",
                        });
                        return;
                      }
                      // TODO: 多图支持
                      const currentPic = picture;
                      if (
                        currentPic &&
                        !currentPic.uploaded &&
                        currentPic.file
                      ) {
                        try {
                          const file = currentPic.file;
                          const response = await uploadFileOnAliCloudOSS(file);
                          const rawPicture = picture;
                          _picture = {
                            ...rawPicture,
                            uploaded: true,
                            url: response.url,
                            file: null,
                          };
                          news.updateDraft({
                            picture: _picture,
                          });
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
                          picture: _picture.url,
                          pictureWidth: _picture.width,
                          pictureHeight: _picture.height,
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
