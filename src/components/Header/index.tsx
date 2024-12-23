import { Link } from 'react-router-dom'
import { Button } from 'ui/Button'
import { ThemeToggle } from 'ui/ThemeToggle'
import { Menu, Snowflake } from 'lucide-react'
import { useIsMobile } from "@/hooks/use-mobile";
import { MainRouter } from "@/router/routes/main";
import Logo from "@/assets/images/Logo.svg";

import styles from "./styles.module.scss";

interface HeaderProps {
    onOpenSidebar: () => void;
}

export function Header({ onOpenSidebar }: HeaderProps) {
    const isMobile = useIsMobile();

    return (
        <header className="p-3 bg-background border-b h-[65px] sticky top-0">
            <div className="flex items-center justify-between max-w-[1200px] m-auto pl-8 pr-8">
                <div className="flex items-center space-x-4">
                    <Link to={MainRouter.DictionaryPage("")}>
                        <div className={styles.logo}>
                            <img src={Logo} alt="Logo"/>
                        </div>
                    </Link>
                </div>
                {
                    !isMobile &&
                    <nav>
                        <ul className="flex space-x-4">
                            <li>
                                <Button variant="ghost" asChild>
                                    <Link to="/">Словарь</Link>
                                </Button>
                            </li>
                            <li>
                                <Button variant="ghost" asChild>
                                    <Link to="/about">О нас</Link>
                                </Button>
                            </li>
                            <li className="flex justify-center items-center">
                                <ThemeToggle/>
                            </li>
                            <li>
                                <Link to="/new-year">
                                    <Button variant="destructive" effect="shineHover">
                                        <Snowflake className="mr-2 h-5 w-5"/>
                                        С новым годом!
                                    </Button>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                }
                {
                    isMobile &&
                    <Button variant="ghost" size="icon" className="md:hidden" onClick={onOpenSidebar}>
                        <Menu className="h-6 w-6"/>
                    </Button>
                }
            </div>
        </header>
    )
}

