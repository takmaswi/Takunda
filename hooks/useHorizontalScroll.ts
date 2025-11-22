import { useEffect, useRef } from 'react';

export function useHorizontalScroll() {
    const elRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = elRef.current;
        if (el) {
            const onWheel = (e: WheelEvent) => {
                // Check if we are on desktop (md breakpoint is usually 768px)
                if (window.innerWidth < 768) return;

                const isVertical = Math.abs(e.deltaY) > Math.abs(e.deltaX);

                if (isVertical) {
                    // Map vertical scroll to horizontal
                    e.preventDefault();
                    el.scrollLeft += e.deltaY;
                }
            };
            el.addEventListener('wheel', onWheel, { passive: false });
            return () => el.removeEventListener('wheel', onWheel);
        }
    }, []);

    return elRef;
}
