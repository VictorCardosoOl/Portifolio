// src/hooks/useLocomotiveScroll.tsx
"use client";

import { useEffect } from 'react';
import 'locomotive-scroll/dist/locomotive-scroll.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// 1. Modificamos o hook para aceitar um 'setIsReady'
const useLocomotiveScroll = (
  containerRef: React.RefObject<HTMLDivElement>,
  setIsReady: (isReady: boolean) => void // Adiciona esta linha
) => {
  useEffect(() => {
    if (!containerRef.current) return;

    let scroll: import('locomotive-scroll').default;

    import('locomotive-scroll').then((LocomotiveScrollModule) => {
      scroll = new LocomotiveScrollModule.default({
        el: containerRef.current as HTMLElement,
        smooth: true,
        smoothMobile: false,
        getDirection: true,
        lenisOptions: {
             lerp: 0.1,
        },
      });

      // --- Integração GSAP ScrollTrigger ---
      scroll.on('scroll', ScrollTrigger.update);

      ScrollTrigger.scrollerProxy(containerRef.current, {
        scrollTop(value) {
          if (scroll) {
            return arguments.length 
              ? scroll.scrollTo(value, { duration: 0, disableLerp: true }) 
              : scroll.scroll.instance.scroll.y;
          }
          return 0;
        },
        getBoundingClientRect() {
          return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        pinType: containerRef.current?.style.transform ? "transform" : "fixed"
      });
      // --- Fim Integração ---

      const resizeObserver = new ResizeObserver(() => {
        if (scroll) {
            scroll.update();
            ScrollTrigger.refresh();
        }
      });
      resizeObserver.observe(containerRef.current);

      ScrollTrigger.defaults({ scroller: containerRef.current });
      ScrollTrigger.refresh();

      // --- 2. AVISO DE PRONTO ---
      // Diz ao layout que tudo está carregado e pronto
      setIsReady(true); 

      // --- Limpeza ---
      return () => {
        console.log("Destroying Locomotive Scroll and ScrollTriggers");
        setIsReady(false); // 3. Avisa que não está pronto ao desmontar
        if (scroll) scroll.destroy();
        resizeObserver.disconnect();
         ScrollTrigger.removeEventListener("refresh", () => scroll?.update());
         ScrollTrigger.scrollerProxy(containerRef.current, undefined);
      };
    }).catch(error => {
        console.error("Failed to load Locomotive Scroll:", error);
        setIsReady(true); // Mesmo se falhar, tentamos mostrar o site
    });

    return () => {
      if (scroll) {
        scroll.destroy();
        console.log("Destroying Locomotive Scroll (early unmount)");
      }
      setIsReady(false);
      ScrollTrigger.removeEventListener("refresh", () => scroll?.update());
      if (containerRef.current) {
          ScrollTrigger.scrollerProxy(containerRef.current, undefined);
      }
    };
  }, [containerRef, setIsReady]); // Adiciona setIsReady às dependências
};

export default useLocomotiveScroll;