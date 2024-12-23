interface SignRecognitionProps {
    word: string;
    onSuccess?: () => void;
    className?: string;
}
declare function SignRecognitionBlock({ word, onSuccess, className }: SignRecognitionProps): import("react/jsx-runtime").JSX.Element;
export { SignRecognitionBlock };
