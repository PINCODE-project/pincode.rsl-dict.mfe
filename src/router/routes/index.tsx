import { ConfigRouteProps } from "../types";
import { mainRouteConfig } from "./main";

export const routeConfig: ConfigRouteProps[] = [
    ...mainRouteConfig,
    {
        path: "*",
        element: <div>error</div>,
    },
];
