import { useCallback, useRef, useEffect } from "react";

type Timer = ReturnType<typeof setTimeout>;

export function useDebouncedCallback<T extends (...args: any[]) => any>(callback: T, delay: number): T {
    const timeoutRef = useRef<Timer>(null);
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

    return useCallback(
        ((...args) => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            // @ts-ignore
            timeoutRef.current = setTimeout(() => {
                callbackRef.current(...args);
            }, delay);
        }) as T,
        [delay],
    );
}
