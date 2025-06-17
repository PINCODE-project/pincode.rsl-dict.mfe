import { jsx as _jsx } from "react/jsx-runtime";
import DictionaryPage from "@/pages/DictionaryPage";
import AboutPage from "@/pages/AboutPage";
import MainPage from "@/pages/MainPage";
import RecognitionPage from "@/pages/RecognitionPage";
import MainLayout from "@/components/MainLayout";
import NewYearPage from "@/pages/NewYearPage";
export const MainRouter = {
    MainPage: "/",
    NewYearPage: "/new-year",
    DictionaryPage: (id) => `/${id}`,
    RecognitionPage: (id) => `/${id}/training`,
    AboutPage: "/about",
};
export const mainRouteConfig = [
    {
        path: "/",
        element: _jsx(MainLayout, {}),
        children: [
            {
                path: MainRouter.MainPage,
                element: _jsx(MainPage, {}),
            },
            {
                path: MainRouter.RecognitionPage(":id"),
                element: _jsx(RecognitionPage, {}),
            },
            {
                path: MainRouter.DictionaryPage(":id"),
                element: _jsx(DictionaryPage, {}),
            },
        ]
    },
    {
        path: MainRouter.AboutPage,
        element: _jsx(AboutPage, {}),
    },
    {
        path: MainRouter.NewYearPage,
        element: _jsx(NewYearPage, {}),
    },
];
