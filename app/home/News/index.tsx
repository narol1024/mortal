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
import { NewsCard } from "../NewsCard";
import { Virtuoso } from "react-virtuoso";
import { EmptyTip } from "@/components/EmptyTip";

let abortController: AbortController;

export const News = observer(() => {
  const { news } = useStores();
  const [pageNum, setPageNum] = useState(0);
  const newsList = news.newsList;
  const hasNewsList = newsList.length > 0;
  const [showLoading, setShowLoading] = useState(false);

  const loadMore = useCallback(async () => {
    try {
      abortController = new AbortController();
      const res = await fetch(`/api/news?pageNum=${pageNum}&pageSize=5`, {
        cache: "no-store",
        method: "GET",
        signal: abortController.signal,
      });
      const { result } = await res.json();
      if (result && result.length) {
        news.addNewsList(result);
      }
      setShowLoading(false);
    } catch (error) {
      // TODO: handle this error
    }
  }, [pageNum, news]);

  useEffect(() => {
    setShowLoading(true);
    loadMore();
    return () => {
      abortController.abort();
    };
  }, [pageNum]);
  return (
    <Modal
      placement="bottom"
      isOpen={news.newListModalVisible}
      onOpenChange={(isOpen) => {
        if (isOpen) {
          news.showNewListModal();
        } else {
          news.hideNewListModal();
        }
      }}
      className="max-w-[560px]"
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              带着Mortal看世界
            </ModalHeader>
            {!hasNewsList && (
              <ModalBody className="min-h-64 py-4">
                {showLoading ? <Spinner /> : <EmptyTip />}
              </ModalBody>
            )}
            {hasNewsList && (
              <ModalBody className="block overflow-auto py-0 pt-4 px-0">
                <Virtuoso
                  style={{ height: "460px" }}
                  totalCount={newsList.length}
                  endReached={() => {
                    setPageNum(pageNum + 1);
                    setShowLoading(true);
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
