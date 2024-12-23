import React from "react";
interface TableProps {
    headers: string[];
    rows: React.ReactNode[][];
    className?: string;
}
export declare function Table({ headers, rows, className }: TableProps): import("react/jsx-runtime").JSX.Element;
export {};
