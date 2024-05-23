import { UserStore } from "./UserStore";
import { NewsStore } from "./NewsStore";

export const RootStore = {
  user: new UserStore(),
  news: new NewsStore(),
};
