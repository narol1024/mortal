import { DraftData, NewsData } from "@/types";
import { makeAutoObservable } from "mobx";

const draftData = {
  content: "",
  photoUrls: [],
};

export class NewsStore {
  isPosting = false;
  draft: DraftData = draftData;
  newsList: NewsData[] = [];
  constructor() {
    makeAutoObservable(this);
  }
  updateNewsList = (list: NewsData[]) => {
    // TODO: 多页
    this.newsList = [...list];
  };
  updateDraft = (draft: Partial<DraftData>) => {
    this.draft = {
      ...this.draft,
      ...draft,
    };
  };
  clearDraft = () => {
    this.draft = draftData;
  };
  showPostingModal = () => {
    this.isPosting = true;
  };
  hidePostingModal = () => {
    this.isPosting = false;
  };
}
