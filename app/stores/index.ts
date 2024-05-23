import { enableStaticRendering } from "mobx-react-lite";
import { UserStore } from "./UserStore";
import { NewsStore } from "./NewsStore";
import { LocationStore } from "./LocationStore";

enableStaticRendering(typeof window === "undefined");

export const RootStore = {
  user: new UserStore(),
  news: new NewsStore(),
  location: new LocationStore(),
};
