import { Header } from "@/components/Header";
import { Outlet } from "react-router-dom";
import { setIsOpenSidebar } from "@/store/sidebar";
import styles from "./styles.module.scss";

const Layout = () => {
    return (
        <div className={styles.container}>
            <Header onOpenSidebar={() => setIsOpenSidebar(true)}/>
            <div className={styles.content}>
                <Outlet/>
            </div>
            <div className={styles.newYear}/>
        </div>
    )
}

export default Layout;