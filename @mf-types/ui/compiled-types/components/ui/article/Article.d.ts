import React from "react";
import { CardGroupItemProps } from "@/components/ui/article/CardGroup";
import { Field } from "@/components/ui/article/FieldGroup";
import { Slide } from "@/components/ui/presentation";
interface ArticleProps {
    content: ArticleContent[];
}
export type ArticleContent = {
    hide?: boolean;
    id?: string;
} & ({
    type: "heading";
    level: 1 | 2 | 3 | 4 | 5 | 6;
    content: string;
} | {
    type: "paragraph";
    content: React.ReactNode;
} | {
    type: "list";
    ordered: boolean;
    items: React.ReactNode[];
} | {
    type: "code";
    language?: string;
    content: string;
} | {
    type: "blockquote";
    content: React.ReactNode;
} | {
    type: "image";
    src: string;
    alt: string;
} | {
    type: "table";
    headers: string[];
    rows: React.ReactNode[][];
} | {
    type: "button";
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    size?: "default" | "sm" | "lg" | "icon";
    content: string;
    onClick?: () => void;
} | {
    type: "columns";
    content: ArticleContent[][];
} | {
    type: "separator";
} | {
    type: "tabs";
    tabs: {
        label: string;
        children: React.ReactNode;
    }[];
} | {
    type: "liveComponent";
    component: React.ReactNode;
} | {
    type: "cardGroup";
    items: CardGroupItemProps[];
} | {
    type: "fieldGroup";
    title: string;
    description: string;
    items: Field[];
} | {
    type: "presentation";
    slides: Slide[];
} | {
    type: "custom";
    component: React.ReactNode;
});
export declare function Article({ content }: ArticleProps): import("react/jsx-runtime").JSX.Element;
export {};
