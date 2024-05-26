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
  id: string;
  username: string;
  avatarId: number;
  content: string;
  pictures: string[];
  createdTime: number;
  longitude: number;
  latitude: number;
}

export interface DraftData {
  content: string;
  photoUrls: { uploaded: boolean; src: string; file: File | null }[];
}
