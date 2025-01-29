import { Sidebar } from "@/components/Sidebar";
import { useUnit } from "effector-react";
import { $isOpenSidebar, setIsOpenSidebar } from "@/store/sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { MainRouter } from "@/router/routes/main";

export default function MainLayout() {
    const navigate = useNavigate();
    const isSidebarOpen = useUnit($isOpenSidebar);

    return (
        <div className="w-full flex h-full gap-8">
            <Outlet />
            <Sidebar
                onSelectWord={(entry) => navigate(MainRouter.DictionaryPage(`${entry.id}`))}
                isOpen={isSidebarOpen}
                onClose={() => setIsOpenSidebar(false)}
            />
        </div>
    );
}
