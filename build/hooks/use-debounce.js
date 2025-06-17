import { useCallback, useRef, useEffect } from "react";
export function useDebouncedCallback(callback, delay) {
    const timeoutRef = useRef(null);
    const callbackRef = useRef(callback);
    // Update the callback ref when callback changes
    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);
    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);
    return useCallback(((...args) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        // @ts-ignore
        timeoutRef.current = setTimeout(() => {
            callbackRef.current(...args);
        }, delay);
    }), [delay]);
}
