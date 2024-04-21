import React from "react";
export const NavigatorContext = React.createContext({
    goBack: () => { },
    goNextTo: () => { },
    reset: () => { },
});
