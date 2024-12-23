import { BrowserRouter } from "react-router-dom";

import { AppRouter } from "./router/AppRouter";

import "ui/Global";
import "./styles/localeTheme.scss";
import Layout from "@/components/Layout";

export default function MyApp() {
    return (
        <div className="App">
            <BrowserRouter>
                <AppRouter element={<Layout/>}/>
            </BrowserRouter>
        </div>
    );
}
