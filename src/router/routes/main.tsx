import { ConfigRouteProps } from "../types";
import DictionaryPage from "@/pages/DictionaryPage";
import AboutPage from "@/pages/AboutPage";
import MainPage from "@/pages/MainPage";
import RecognitionPage from "@/pages/RecognitionPage";
import MainLayout from "@/components/MainLayout";
import NewYearPage from "@/pages/NewYearPage";

export const MainRouter = {
    MainPage: "/",
    NewYearPage: "/new-year",
    DictionaryPage: (id: string) => `/${id}`,
    RecognitionPage: (id: string) => `/${id}/training`,
    AboutPage: "/about",
};

export const mainRouteConfig: ConfigRouteProps[] = [
    {
        path: "/",
        element: <MainLayout/>,
        children: [
            {
                path: MainRouter.MainPage,
                element: <MainPage/>,
            },
            {
                path: MainRouter.RecognitionPage(":id"),
                element: <RecognitionPage/>,
            },
            {
                path: MainRouter.DictionaryPage(":id"),
                element: <DictionaryPage/>,
            },
        ]
    },
    {
        path: MainRouter.AboutPage,
        element: <AboutPage/>,
    },
    {
        path: MainRouter.NewYearPage,
        element: <NewYearPage/>,
    },
];
