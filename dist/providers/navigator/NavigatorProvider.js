import { jsx as _jsx } from "react/jsx-runtime";
import React, { useCallback, useState, useMemo, useEffect } from "react";
import { NavigatorContext } from "./NavigatorContext";
import { NavigatorScreen } from "./NavigatorScreen";
import { usePrevious } from "../../hooks";
export const NavigatorProvider = ({ children, fallback = null, onScreenChange, fallbackRouteName, ViewsWrapper = React.Fragment, }) => {
    const [stack, setStack] = useState([]);
    const previousStack = usePrevious(stack);
    const registeredScreens = useMemo(() => {
        return React.Children.toArray(children)
            .filter((child) => typeof child !== "string" || typeof child !== "number")
            .filter((child) => child.type === NavigatorScreen)
            .map((child) => {
            return {
                ...child.props,
                key: child.props.name,
            };
        })
            .filter((child) => Boolean(child.key));
    }, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);
    /**
     * Need to be called only once
     */
    useEffect(() => {
        const hasFallbackRouteName = ~registeredScreens.findIndex(({ name }) => {
            return name === fallbackRouteName;
        });
        const initScreen = hasFallbackRouteName
            ? registeredScreens.find(({ name }) => name === fallbackRouteName)
            : registeredScreens[0];
        setStack([initScreen]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        const currScreen = stack.length > 0 ? stack[stack.length - 1].name : "";
        const previousScreen = previousStack && previousStack.length > 0
            ? previousStack[previousStack.length - 1].name
            : "";
        if (onScreenChange) {
            onScreenChange({
                currScreenName: currScreen,
                prevScreenName: previousScreen,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onScreenChange, stack]);
    const handlePopOffTheStackCallback = useCallback(() => {
        if (stack.length > 1) {
            setStack(stack.slice(0, stack.length - 1));
        }
    }, [stack]);
    const handlePushOnTheStackCallback = React.useCallback((screen) => setStack((current) => [...current, screen]), []);
    const handleResetTheStackCallback = React.useCallback(() => {
        setStack((s) => [s[0]]);
    }, []);
    /**
     * Context props. Stack handlers.
     */
    const handleGoBackCallback = useCallback(() => {
        if (stack.length > 1) {
            handlePopOffTheStackCallback();
        }
    }, [handlePopOffTheStackCallback, stack]);
    const handleGoNextToCallback = useCallback((screenName) => {
        const prevScreen = stack[stack.length - 1].name ?? "";
        const nextScreen = registeredScreens.find(({ name }) => name === screenName);
        if (nextScreen && nextScreen.name !== prevScreen) {
            handlePushOnTheStackCallback(nextScreen);
        }
    }, [handlePushOnTheStackCallback, registeredScreens, stack]);
    return (_jsx(NavigatorContext.Provider, { value: {
            goBack: handleGoBackCallback,
            goNextTo: handleGoNextToCallback,
            reset: handleResetTheStackCallback,
        }, children: _jsx(ViewsWrapper, { children: stack.length === 0
                ? fallback
                : stack.map((v, i) => {
                    if (i !== stack.length - 1) {
                        return null;
                    }
                    return (_jsx(React.Fragment, { children: React.createElement(v.component, v.props) }, v.key));
                }) }) }));
};
