// src/hooks/useFadeInUp.tsx
"use client";

import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
// O ScrollTrigger já deve estar registrado em useLocomotiveScroll
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// gsap.registerPlugin(ScrollTrigger);

export const useFadeInUp = (
  el: React.RefObject<HTMLElement> | string,
  delay: number = 0
) => {
  useLayoutEffect(() => {
    // O teu hook useLocomotiveScroll já define o scrollerProxy,
    // por isso o ScrollTrigger sabe como "ouvir" o scroll suave.
    
    const element = typeof el === 'string' ? gsap.utils.toArray(el)[0] as HTMLElement : el.current;
    if (!element) return;

    // Define o estado inicial (escondido)
    gsap.set(element, { y: 50, opacity: 0 });

    const tl = gsap.to(element, {
      y: 0,
      opacity: 1,
      duration: 1,
      delay: delay,
      ease: 'power3.out',
      // Configuração do ScrollTrigger
      scrollTrigger: {
        trigger: element,
        // O scroller padrão já foi definido no hook do Locomotive
        // scroller: "[data-scroll-container]", 
        start: 'top 85%', // Começa a animação quando o topo do elemento atinge 85% da viewport
        toggleActions: 'play none none none', // Apenas "play" na primeira vez
      },
    });

    return () => {
      // Limpa a animação e o ScrollTrigger
      tl.kill();
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
    };
  }, [el, delay]);
};