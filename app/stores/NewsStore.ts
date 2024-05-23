import { NewsData } from "@/types";
import { makeAutoObservable } from "mobx";

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
