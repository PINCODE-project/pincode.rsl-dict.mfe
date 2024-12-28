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

    return (
        <div className={styles.container}>
            <Header onOpenSidebar={() => setIsOpenSidebar(true)}/>
            <div className={styles.content}>
                <Outlet/>
            </div>
            {
                isMobile &&
                <Sidebar
                    onSelectWord={(entry) => navigate(MainRouter.DictionaryPage(`${entry.id}`))}
                    isOpen={isSidebarOpen}
                    onClose={() => setIsOpenSidebar(false)}
                />
            }
            <div className={styles.newYear}/>
        </div>
    )
}

export default Layout;