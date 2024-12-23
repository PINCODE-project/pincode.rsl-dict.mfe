import { FC, useCallback } from "react";
import { Route, RouteProps, Routes } from "react-router-dom";
import { ConfigRouteProps } from "./types";

import { routeConfig } from "./routes";

type AppRouterProps = RouteProps;

export const AppRouter: FC<AppRouterProps> = ({ element, path }) => {
    const renderRoute = useCallback(
        (route: ConfigRouteProps) => (
            <Route
                key={route.path}
                path={route.path}
                element={route.element}
            >
                {route.children?.map(r => renderRoute(r))}
            </Route>
        ),
        [],
    );

    return (
        <Routes>
            <Route key="/" path={path} element={element}>
                {routeConfig.map(renderRoute)}
            </Route>
        </Routes>
    );
};
