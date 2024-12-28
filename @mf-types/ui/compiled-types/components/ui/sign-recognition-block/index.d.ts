interface SignRecognitionProps {
    word: string;
    recognitionText: string[];
    onSuccess?: () => void;
    className?: string;
}
declare function SignRecognitionBlock({ word, recognitionText, onSuccess, className }: SignRecognitionProps): import("react/jsx-runtime").JSX.Element;
export { SignRecognitionBlock };
