declare global {
  interface Window {
    OSS: any;
  }
}

export interface UserInfo {
  id: number;
  username: string;
  avatarId: number;
  secretKey: string;
}

export interface NewsData {
  id: number;
  username: string;
  avatarId: number;
  content: string;
  picture: string;
  createdTime: number;
  longitude: number;
  latitude: number;
  pictureWidth: number;
  pictureHeight: number;
}

export interface WorksData {
  id: number;
  content: string;
  picture: string;
  createdTime: number;
  longitude: number;
  latitude: number;
}

export interface PictureMeta {
  url: string;
  file: File | null;
  uploaded: boolean;
  width: number;
  height: number;
}

export interface DraftData {
  content: string;
  picture: PictureMeta;
}
