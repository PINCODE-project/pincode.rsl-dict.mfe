import { jsx as _jsx } from "react/jsx-runtime";
import { mainRouteConfig } from "./main";
export const routeConfig = [
    ...mainRouteConfig,
    {
        path: "*",
        element: _jsx("div", { children: "error" }),
    },
];
