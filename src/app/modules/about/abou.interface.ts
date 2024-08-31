import { IButton, IImage } from "../../../interfaces/common.type";

export interface IAbout {
  eyebrow: string;
  title: string;
  description: string;
  services: IService[];
  director: IDirector;
  button: IButton;
  leftImage: IImage;
  rightImage: IImage;
  playButton: IImage;
  dotShape: IImage;
  circleShape: IImage;
  rectangleShape: IImage;
  layShape: IImage;
}

export interface IService {
  title: string;
  image: IImage;
}
export interface IDirector {
  name: string;
  designation: string;
  image: IImage;
  sign: IImage;
}
