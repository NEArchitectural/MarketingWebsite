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
  firstParagraph: string;
  secondParagraph: string;
  thirdParagraph: string;
  imageURLs: string [];
  latitude: number;
  longitude: number;
  likes: number;
}
