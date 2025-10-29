// src/hooks/useLocomotiveScroll.tsx
"use client"; // Essencial, pois isso usa DOM e hooks do React

import { useEffect } from 'react';
// Não se esqueça de instalar os tipos: npm install @types/locomotive-scroll
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css'; // Importa o CSS base

const useLocomotiveScroll = (containerRef: React.RefObject<HTMLDivElement>) => {
  useEffect(() => {
    if (!containerRef.current) return;

    // Variável para guardar a instância do scroll
    let scroll: LocomotiveScroll;

    // Usamos um import() dinâmico para garantir que o LocomotiveScroll
    // só seja carregado no lado do cliente (onde 'window' existe)
    import('locomotive-scroll').then((LocomotiveScrollModule) => {
      scroll = new LocomotiveScrollModule.default({
        el: containerRef.current,
        smooth: true,
        smoothMobile: false, // Pode desativar no mobile para performance
        getDirection: true,
      });

      // Recalcula o scroll quando o tamanho da janela muda
      const resizeObserver = new ResizeObserver(() => {
        scroll.update();
      });
      resizeObserver.observe(containerRef.current);

      // Limpeza ao desmontar o componente
      return () => {
        if (scroll) scroll.destroy();
        resizeObserver.disconnect();
      };
    });

    // Limpeza extra caso o import falhe ou o componente desmonte rápido
    return () => {
      if (scroll) scroll.destroy();
    };
  }, [containerRef]);
};

export default useLocomotiveScroll;