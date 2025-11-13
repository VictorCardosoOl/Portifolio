import { useState, useEffect } from 'react';

// Esta é a consulta de mídia que verifica a preferência do usuário no sistema operativo
const QUERY = '(prefers-reduced-motion: reduce)';

/**
 * Um hook React que deteta se o usuário prefere movimento reduzido.
 * Ele ouve mudanças e atualiza o estado de acordo.
 * Também lida com o Server-Side Rendering (SSR) de forma segura.
 *
 * @returns {boolean} - True se o usuário prefere movimento reduzido, false caso contrário.
 */
export const usePrefersReducedMotion = () => {
  // Função para obter o valor inicial de forma segura no cliente
  const getInitialState = () => {
    // Durante o SSR (no servidor), 'window' não existe.
    // Nesse caso, assumimos 'false' (sem preferência) por padrão.
    if (typeof window === 'undefined') {
      return false;
    }
    return window.matchMedia(QUERY).matches;
  };

  // Armazenamos a preferência do usuário no estado
  const [prefersReducedMotion, setPrefersReducedMotion] =
    useState(getInitialState);

  useEffect(() => {
    // Este efeito só é executado no cliente
    const mediaQueryList = window.matchMedia(QUERY);

    // Função 'listener' que será chamada quando a preferência do sistema mudar
    const listener = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    // Adiciona o 'listener' para observar mudanças
    // Usamos 'addEventListener' que é o método mais moderno
    mediaQueryList.addEventListener('change', listener);

    // Função de limpeza: será executada quando o componente for "desmontado"
    // Isso evita "memory leaks" (vazamentos de memória)
    return () => {
      mediaQueryList.removeEventListener('change', listener);
    };
  }, []); // O array de dependências vazio [] garante que este useEffect execute apenas uma vez

  return prefersReducedMotion;
};

/*Documentação do Código (Passo 1)
QUERY: Uma constante que armazena a media query exata que queremos verificar.

getInitialState: Esta função é crucial para projetos Next.js (SSR). Ela verifica se window existe. Se não (estamos no servidor), retorna false. Se sim (estamos no navegador), ela verifica o valor da media query no momento do carregamento.

useState(getInitialState): Iniciamos o estado com a função getInitialState.

useEffect: Este é o coração do hook.

Ele obtém a lista da media query (mediaQueryList).

Cria um listener que atualiza o nosso estado (setPrefersReducedMotion) sempre que a preferência do sistema operativo muda.

Adiciona esse listener (com addEventListener).

Retorna uma função de "limpeza" (removeEventListener) para parar de "ouvir" quando o componente não estiver mais na tela, otimizando a performance.*/