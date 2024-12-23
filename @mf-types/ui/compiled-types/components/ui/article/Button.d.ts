import React from "react";
interface ButtonProps {
    children: React.ReactNode;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    size?: "default" | "sm" | "lg" | "icon";
    className?: string;
    onClick?: () => void;
}
export declare function Button({ children, variant, size, className, onClick }: ButtonProps): import("react/jsx-runtime").JSX.Element;
export {};
