// src/hooks/useLocomotiveScroll.tsx
"use client";

import { useEffect } from 'react';
// Importe os tipos se ainda não o fez: npm install @types/locomotive-scroll
// import LocomotiveScroll from 'locomotive-scroll'; // O import dinâmico lida com isso
import 'locomotive-scroll/dist/locomotive-scroll.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registre o plugin UMA VEZ (pode ser aqui ou no layout/página principal)
// Se já estiver registrado em outro lugar, pode remover daqui.
if (typeof window !== "undefined") { // Garante que só roda no client-side
  gsap.registerPlugin(ScrollTrigger);
}

const useLocomotiveScroll = (containerRef: React.RefObject<HTMLDivElement>) => {
  useEffect(() => {
    if (!containerRef.current) return;

    let scroll: import('locomotive-scroll').default; // Define o tipo corretamente

    import('locomotive-scroll').then((LocomotiveScrollModule) => {
      scroll = new LocomotiveScrollModule.default({
        el: containerRef.current as HTMLElement, // Type assertion pode ser necessária
        smooth: true,
        smoothMobile: false, // Desativar no mobile é comum para performance
        getDirection: true,
        // Atenção: Adicione esta opção se estiver tendo problemas com altura
        lenisOptions: { // Ou use 'multiplier' se for versão < 5
             lerp: 0.1, // Ajuste a suavidade (valor padrão é 0.1)
             // Outras opções do Lenis se necessário
        },
        // Se usar versão < 5 do Locomotive, talvez precise de:
        //multiplier: 1, // Ajuste a velocidade do scroll se necessário
        //touchMultiplier: 2,
        // resetNativeScroll: true // Importante!
      });

      // --- Integração GSAP ScrollTrigger ---
      scroll.on('scroll', ScrollTrigger.update); // Atualiza ScrollTrigger no evento de scroll do Locomotive

      ScrollTrigger.scrollerProxy(containerRef.current, {
        scrollTop(value) {
          // Se o scroll existir, retorna a posição ou define a posição
          if (scroll) {
            return arguments.length 
              ? scroll.scrollTo(value, { duration: 0, disableLerp: true }) 
              : scroll.scroll.instance.scroll.y;
          }
          // Se o scroll ainda não foi inicializado, retorna 0
          return 0;
        },
        getBoundingClientRect() {
          return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // Informa ao ScrollTrigger como o elemento está sendo 'pinado' (fixado)
        pinType: containerRef.current?.style.transform ? "transform" : "fixed"
      });
      // --- Fim Integração ---


      const resizeObserver = new ResizeObserver(() => {
        if (scroll) {
            scroll.update();
            ScrollTrigger.refresh(); // IMPORTANTE: Atualiza o ScrollTrigger no resize
        }
      });
      resizeObserver.observe(containerRef.current);

      // Define o 'scroller' padrão para todas as animações ScrollTrigger
      ScrollTrigger.defaults({ scroller: containerRef.current });
      
      // Atualiza o ScrollTrigger DEPOIS que o proxy foi configurado
      ScrollTrigger.refresh();

      // --- Limpeza ---
      return () => {
        console.log("Destroying Locomotive Scroll and ScrollTriggers");
        if (scroll) scroll.destroy();
        resizeObserver.disconnect();
         // Garante a remoção dos listeners e proxies do ScrollTrigger
         ScrollTrigger.removeEventListener("refresh", () => scroll?.update());
         ScrollTrigger.scrollerProxy(containerRef.current, undefined); // Limpa o proxy específico
         // Mata triggers associados a este scroller se necessário, 
         // embora o gsap.context deva lidar com isso
         // ScrollTrigger.killAll(); // Use com cautela, pode matar triggers de outros contextos
      };
    }).catch(error => {
        console.error("Failed to load Locomotive Scroll:", error);
    });

    // Função de limpeza caso o componente desmonte ANTES do import() terminar
    return () => {
      if (scroll) {
        scroll.destroy();
        console.log("Destroying Locomotive Scroll (early unmount)");
      }
      // Limpeza robusta do ScrollTrigger
      ScrollTrigger.removeEventListener("refresh", () => scroll?.update());
      if (containerRef.current) {
          ScrollTrigger.scrollerProxy(containerRef.current, undefined);
      }
       // ScrollTrigger.killAll(); // Cautela aqui também
    };
  }, [containerRef]); // Roda apenas quando a ref do container muda (geralmente só na montagem)
};

export default useLocomotiveScroll;