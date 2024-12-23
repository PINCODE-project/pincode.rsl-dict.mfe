import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const buttonVariants: (props?: ({
    variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined;
    effect?: "expandIcon" | "ringHover" | "shine" | "shineHover" | "gooeyRight" | "gooeyLeft" | "underline" | "hoverUnderline" | null | undefined;
    size?: "default" | "sm" | "lg" | "icon" | null | undefined;
} & import("class-variance-authority/dist/types").ClassProp) | undefined) => string;
interface IconProps {
    icon: React.ElementType;
    iconPlacement: 'left' | 'right';
}
interface IconRefProps {
    icon?: never;
    iconPlacement?: undefined;
}
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}
export type ButtonIconProps = IconProps | IconRefProps;
declare const Button: React.ForwardRefExoticComponent<(ButtonProps & ButtonIconProps) & React.RefAttributes<HTMLButtonElement>>;
export { Button, buttonVariants };
