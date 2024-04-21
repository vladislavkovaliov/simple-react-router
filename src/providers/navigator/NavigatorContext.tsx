import React from "react";

import { INavigatorContextProps } from "./types";

export const NavigatorContext = React.createContext<INavigatorContextProps>({
  goBack: () => {},
  goNextTo: () => {},
  reset: () => {},
});
