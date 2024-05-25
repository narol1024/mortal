"use client";

import React, { useEffect } from "react";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Spinner,
} from "@nextui-org/react";
import { NewsCard } from "../NewsCard";
import { observer } from "mobx-react-lite";
import { useStores } from "@/hooks/useStores";

export const News = observer(() => {
  const { news } = useStores();

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/news", {
        cache: "no-store",
        method: "GET",
      });
      const { result } = await res.json();
      if (result && result.length) {
        news.updateNewsList(result);
      }
    })();
  }, []);

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
            {news.newsList.length === 0 ? (
              <ModalBody className="min-h-64 py-4">
                <Spinner />
              </ModalBody>
            ) : (
              <ModalBody className="block overflow-auto min-h-72 py-4 max-h-[60vh]">
                {news.newsList.map((news) => {
                  return <NewsCard key={news.id} {...news} />;
                })}
              </ModalBody>
            )}
          </>
        )}
      </ModalContent>
    </Modal>
  );
});
