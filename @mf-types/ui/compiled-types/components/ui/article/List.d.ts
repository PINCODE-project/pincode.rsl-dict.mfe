import React from "react";
interface ListProps {
    ordered?: boolean;
    children: React.ReactNode;
    className?: string;
}
export declare function List({ ordered, children, className }: ListProps): import("react/jsx-runtime").JSX.Element;
interface ListItemProps {
    children: React.ReactNode;
    className?: string;
}
export declare function ListItem({ children, className }: ListItemProps): import("react/jsx-runtime").JSX.Element;
export {};
