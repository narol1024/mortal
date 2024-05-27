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
import { cluster } from "radash";

export const Works = observer(() => {
  const { user, profile } = useStores();
  const [pageNum, setPageNum] = useState(0);
  const hasLoadedFirstPageDataRef = useRef(false);
  const worksList = profile.worksList;
  const worksGroupList = cluster(worksList, 2);

  const loadMore = useCallback(() => {
    (async () => {
      try {
        const res = await fetch(
          `/api/my-works?secretKey=${user.userInfo.secretKey}&pageNum=${pageNum}&pageSize=10`,
          {
            cache: "no-store",
            method: "GET",
          }
        );
        const { result } = await res.json();
        if (result && result.length) {
          profile.updateWorksList(result);
        }
      } catch (error) {
        // TODO: handle this error
      }
    })();
  }, [user, profile, pageNum]);

  useEffect(() => {
    if (pageNum === 0) {
      // 默认reactStrictMode为true，React会执行两次，这里用ref处理一下首页数据
      if (hasLoadedFirstPageDataRef.current === false) {
        loadMore();
        hasLoadedFirstPageDataRef.current = true;
      }
    } else {
      loadMore();
    }
  }, [pageNum]);

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
      className="max-w-[560px]"
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              我的作品管理
            </ModalHeader>
            {worksGroupList.length === 0 ? (
              <ModalBody className="min-h-64 py-4">
                <Spinner />
              </ModalBody>
            ) : (
              <ModalBody className="block overflow-auto min-h-72 px-4 max-h-[80vh]">
                <Virtuoso
                  style={{ height: "560px" }}
                  totalCount={worksGroupList.length}
                  endReached={() => {
                    setPageNum(pageNum + 1);
                  }}
                  itemContent={(index) => {
                    const worksGroupItem = worksGroupList[index];
                    return (
                      <div className="gap-2 grid grid-cols-2 mb-2">
                        {worksGroupItem.map((worksItem) => {
                          return (
                            <WorksCard key={worksItem.id} {...worksItem} />
                          );
                        })}
                      </div>
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
