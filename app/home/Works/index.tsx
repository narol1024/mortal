"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Spinner,
} from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { useStores } from "@/hooks/useStores";
import { WorksCard } from "../WorksCard";
import { Virtuoso } from "react-virtuoso";
import { useModal } from "@ebay/nice-modal-react";
import Message from "@/components/Message";
import { EmptyTip } from "@/components/EmptyTip";

let abortController: AbortController;

export const Works = observer(() => {
  const messageModal = useModal(Message);
  const { user, profile } = useStores();
  const [pageNum, setPageNum] = useState(0);
  const worksList = profile.worksList;
  const hasWorksList = worksList.length > 0;
  const [showLoading, setShowLoading] = useState(false);

  const loadMore = useCallback(async () => {
    try {
      if (showLoading) {
        return;
      }
      abortController = new AbortController();
      const res = await fetch(
        `/api/user-works?secretKey=${user.userInfo.secretKey}&pageNum=${pageNum}&pageSize=10`,
        {
          cache: "no-store",
          method: "GET",
          signal: abortController.signal,
        }
      );
      const { result } = await res.json();
      if (result && result.length) {
        profile.addWorksList(result);
      }
      setShowLoading(false);
    } catch (error) {
      // TODO: handle this error
    }
  }, [user, profile, pageNum, showLoading]);

  useEffect(() => {
    setShowLoading(true);
    loadMore();
    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <Modal
      placement="bottom"
      isOpen={profile.worksListModalVisible}
      onOpenChange={(isOpen) => {
        if (isOpen) {
          profile.showWorksListModal();
        } else {
          profile.hideWorksListModal();
        }
      }}
      className="max-w-[520px]"
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              我的作品管理
            </ModalHeader>
            {!hasWorksList && (
              <ModalBody className="min-h-64 py-4">
                {showLoading ? <Spinner /> : <EmptyTip />}
              </ModalBody>
            )}
            {hasWorksList && (
              <ModalBody className="block overflow-auto py-4 px-0">
                <Virtuoso
                  style={{ height: "460px" }}
                  totalCount={worksList.length}
                  endReached={() => {
                    setShowLoading(true);
                    setPageNum(pageNum + 1);
                  }}
                  itemContent={(index) => {
                    const worksItem = worksList[index];
                    return (
                      <WorksCard
                        key={worksItem.id}
                        isLast={index === worksList.length - 1}
                        onRemove={() => {
                          messageModal.show({
                            title: "确定要删除该作品吗？",
                            showCancelButton: true,
                            confirmText: "确定",
                            confirmColor: "danger",
                            cancelColor: "default",
                            onConfirm: async () => {
                              try {
                                const res = await fetch("/api/delete-works", {
                                  method: "POST",
                                  body: JSON.stringify({
                                    secretKey: user.userInfo.secretKey,
                                    id: worksItem.id,
                                  }),
                                });
                                const { result } = await res.json();
                                if (result) {
                                  profile.deleteWorks(worksItem.id);
                                } else {
                                  messageModal.show({
                                    type: "failure",
                                    content: "删除失败",
                                  });
                                }
                              } catch (error) {
                                messageModal.show({
                                  type: "failure",
                                  content: "删除失败",
                                });
                              }
                            },
                          });
                        }}
                        {...worksItem}
                      />
                    );
                  }}
                />
              </ModalBody>
            )}
          </>
        )}
      </ModalContent>
    </Modal>
  );
});
