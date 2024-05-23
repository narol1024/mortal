import { makeAutoObservable } from "mobx";

export class LocationStore {
  longitude: number = -1;
  latitude: number = -1;
  constructor() {
    makeAutoObservable(this);
  }
  updateLongitude = (longitude: number) => {
    this.longitude = longitude;
  };
  updateAltitude = (latitude: number) => {
    this.latitude = latitude;
  };
}
