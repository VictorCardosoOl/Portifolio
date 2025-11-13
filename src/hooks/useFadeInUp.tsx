// src/hooks/useFadeInUp.tsx
"use client";

import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
// Importamos o nosso novo hook
import { usePrefersReducedMotion } from './usePrefersReducedMotion'; 

// O ScrollTrigger já deve estar registrado em useLocomotiveScroll
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// gsap.registerPlugin(ScrollTrigger);

export const useFadeInUp = (
  el: React.RefObject<HTMLElement> | string,
  delay: number = 0
) => {
  // 1. Verificamos a preferência do utilizador
  const isReduced = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const element = typeof el === 'string' ? gsap.utils.toArray(el)[0] as HTMLElement : el.current;
    if (!element) return;

    // 2. Lógica condicional
    if (isReduced) {
      // Se o utilizador quer movimento reduzido,
      // apenas tornamos o elemento visível, sem movimento.
      // O ScrollTrigger ainda pode ser usado para "quando" aparece,
      // mas a animação será um "fade" simples.
      
      // Define o estado inicial (invisível, mas sem deslocamento Y)
      gsap.set(element, { opacity: 0 });

      const tl = gsap.to(element, {
        opacity: 1, // Apenas anima a opacidade
        duration: 0.5, // Uma duração curta para um fade suave
        delay: delay,
        ease: 'none', // Sem "easing" complexo
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      return () => {
        tl.kill();
        if (tl.scrollTrigger) {
          tl.scrollTrigger.kill();
        }
      };

    } else {
      // 3. Lógica original (se o movimento NÃO está reduzido)
      // Define o estado inicial (escondido e deslocado)
      gsap.set(element, { y: 50, opacity: 0 });

      const tl = gsap.to(element, {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      return () => {
        tl.kill();
        if (tl.scrollTrigger) {
          tl.scrollTrigger.kill();
        }
      };
    }
    
  }, [el, delay, isReduced]); // Adicionamos `isReduced` ao array de dependências
};

/*Documentação das Alterações:

Importação: Importamos o usePrefersReducedMotion que acabámos de criar.

Chamada do Hook: const isReduced = usePrefersReducedMotion(); dá-nos o valor true ou false.

Condição if (isReduced):

Se true, executamos uma animação alternativa e simplificada. Em vez de mover o elemento de y: 50 para y: 0, nós apenas o animamos de opacity: 0 para opacity: 1. Isto é um "fade" simples, que geralmente é aceite como seguro para utilizadores com distúrbios vestibulares.

Se false, executamos o bloco else que contém a sua animação FadeInUp original.

Array de Dependências: Adicionei isReduced ao array de dependências do useLayoutEffect. Isto garante que, se o utilizador mudar a preferência do sistema, o efeito será re-executado para aplicar ou remover a animação correta.*/