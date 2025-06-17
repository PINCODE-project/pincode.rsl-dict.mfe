import { jsx as _jsx } from "react/jsx-runtime";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./router/AppRouter";
import Layout from "@/components/Layout";
import "./styles/localeTheme.scss";
import "@pin-code/uikit.lib/dist/static/css/main.css";
export default function MyApp() {
    return (_jsx("div", { className: "App", children: _jsx(BrowserRouter, { children: _jsx(AppRouter, { element: _jsx(Layout, {}) }) }) }));
}
