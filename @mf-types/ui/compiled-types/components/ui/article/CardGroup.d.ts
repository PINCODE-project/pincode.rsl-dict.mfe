import { type LucideIcon } from "lucide-react";
export interface CardGroupItemProps {
    icon: LucideIcon;
    title: string;
    description?: string;
    href: string;
}
export interface CardGroupProps {
    items: CardGroupItemProps[];
    className?: string;
}
export declare function CardGroup({ items, className }: CardGroupProps): import("react/jsx-runtime").JSX.Element;
