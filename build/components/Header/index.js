import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { Button, ThemeToggle } from "@pin-code/uikit.lib";
import { Menu } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { MainRouter } from "@/router/routes/main";
import Logo from "@/assets/images/Logo.svg";
import styles from "./styles.module.scss";
export function Header({ onOpenSidebar }) {
    const isMobile = useIsMobile();
    return (_jsx("header", { className: "p-3 bg-background border-b h-[65px] sticky top-0", children: _jsxs("div", { className: "flex items-center justify-between max-w-[1200px] m-auto pl-8 pr-8", children: [_jsx("div", { className: "flex items-center space-x-4", children: _jsx(Link, { to: MainRouter.DictionaryPage(""), children: _jsx("div", { className: styles.logo, children: _jsx("img", { src: Logo, alt: "Logo" }) }) }) }), !isMobile && (_jsx("nav", { children: _jsxs("ul", { className: "flex space-x-4", children: [_jsx("li", { children: _jsx(Button, { variant: "ghost", asChild: true, children: _jsx(Link, { to: "/", children: "\u0421\u043B\u043E\u0432\u0430\u0440\u044C" }) }) }), _jsx("li", { children: _jsx(Button, { variant: "ghost", asChild: true, children: _jsx(Link, { to: "/about", children: "\u041E \u043D\u0430\u0441" }) }) }), _jsx("li", { className: "flex justify-center items-center", children: _jsx(ThemeToggle, {}) })] }) })), isMobile && (_jsx(Button, { variant: "ghost", size: "icon", className: "md:hidden", onClick: onOpenSidebar, children: _jsx(Menu, { className: "h-6 w-6" }) }))] }) }));
}
