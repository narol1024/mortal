import { WorksData } from "@/types";
import { makeAutoObservable } from "mobx";

export class ProfileStore {
  worksListModalVisible = false;
  worksList: WorksData[] = [];
  constructor() {
    makeAutoObservable(this);
  }
  updateWorksList = (list: WorksData[]) => {
    this.worksList = this.worksList.concat(list);
  };
  showWorksListModal = () => {
    this.worksListModalVisible = true;
  };
  hideWorksListModal = () => {
    this.worksListModalVisible = false;
  };
}
