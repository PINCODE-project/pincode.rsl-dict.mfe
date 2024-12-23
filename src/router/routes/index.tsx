import { ConfigRouteProps } from "../types";
import { mainRouteConfig } from "@/router/routes/main";

export const routeConfig: ConfigRouteProps[] = [
    ...mainRouteConfig,
    {
        path: "*",
        element: <div>error</div>,
    },
];
