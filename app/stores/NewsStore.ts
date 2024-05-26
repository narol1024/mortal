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
  showNewList = false;
  constructor() {
    makeAutoObservable(this);
  }
  updateNewsList = (list: NewsData[]) => {
    this.newsList = this.newsList.concat(list);
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
  showNewListModal = () => {
    this.showNewList = true;
  };
  hideNewListModal = () => {
    this.showNewList = false;
  };
}
