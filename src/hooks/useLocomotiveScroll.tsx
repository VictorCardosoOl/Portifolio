// src/hooks/useLocomotiveScroll.tsx
"use client";

import { useEffect } from 'react';
// Importação do CSS base do Locomotive Scroll
import 'locomotive-scroll/dist/locomotive-scroll.css';
// Importações principais do GSAP para animação e integração
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Garante que o plugin do ScrollTrigger seja registrado no GSAP
// A verificação 'typeof window' impede erros durante o Server-Side Rendering (SSR) do Next.js
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * @hook useLocomotiveScroll
 * @description Um hook customizado que inicializa o Locomotive Scroll,
 * integra-o com o GSAP ScrollTrigger para animações baseadas em scroll,
 * e gere o seu ciclo de vida (criação, atualização, destruição).
 *
 * @param {React.RefObject<HTMLDivElement>} containerRef - A referência (ref) do React para o elemento principal que servirá como o "viewport" do scroll.
 * @param {(isReady: boolean) => void} setIsReady - Uma função de callback (geralmente vinda de um useState no layout) para sinalizar que o scroll foi inicializado.
 * @param {(scrollInstance: any | null) => void} setScroll - Uma função de callback (geralmente vinda de um useState no layout) para armazenar a instância do scroll, permitindo que ela seja partilhada via Context API.
 */
const useLocomotiveScroll = (
  containerRef: React.RefObject<HTMLDivElement>,
  setIsReady: (isReady: boolean) => void,
  // Adiciona esta linha para receber a função do estado do layout
  setScroll: (scrollInstance: any | null) => void 
) => {

  // O useEffect principal que controla todo o ciclo de vida do scroll
  useEffect(() => {
    // Não executa nada se a referência do container ainda não estiver pronta
    if (!containerRef.current) return;

    let scroll: import('locomotive-scroll').default;

    // --- 1. INICIALIZAÇÃO DINÂMICA ---
    // Usamos um 'import()' dinâmico para garantir que a biblioteca 'locomotive-scroll'
    // só seja carregada no lado do cliente (client-side), onde o 'window' existe.
    import('locomotive-scroll').then((LocomotiveScrollModule) => {
      
      // Cria a instância do Locomotive Scroll
      scroll = new LocomotiveScrollModule.default({
        el: containerRef.current as HTMLElement, // O elemento que irá "scrollar"
        smooth: true,                           // Ativa o smooth scroll
        smoothMobile: false,                    // Desativa em mobile para performance (recomendado)
        getDirection: true,                     // Permite detetar a direção (cima/baixo)
        
        // --- 2. A MELHORIA DE ELEGÂNCIA (LENIS) ---
        lenisOptions: {
             /**
              * @config lerp (Linear Interpolation)
              * Este é o valor mais importante para o "feeling" do scroll.
              * Valor original: 0.1 (padrão, mais rápido)
              * Valor melhorado: 0.07 (mais lento, mais suave, mais "elegante")
              * Experimente valores entre 0.05 e 0.08 para encontrar o seu gosto pessoal.
              */
             lerp: 0.07,
        },
      });

      // --- 3. INTEGRAÇÃO GSAP SCROLLTRIGGER ---
      // Esta é a parte "mágica" que faz o GSAP entender o scroll suave.
      
      // 3a. Informa o ScrollTrigger para atualizar sempre que o Locomotive Scrollar
      scroll.on('scroll', ScrollTrigger.update);

      // 3b. Define o "scrollerProxy"
      // Diz ao GSAP para usar os métodos do Locomotive Scroll em vez dos métodos nativos
      ScrollTrigger.scrollerProxy(containerRef.current, {
        scrollTop(value) {
          // Setter: Diz ao GSAP como "mandar" o scroll para uma posição
          if (scroll) {
            return arguments.length 
              ? scroll.scrollTo(value, { duration: 0, disableLerp: true }) 
              : scroll.scroll.instance.scroll.y;
          }
          return 0;
        },
        getBoundingClientRect() {
          // Getter: Diz ao GSAP como "medir" o viewport
          return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // Define o tipo de pinning (essencial para animações 'pin: true')
        pinType: containerRef.current?.style.transform ? "transform" : "fixed"
      });
      // --- Fim Integração GSAP ---


      // --- 4. GESTÃO DE REDIMENSIONAMENTO E ATUALIZAÇÃO ---
      
      // Um observador que atualiza o scroll sempre que o tamanho do container mudar
      const resizeObserver = new ResizeObserver(() => {
        if (scroll) {
            scroll.update();
            ScrollTrigger.refresh(); // Atualiza o GSAP também
        }
      });
      // Começa a observar o container principal
      resizeObserver.observe(containerRef.current);

      // Define o scroller padrão do GSAP para ser o nosso container
      ScrollTrigger.defaults({ scroller: containerRef.current });
      // Força uma atualização inicial do GSAP
      ScrollTrigger.refresh();


      // --- 5. SINALIZAR PRONTO ---
      
      // 5a. Atualiza o estado global no layout com a instância do scroll
      // (Isto permite que outros componentes usem o scroll via Context)
      setScroll(scroll); 
      // 5b. Diz ao layout que tudo está carregado e pronto para mostrar os 'children'
      setIsReady(true); 

      
      // --- 6. LIMPEZA (CLEANUP) ---
      // Esta função 'return' é executada quando o componente (Layout) é desmontado
      return () => {
        console.log("Destroying Locomotive Scroll and ScrollTriggers");
        
        // 6a. Limpa o estado global ao desmontar
        setScroll(null); 
        setIsReady(false); 

        // 6b. Destrói e limpa todas as instâncias e listeners
        if (scroll) scroll.destroy();
        resizeObserver.disconnect();
         ScrollTrigger.removeEventListener("refresh", () => scroll?.update());
         ScrollTrigger.scrollerProxy(containerRef.current, undefined);
      };
    }).catch(error => {
        // Fallback caso o 'locomotive-scroll' falhe ao carregar
        console.error("Failed to load Locomotive Scroll:", error);
        setIsReady(true); // Permite o site renderizar mesmo sem scroll suave
    });

    // Função de limpeza para unmounts precoces (antes do import() terminar)
    return () => {
      if (scroll) {
        scroll.destroy();
        console.log("Destroying Locomotive Scroll (early unmount)");
      }
      setScroll(null);
      setIsReady(false);
      ScrollTrigger.removeEventListener("refresh", () => scroll?.update());
      if (containerRef.current) {
          ScrollTrigger.scrollerProxy(containerRef.current, undefined);
      }
    };
    
  // 4. Dependências do useEffect
  // O hook será re-executado se alguma destas referências/funções mudar
  }, [containerRef, setIsReady, setScroll]); 
};

export default useLocomotiveScroll;