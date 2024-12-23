import React from "react";
interface TabsCodeProps {
    tabs: {
        label: string;
        children: React.ReactNode;
    }[];
    className?: string;
}
export declare function Tabs({ tabs, className }: TabsCodeProps): import("react/jsx-runtime").JSX.Element;
export {};
