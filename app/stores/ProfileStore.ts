import { WorksData } from "@/types";
import { makeAutoObservable } from "mobx";

export class ProfileStore {
  worksListModalVisible = false;
  worksList: WorksData[] = [];
  constructor() {
    makeAutoObservable(this);
  }
  addWorksList = (list: WorksData[]) => {
    this.worksList.push(...list);
  };
  deleteWorks = (id: number) => {
    this.worksList = this.worksList.filter((work) => work.id !== id);
  };
  showWorksListModal = () => {
    this.worksListModalVisible = true;
  };
  hideWorksListModal = () => {
    this.worksListModalVisible = false;
  };
}
