export interface HeroSectionContent {
  mainHeading: string;
  subHeading: string;
  buttonText: string;
  buttonLink?: string;
  backgroundImages: (string | File)[];
  scrollingTexts: string[];
  transitionDuration: number;
  active: boolean;
}
