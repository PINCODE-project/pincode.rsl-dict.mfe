import React from "react";
interface MarqueeProps {
    className?: string;
    reverse?: boolean;
    pauseOnHover?: boolean;
    children?: React.ReactNode;
    vertical?: boolean;
    repeat?: number;
    [key: string]: any;
}
declare function Marquee({ className, reverse, pauseOnHover, children, vertical, repeat, ...props }: MarqueeProps): import("react/jsx-runtime").JSX.Element;
export { Marquee };
