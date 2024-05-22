import { UserInfo } from "@/types";
import { makeAutoObservable } from "mobx";
import { enableStaticRendering } from "mobx-react-lite";
import { makePersistable } from "mobx-persist-store";

enableStaticRendering(typeof window === "undefined");

export class UserStore {
  userInfo: Partial<UserInfo> = {};
  showRegisterModal = false;
  showLoginModal = false;
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
  showRegister = () => {
    this.showRegisterModal = true;
  };
  hideRegister = () => {
    this.showRegisterModal = false;
  };
  showLogin = () => {
    this.showLoginModal = true;
  };
  hideLogin = () => {
    this.showLoginModal = false;
  };
}