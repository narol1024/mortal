import { DraftData, NewsData } from "@/types";
import { makeAutoObservable } from "mobx";

const draftData: DraftData = {
  content: "",
  picture: {
    file: null,
    url: "",
    uploaded: false,
    width: 0,
    height: 0,
  },
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
    this.newListModalVisible = true;
  };
  hideNewListModal = () => {
    this.newListModalVisible = false;
  };
}
