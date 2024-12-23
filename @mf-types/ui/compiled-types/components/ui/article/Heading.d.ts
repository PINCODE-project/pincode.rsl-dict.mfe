import React from "react";
interface HeadingProps {
    level: 1 | 2 | 3 | 4 | 5 | 6;
    children: React.ReactNode;
    className?: string;
    id?: string;
}
export declare function Heading({ level, children, className, id }: HeadingProps): import("react/jsx-runtime").JSX.Element;
export {};
