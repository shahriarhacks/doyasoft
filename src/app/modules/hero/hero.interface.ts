import { IButton, IImage } from "../../../interfaces/common.type";

export interface IHero {
  eyebrow: string;
  title: string;
  description: string;
  left: IButton;
  right: IButton;
  banner: IImage;
  backgroundBanner: IImage;
  spiderBackground: IImage;
  playButton: IImage;
}
