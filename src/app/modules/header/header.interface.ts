export interface IHeader {
  logo: {
    src: string;
    alt: string;
    url: string;
  };
  navItems: INavItem[];
  rightSideButton: INavItem;
}
export interface INavItem {
  name: string;
  url: string;
}
