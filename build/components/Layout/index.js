import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Header } from "@/components/Header";
import { Outlet, useNavigate } from "react-router-dom";
import { $isOpenSidebar, setIsOpenSidebar } from "@/store/sidebar";
import styles from "./styles.module.scss";
import { Sidebar } from "@/components/Sidebar";
import { MainRouter } from "@/router/routes/main";
import { useIsMobile } from "@/hooks/use-mobile";
import { useUnit } from "effector-react/compat";
const Layout = () => {
    const isMobile = useIsMobile();
    const navigate = useNavigate();
    const isSidebarOpen = useUnit($isOpenSidebar);
    return (_jsxs("div", { className: styles.container, children: [_jsx(Header, { onOpenSidebar: () => setIsOpenSidebar(true) }), _jsx("div", { className: styles.content, children: _jsx(Outlet, {}) }), isMobile && (_jsx(Sidebar, { onSelectWord: (entry) => navigate(MainRouter.DictionaryPage(`${entry.id}`)), isOpen: isSidebarOpen, onClose: () => setIsOpenSidebar(false) }))] }));
};
export default Layout;
