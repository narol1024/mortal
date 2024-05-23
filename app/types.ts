export interface UserInfo {
  id: number;
  username: string;
  avatarId: number;
  secretKey: string;
}

export interface NewsData {
  id: string;
  username: string;
  avatarId: number;
  content: string;
  createdTime: number;
}
