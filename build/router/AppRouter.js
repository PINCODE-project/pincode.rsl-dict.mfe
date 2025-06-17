import { jsx as _jsx } from "react/jsx-runtime";
import { useCallback } from "react";
import { Route, Routes } from "react-router-dom";
import { routeConfig } from "./routes";
export const AppRouter = ({ element, path }) => {
    const renderRoute = useCallback((route) => {
        var _a;
        return (_jsx(Route, { path: route.path, element: route.element, children: (_a = route.children) === null || _a === void 0 ? void 0 : _a.map(r => renderRoute(r)) }, route.path));
    }, []);
    return (_jsx(Routes, { children: _jsx(Route, { path: path, element: element, children: routeConfig.map(renderRoute) }, "/") }));
};
