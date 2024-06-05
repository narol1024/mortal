import { UserInfo } from "@/types";
import { makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";

export class UserStore {
  userInfo: Partial<UserInfo> = {};
  registerModalVisible = false;
  loginModalVisible = false;
  location: {
    longitude: number;
    latitude: number;
  } = {
    longitude: -1,
    latitude: -1,
  }
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
  updateLocation = (longitude: number, latitude: number) => {
    this.location = {
      longitude,
      latitude,
    };
  };
}
