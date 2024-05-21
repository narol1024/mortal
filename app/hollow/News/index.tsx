import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Spinner,
  useDisclosure,
} from "@nextui-org/react";
import { ExploreIcon } from "../icons/ExploreIcon";
import { NewsCard } from "../NewsCard";

export function News() {
  const [newsList, setNewsList] = useState<any[]>([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/news", {
        method: "GET",
      });
      const { result } = await res.json();
      if (result.length) {
        setNewsList(result);
      }
    })();
  }, []);
  return (
    <>
      <Button
        isIconOnly
        variant="light"
        aria-label="Explore"
        className="absolute top-0 left-0"
        onClick={onOpen}
      >
        <ExploreIcon width={32} height={32} />
      </Button>
      <Modal
        size="lg"
        placement="bottom"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                带着Mortal看世界
              </ModalHeader>
              {newsList.length === 0 ? (
                <ModalBody className="min-h-64 py-4">
                  <Spinner />
                </ModalBody>
              ) : (
                <ModalBody className="block overflow-auto min-h-16 py-4 max-h-96">
                  {newsList.map((news) => {
                    return <NewsCard key={news.id} {...news} />;
                  })}
                </ModalBody>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
