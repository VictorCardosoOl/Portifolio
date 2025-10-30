// src/hooks/useMagneticButton.tsx
"use client";

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const useMagneticButton = (
    el: React.RefObject<HTMLElement>,
    strength: number = 0.5 // Quão forte é o "íman"
) => {
    const isHovering = useRef(false);

    useLayoutEffect(() => {
        if (!el.current) return;

        const element = el.current;

        // Animações rápidas com quickTo
        const xTo = gsap.quickTo(element, "x", { duration: 0.3, ease: "elastic.out(1, 0.3)" });
        const yTo = gsap.quickTo(element, "y", { duration: 0.3, ease: "elastic.out(1, 0.3)" });

        const onMouseMove = (e: MouseEvent) => {
            if (!isHovering.current) return;

            const { clientX, clientY } = e;
            const { height, width, left, top } = element.getBoundingClientRect();
            
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);

            xTo(x * strength);
            yTo(y * strength);
        };

        const onMouseEnter = () => {
            isHovering.current = true;
            gsap.to(element, { scale: 1.05, duration: 0.3 }); // Aumenta ligeiramente
        };

        const onMouseLeave = () => {
            isHovering.current = false;
            xTo(0); // Volta ao centro
            yTo(0);
            gsap.to(element, { scale: 1, duration: 0.3, ease: "elastic.out(1, 0.3)" });
        };

        element.addEventListener('mouseenter', onMouseEnter);
        element.addEventListener('mouseleave', onMouseLeave);
        // Ouve o movimento do rato em toda a janela (ou numa área maior)
        window.addEventListener('mousemove', onMouseMove);

        return () => {
            element.removeEventListener('mouseenter', onMouseEnter);
            element.removeEventListener('mouseleave', onMouseLeave);
            window.removeEventListener('mousemove', onMouseMove);
        };
    }, [el, strength]);
};