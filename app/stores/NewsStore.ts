import { NewsData } from "@/types";
import { makeAutoObservable } from "mobx";
import { enableStaticRendering } from "mobx-react-lite";

enableStaticRendering(typeof window === "undefined");

export class NewsStore {
  newsList: NewsData[] = [];
  showPublishModal = false;
  constructor() {
    makeAutoObservable(this);
  }
  updateNewsList = (list: NewsData[]) => {
    // TODO: 多页
    this.newsList = [...list];
  };
  showPublish = () => {
    this.showPublishModal = true;
  };
  hidePublish = () => {
    this.showPublishModal = false;
  };
}
