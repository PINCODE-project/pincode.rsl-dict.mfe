import { ButtonHTMLAttributes, ElementType } from "react";
import { type VariantProps } from "class-variance-authority";
declare const buttonVariants: (props?: ({
    variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined;
    effect?: "expandIcon" | "ringHover" | "shine" | "shineHover" | "gooeyRight" | "gooeyLeft" | "underline" | "hoverUnderline" | null | undefined;
    size?: "default" | "sm" | "lg" | "icon" | null | undefined;
} & import("class-variance-authority/dist/types").ClassProp) | undefined) => string;
export interface IconProps {
    icon: ElementType;
    iconPlacement: "left" | "right";
}
export interface IconRefProps {
    icon?: never;
    iconPlacement?: undefined;
}
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}
export type ButtonIconProps = IconProps | IconRefProps;
declare const Button: import("react").ForwardRefExoticComponent<(ButtonProps & ButtonIconProps) & import("react").RefAttributes<HTMLButtonElement>>;
export { Button, buttonVariants };
