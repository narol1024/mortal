"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Spinner,
} from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { useStores } from "@/hooks/useStores";
import { NewsCard } from "../NewsCard";
import { Virtuoso } from "react-virtuoso";

export const News = observer(() => {
  const { news } = useStores();
  const [pageNum, setPageNum] = useState(0);
  const hasLoadedFirstPageDataRef = useRef(false);
  const newsList = news.newsList;

  const loadMore = useCallback(() => {
    (async () => {
      try {
        const res = await fetch(`/api/news?pageNum=${pageNum}&pageSize=10`, {
          cache: "no-store",
          method: "GET",
        });
        const { result } = await res.json();
        if (result && result.length) {
          news.updateNewsList(result);
        }
      } catch (error) {}
    })();
  }, [pageNum]);

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
      isOpen={news.showNewList}
      onOpenChange={(isOpen) => {
        if (isOpen) {
          news.showNewListModal();
        } else {
          news.hideNewListModal();
        }
      }}
      className="min-w-[60%]"
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              带着Mortal看世界
            </ModalHeader>
            {newsList.length === 0 ? (
              <ModalBody className="min-h-64 py-4">
                <Spinner />
              </ModalBody>
            ) : (
              <ModalBody className="block overflow-auto min-h-72 py-4 max-h-[80vh]">
                <Virtuoso
                  style={{ height: "560px" }}
                  totalCount={newsList.length}
                  endReached={() => {
                    setPageNum(pageNum + 1);
                  }}
                  itemContent={(index) => {
                    const newsItem = newsList[index];
                    return (
                      <NewsCard
                        key={newsItem.id}
                        isLast={index === newsList.length - 1}
                        {...newsItem}
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
