import React, { ComponentProps } from "react";
export interface INavigatorContextProps {
  goBack: () => void;
  goNextTo: (screenName: string) => void;
  reset: () => void;
}
export interface INavigatorProviderProps {
  children: React.JSX.Element[];
  fallbackRouteName?: string;
  onScreenChange?: ({
    currScreenName,
    prevScreenName,
  }: {
    currScreenName: string;
    prevScreenName: string;
  }) => void;
  fallback?: null;
  ViewsWrapper?: React.ComponentType<any>;
}
export interface INavigatorScreenProps {
  component: React.ComponentType<any>;
  name: string;
  props?: ComponentProps<any>;
}
export interface IScreenProps extends INavigatorScreenProps {
  key: string;
}
export type INavigatorScreenComponentProps = Pick<IScreenProps, "props"> & {
  isScreenActive: boolean;
};
