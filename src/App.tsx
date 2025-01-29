import { BrowserRouter } from "react-router-dom";

import { AppRouter } from "./router/AppRouter";
import Layout from "@/components/Layout";

import "./styles/localeTheme.scss";
import "@pin-code/uikit.lib/dist/static/css/main.css";

export default function MyApp() {
    return (
        <div className="App">
            <BrowserRouter>
                <AppRouter element={<Layout />} />
            </BrowserRouter>
        </div>
    );
}
