import { DraftData, NewsData } from "@/types";
import { makeAutoObservable } from "mobx";
import { unique } from "radash";

const draftData = {
  content: "",
  photoUrls: [],
};

export class NewsStore {
  isPosting = false;
  draft: DraftData = draftData;
  newsList: NewsData[] = [];
  newListModalVisible = false;
  constructor() {
    makeAutoObservable(this);
  }
  addNewsList = (list: NewsData[]) => {
    this.newsList.push(...list);
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
    this.newListModalVisible = true;
  };
  hideNewListModal = () => {
    this.newListModalVisible = false;
  };
}
