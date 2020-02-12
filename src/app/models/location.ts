export interface Location {
  name: string;
  placeType: string;
  summary: string;
  createdAt: Date;
  wheelChairAccessible: boolean;
  childFriendly: boolean;
  cheapEntry: boolean;
  freeEntry: boolean;
  thumbnail: string;
  latitude: number;
  longitude: number;
}
