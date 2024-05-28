import { UserInfo } from "@/types";
import { makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";

export class UserStore {
  userInfo: Partial<UserInfo> = {};
  registerModalVisible = false;
  loginModalVisible = false;
  constructor() {
    makeAutoObservable(this);
    if (global?.window !== undefined) {
      makePersistable(this, {
        name: "UserStore",
        properties: ["userInfo"],
        storage: window.localStorage,
      });
    }
  }
  updateUserInfo = (user: UserInfo) => {
    this.userInfo = user;
  };
  logout = () => {
    this.userInfo = {};
  };
  showRegister = () => {
    this.registerModalVisible = true;
  };
  hideRegister = () => {
    this.registerModalVisible = false;
  };
  showLogin = () => {
    this.loginModalVisible = true;
  };
  hideLogin = () => {
    this.loginModalVisible = false;
  };
}
