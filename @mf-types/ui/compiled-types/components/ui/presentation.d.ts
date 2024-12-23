export interface Slide {
    image: string;
    alt: string;
    transitionType: "dissolve" | "slide" | "fade" | "zoom";
}
export interface PresentationProps {
    slides: Slide[];
    className?: string;
}
export declare function Presentation({ slides, className }: PresentationProps): import("react/jsx-runtime").JSX.Element;
