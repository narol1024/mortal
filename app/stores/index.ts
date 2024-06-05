import { enableStaticRendering } from "mobx-react-lite";
import { UserStore } from "./UserStore";
import { NewsStore } from "./NewsStore";
import { ProfileStore } from "./ProfileStore";

enableStaticRendering(typeof window === "undefined");

export const RootStore = {
  user: new UserStore(),
  news: new NewsStore(),
  profile: new ProfileStore(),
};
