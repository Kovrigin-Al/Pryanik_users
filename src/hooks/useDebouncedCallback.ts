import { useCallback, useRef } from "react";

export default function useDebounceCallback(callback: (...args: any) => void, delay: number) {
    const timer = useRef<number>();
    const debouncedCallback = useCallback((...args: any) => { 
        if (timer.current) {
            clearTimeout(timer.current)
        }
        timer.current = setTimeout(()=>callback(...args), delay)
    }, [callback, delay])

    return debouncedCallback
}