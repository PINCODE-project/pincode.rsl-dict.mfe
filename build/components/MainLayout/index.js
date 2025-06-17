import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Sidebar } from "@/components/Sidebar";
import { useUnit } from "effector-react";
import { $isOpenSidebar, setIsOpenSidebar } from "@/store/sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { MainRouter } from "@/router/routes/main";
export default function MainLayout() {
    const navigate = useNavigate();
    const isSidebarOpen = useUnit($isOpenSidebar);
    return (_jsxs("div", { className: "w-full flex h-full gap-8", children: [_jsx(Outlet, {}), _jsx(Sidebar, { onSelectWord: (entry) => navigate(MainRouter.DictionaryPage(`${entry.id}`)), isOpen: isSidebarOpen, onClose: () => setIsOpenSidebar(false) })] }));
}
