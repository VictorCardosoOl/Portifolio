RELATÓRIO EXECUTIVO (VISÃO GERAL)
Objetivo da Análise: Avaliar o repositório portifolio para identificar problemas críticos, oportunidades de refatoração e um roteiro para melhorar a estabilidade, manutenibilidade e performance.

Principais Conclusões:

Conflito Crítico de Execução: O projeto sofre de um conflito de inicialização entre o layout.tsx e o hook useLocomotiveScroll.tsx. Isso impede que a integração do GSAP ScrollTrigger funcione, quebrando todas as animações de scroll (useFadeInUp) — a principal característica visual do site.

Arquitetura Monolítica: O arquivo page.tsx é um "God Component" clássico, misturando lógica de 1) busca de dados (hardcoded), 2) definição de animação e 3) estrutura de UI para todas as seções do site.

Acoplamento de Dados: Os dados do portfólio estão fortemente acoplados ao componente de UI (page.tsx), tornando as atualizações de conteúdo um processo de desenvolvimento (em vez de um processo de conteúdo).

Documentação Inexistente: O README.md é o template padrão, e componentes complexos como StaggeredMenu e os hooks de animação carecem de documentação JSDoc, aumentando a complexidade cognitiva para manutenção.

Recomendação Imediata: O foco principal deve ser a Resolução do Conflito de Scroll (Prioridade 1), seguida imediatamente pela Refatoração do page.tsx (Prioridade 2). Sem estas duas etapas, nenhuma outra melhoria de performance ou UX terá o impacto desejado.

ANÁLISE TÉCNICA DETALHADA
1. AUDITORIA DE CÓDIGO
1.1 Análise Estática e Complexidade (Cognitiva)
Problema: Os componentes StaggeredMenu.tsx e Footer.tsx, e os hooks useLocomotiveScroll.tsx e useMagneticButton.tsx são complexos. O StaggeredMenu, em particular, gere múltiplas refs, timelines de GSAP, e estados do Framer Motion, resultando em alta complexidade cognitiva.

Impacto: Dificuldade extrema de depuração e manutenção. Qualquer pequena alteração no StaggeredMenu pode quebrar as animações de abertura/fechamento de formas inesperadas.

Recomendação: Documentar intensivamente estes arquivos com JSDoc. Para o StaggeredMenu, considere dividi-lo em hooks menores (ex: useMenuAnimation, useMenuState) para isolar a lógica.

Exemplo Prático (JSDoc para useMagneticButton):

TypeScript

// src/hooks/useMagneticButton.tsx

/**
 * Aplica um efeito de "íman" a um elemento de UI.
 * * O elemento seguirá o cursor do rato dentro de seus limites,
 * criando um efeito de "distorção" elástica.
 * Retorna ao centro quando o rato sai.
 *
 * @param el A Ref (React.RefObject) para o HTMLElement que deve ser magnético.
 * @param strength A força do efeito magnético (0.0 a 1.0). Default: 0.5.
 */
export const useMagneticButton = (
    el: React.RefObject<HTMLElement>,
    strength: number = 0.5 
) => {
    // ...lógica do hook...
};
Prioridade: Média

2. ARQUITETURA E ESTRUTURA
2.1 Conflito de Inicialização do Scroll (Acoplamento)
Problema: Existem duas inicializações concorrentes do Locomotive Scroll.

layout.tsx importa e inicializa o locomotive-scroll num useEffect, fornecendo-o via Contexto.

useLocomotiveScroll.tsx faz a mesma coisa, mas também adiciona a integração essencial com o GSAP ScrollTrigger.

O layout.tsx não usa o hook, resultando num scroll suave que não está ciente do ScrollTrigger.

Impacto: Crítico. O useFadeInUp (que depende do ScrollTrigger) nunca será disparado. Todas as animações de entrada de seção estão quebradas, apesar do código estar presente.

Recomendação: Centralizar a lógica. O layout.tsx deve usar o useLocomotiveScroll.tsx. O hook deve ser modificado para aceitar a função setScroll do Contexto, atualizando o estado global.

Exemplo Prático:

TypeScript

// src/hooks/useLocomotiveScroll.tsx
const useLocomotiveScroll = (
  containerRef: React.RefObject<HTMLDivElement>,
  setIsReady: (isReady: boolean) => void,
  // 1. Aceitar o setter do Contexto
  setScroll: (scroll: any) => void 
) => {
  useEffect(() => {
    // ...
    import('locomotive-scroll').then((LocomotiveScrollModule) => {
      scroll = new LocomotiveScrollModule.default({ ... });
      // ... (Toda a lógica do ScrollTrigger) ...

      // 2. Atualizar o Contexto com a instância correta
      setScroll(scroll);
      setIsReady(true); 

      return () => {
        // 3. Limpar o Contexto
        if (scroll) scroll.destroy();
        setScroll(null);
        // ...
      };
    });
  }, [containerRef, setIsReady, setScroll]); // 4. Adicionar dependência
};

// src/app/layout.tsx
export default function RootLayout({ children }) {
  // ...
  const [scroll, setScroll] = useState<any | null>(null);

  // 1. REMOVER o useEffect de inicialização daqui.

  // 2. Usar o hook centralizado
  useLocomotiveScroll(mainContainerRef, setIsReady, setScroll);

  return (
    <html lang="pt-BR">
      <body>
        {/* 3. O Provider agora recebe o scroll correto do hook */}
        <LocomotiveScrollContext.Provider value={{ scroll }}>
          {/* ... */}
        </LocomotiveScrollContext.Provider>
      </body>
    </html>
  );
}
Prioridade: Alta (Crítica)

2.2 God Component (Separação de Concerns / Princípio SOLID)
Problema: page.tsx viola o Princípio da Responsabilidade Única (SRP). Ele é responsável por:

Manter os dados de conteúdo (variável portfolioData).

Orquestrar o layout de todas as seções (Hero, Sobre, Projetos, etc.).

Gerir dezenas de refs de animação para todos os elementos filhos.

Impacto: Manutenção difícil. Alterar uma seção pode quebrar outra. As seções não são reutilizáveis. A legibilidade é muito baixa.

Recomendação: Como sugerido nas suas notas, "Dividir e Conquistar". Criar uma pasta src/components/sections/ e mover cada seção (<section>...</section>) para seu próprio componente (ex: HeroSection.tsx, ProjectsSection.tsx). O page.tsx deve apenas importar e orquestrar estes componentes.

Exemplo Prático:

TypeScript

// src/app/page.tsx (Depois)
"use client";
import { portfolioData } from '@/lib/data'; // (Ver próximo ponto)
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
// ... importações das outras seções

export default function Home() {
  return (
    <>
      <HeroSection data={portfolioData.hero} />
      <AboutSection data={portfolioData.about} />
      {/* ... etc ... */}
    </>
  );
}

// src/components/sections/HeroSection.tsx (Novo)
"use client";
import { useRef } from 'react';
import { useFadeInUp } from '@/hooks/useFadeInUp';
// ...

export default function HeroSection({ data }) {
  const titleRef = useRef(null);
  useFadeInUp(titleRef, 0.1);

  return (
    <section id="inicio" data-scroll-section>
      <h1 ref={titleRef}>{data.name}</h1>
      {/* ... */}
    </section>
  );
}
Prioridade: Alta

2.3 Acoplamento de Dados (Separação de Concerns)
Problema: A variável portfolioData está "hardcoded" dentro do componente page.tsx.

Impacto: Viola a separação entre conteúdo e apresentação. Para atualizar um projeto ou corrigir um erro de digitação, é preciso editar a lógica do componente principal da aplicação e fazer um novo deploy.

Recomendação: (Nível 1) Mover portfolioData para um arquivo dedicado (ex: src/lib/data.ts) e importá-lo.

Exemplo Prático:

TypeScript

// src/lib/data.ts (Novo)
export const portfolioData = {
  name: "Victor Cunha",
  title: "Desenvolvedor Full Stack",
  // ... todos os outros dados
};

// src/app/page.tsx
import { portfolioData } from '@/lib/data';
// ...
Prioridade: Alta

3. SEGURANÇA E BOAS PRÁTICAS
3.1 Validação de Formulário (Cliente-Servidor)
Problema: O formulário no Footer.tsx possui validação robusta, mas apenas no lado do cliente (validateForm, handleInputChange). Não há menção ou evidência de validação no lado do servidor.

Impacto: A validação do cliente pode ser facilmente contornada, levando a envios de spam ou dados maliciosos.

Recomendação: Manter a validação do cliente para uma boa UX. Adicionar uma validação idêntica no lado do servidor (seja num API Route do Next.js ou numa Server Action) antes de processar os dados (ex: enviar o email).

Exemplo Prático (num API Route src/app/api/contact/route.ts):

TypeScript

export async function POST(request: Request) {
  const data = await request.json();

  // Validar no servidor
  if (!data.name || !data.email || !data.message) {
    return new Response(JSON.stringify({ error: "Campos obrigatórios em falta." }), { status: 400 });
  }

  // ... Lógica de envio de email ...
  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
Prioridade: Média

3.2 Acessibilidade (Movimento Reduzido)
Problema: O projeto usa animações pesadas (GSAP, Framer Motion) mas não parece respeitar a preferência de "Movimento Reduzido" (prefers-reduced-motion) do utilizador.

Impacto: Pode causar desconforto físico (náusea, tontura) a utilizadores com distúrbios vestibulares.

Recomendação: Criar um hook usePrefersReducedMotion e usá-lo para desativar ou simplificar animações (ex: trocar useFadeInUp por um fade simples) se a preferência estiver ativa.

Exemplo Prático:

TypeScript

// src/hooks/usePrefersReducedMotion.ts
import { useState, useEffect } from 'react';

export function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    // ... (listener para mudanças)
  }, []);
  return prefersReducedMotion;
}

// src/hooks/useFadeInUp.tsx
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

export const useFadeInUp = (el, delay) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (prefersReducedMotion) {
      // Apenas torna visível, sem animação
      gsap.set(el.current, { opacity: 1 });
      return;
    }
    // ... (lógica de animação completa)
  }, [el, delay, prefersReducedMotion]);
};
Prioridade: Média

4. PERFORMANCE E OTIMIZAÇÃO
4.1 Bundle Size (Bibliotecas Duplas de Animação)
Problema: O projeto importa tanto gsap quanto framer-motion (verificado no package.json).

Impacto: Ambas são bibliotecas de animação grandes. O GSAP é necessário para o ScrollTrigger. O Framer Motion é usado no StaggeredMenu. Isso aumenta o tamanho final do bundle JavaScript que o cliente tem de baixar.

Recomendação: Fazer uma auditoria. É possível reescrever as animações do StaggeredMenu usando apenas o GSAP (que já é uma dependência obrigatória)? Se sim, remova o framer-motion para reduzir o bundle. Se não (porque a lógica declarativa do Framer é muito complexa de replicar), aceite o custo, mas esteja ciente dele.

Prioridade: Baixa

4.2 Dependências Não Utilizadas
Problema: O package.json lista tailwindcss, mas as suas notas e os arquivos de estilo (.css, .module.css) indicam que o projeto usa CSS Puros e CSS Modules.

Impacto: Baixo, mas indica "sujidade" no projeto. Confunde novos desenvolvedores sobre qual é o sistema de design a ser usado.

Recomendação: Desinstalar dependências não utilizadas.

Exemplo Prático:

Bash

npm uninstall tailwindcss @tailwindcss/postcss
(E remover tailwind.config.ts e postcss.config.mjs se não forem usados pelo Autoprefixer).

Prioridade: Baixa

5. EXPERIÊNCIA DO USUÁRIO
5.1 "Confiança Tipográfica" (Design de UI)
Problema: O page.tsx importa ícones do react-icons (ex: FaGithub, FaEnvelope) para botões e links.

Impacto: Como as suas notas sugerem, isto "barateia" um design que, de resto, é de luxo e focado na tipografia (fonte Satoshi).

Recomendação: Adotar a sua ideia de "Confiança Tipográfica". Remover os ícones de UI e confiar no texto e no espaçamento.

Exemplo Prático (em ProjectsSection.tsx refatorado):

TypeScript

// Antes
<a href={project.repoUrl} className={styles.projectLink}>
  <FaGithub aria-hidden="true" /> Código
</a>

// Depois (Recomendado)
<a href={project.repoUrl} className={styles.projectLink}>
  GitHub
</a>
Prioridade: Média

6. DOCUMENTAÇÃO E PADRÕES
6.1 README (O "Manifesto do Arquiteto")
Problema: O README.md é o template padrão do create-next-app.

Impacto: Alto (para um portfólio). Esta é a primeira coisa que um recrutador técnico vê. Um README padrão sugere um projeto-template ou falta de cuidado.

Recomendação: Implementar a sua ideia do "Manifesto do Arquiteto".

Exemplo Prático (Estrutura do README.md):

Markdown

# Portfólio Pessoal v2 - [Seu Nome]

[GIF ou Screenshot da Home Page]

Este é o meu portfólio pessoal, focado na demonstração de animações complexas e uma arquitetura front-end moderna.

## Manifesto Técnico: A Escolha da Stack

A stack foi escolhida deliberadamente para orquestrar animações de alta performance:

* **Next.js (App Router) & TypeScript**: Pela performance, SEO e tipagem segura.
* **GSAP & ScrollTrigger**: Escolhido pelo controlo granular de timelines de animação baseadas em scroll.
* **Locomotive Scroll**: Para a experiência de scroll suave (smooth scrolling).
* **CSS Modules**: Para estilos componentizados e isolados.

## Desafio Técnico: Integrando ScrollTrigger + Locomotive

Um desafio central foi integrar o `locomotive-scroll` com o `GSAP ScrollTrigger` no Next.js. A solução foi criar um hook (`useLocomotiveScroll`) e um Contexto para gerir a instância do scroll e sincronizá-la com o `scrollerProxy` do GSAP.

## Como Executar

```bash
npm install
npm run dev
```

## Próximos Passos (Roadmap)
* [ ] Migrar dados dos projetos para um CMS Headless (Sanity/Hygraph).
* [ ] Implementar testes de acessibilidade (`prefers-reduced-motion`).
Prioridade: Alta

3. ROADMAP DE IMPLEMENTAÇÃO (ORDEM SUGERIDA)
(Alta) Corrigir o Conflito de Scroll (Ponto 2.1).

(Alta) Refatorar page.tsx em Componentes de Seção (Ponto 2.2).

(Alta) Externalizar portfolioData para src/lib/data.ts (Ponto 2.3).

(Alta) Escrever o novo README.md ("Manifesto") (Ponto 6.1).

(Média) Adicionar JSDoc aos hooks e componentes complexos (Ponto 1.1).

(Média) Implementar prefers-reduced-motion (Ponto 3.2).

(Média) Implementar "Confiança Tipográfica" (remover ícones) (Ponto 5.1).

(Média) Adicionar validação de servidor ao formulário do Footer (Ponto 3.1).

(Baixa) Remover tailwindcss e dependências não usadas (Ponto 4.2).

(Baixa) Auditar GSAP vs. Framer Motion (Ponto 4.1).

4. PADRÕES E ESTRUTURAS (Templates para Implementação)
Aqui estão os templates para as novas funcionalidades e refatorações que você solicitou.

4.1 Template de Dados (src/lib/data.ts)
Incluindo as suas novas ideias (link da universidade e hobby de fotografia).

TypeScript

// src/lib/data.ts

// --- Tipos ---
interface AcademicItem {
  course: string;
  institution: {
    name: string;
    url: string; // Link para universidade/grade
  };
  period: string;
  description: string;
}

interface Hobby {
  title: string;
  description: string;
  link: {
    url: string;
    label: string; // Ex: "Ver Galeria"
  };
}

// ... (Tipos para Hero, Project, etc.)

// --- Dados ---
export const portfolioData = {
  // ... (name, title, etc.)
  
  academic: [
    {
      course: "Análise e Desenvolvimento de Sistemas",
      institution: {
        name: "Instituição Fictícia de Ensino",
        url: "https://link-para-a-grade.com" // SEU LINK AQUI
      },
      period: "2020 - 2023",
      description: "Foco em desenvolvimento de software..."
    }
  ],

  hobbies: [
    {
      title: "Fotografia",
      description: "Explorando o mundo através de lentes e capturando momentos.",
      link: {
        url: "https://seu-site-de-fotografia.com", // SEU LINK AQUI
        label: "Visitar minha galeria"
      }
    }
  ],

  // ... (projects, skills, etc.)
};
4.2 Template de Componente de Seção (src/components/sections/AcademicSection.tsx)
TypeScript

// src/components/sections/AcademicSection.tsx
"use client";

import { useRef } from 'react';
import styles from '@/app/page.module.css'; // Ou seu próprio .module.css
import { useFadeInUp } from '@/hooks/useFadeInUp';
import { portfolioData } from '@/lib/data'; // Importa os dados

export default function AcademicSection() {
  const academicTitleRef = useRef(null);
  const academicListRef = useRef(null);
  const hobbyTitleRef = useRef(null);
  const hobbyListRef = useRef(null);

  useFadeInUp(academicTitleRef, 0.1);
  useFadeInUp(academicListRef, 0.3);
  useFadeInUp(hobbyTitleRef, 0.1);
  useFadeInUp(hobbyListRef, 0.3);

  const { academic, hobbies } = portfolioData;

  return (
    <section id="academico" className={styles.academicSection} data-scroll-section>
      <div className={styles.container}>

        <h2 ref={academicTitleRef} className={styles.sectionTitle}>Formação Acadêmica</h2>
        <div ref={academicListRef} className={styles.academicList}>
          {academic.map((item, index) => (
            <div key={index} className={styles.academicItem}>
              <h3 className={styles.academicCourse}>{item.course}</h3>
              <p className={styles.academicInstitution}>
                {/* Link da Instituição */}
                <a href={item.institution.url} target="_blank" rel="noopener noreferrer">
                  {item.institution.name}
                </a>
                • {item.period}
              </p>
              <p>{item.description}</p>
            </div>
          ))}
        </div>

        {/* Seção de Hobby (Fotografia) */}
        <h2 ref={hobbyTitleRef} className={`${styles.sectionTitle} ${styles.hobbyTitle}`}>
          Hobbies
        </h2>
        <div ref={hobbyListRef} className={styles.academicList}>
           {hobbies.map((hobby, index) => (
             <div key={index} className={styles.academicItem}>
               <h3 className={styles.academicCourse}>{hobby.title}</h3>
               <p>{hobby.description}</p>
               {/* Link do Hobby */}
               <a 
                 href={hobby.link.url} 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 className={styles.hobbyLink} // Pode precisar de estilo
               >
                 {hobby.link.label}
               </a>
             </div>
           ))}
        </div>

      </div>
    </section>
  );
}
5. COMPORTAMENTO ESPERADO DO SOFTWARE (FLUXOS)
5.1 Funcionalidade: Carregamento de Página e Animação de Scroll
Fluxo Ideal:

Utilizador acede à URL.

layout.tsx é renderizado. O useLocomotiveScroll é chamado.

O mainContainerRef é passado para o hook.

O hook (num useEffect) importa dinamicamente o locomotive-scroll.

A instância do scroll é criada, integrada com o GSAP ScrollTrigger.scrollerProxy.

O hook chama setIsReady(true) e setScroll(instance).

O layout.tsx renderiza {isReady && children}. A página aparece.

O LocomotiveScrollContext.Provider passa a instância de scroll para todos os componentes (incluindo o Footer).

O utilizador faz scroll.

O Locomotive Scroll move o data-scroll-container.

O ScrollTrigger, sincronizado, deteta a posição.

Quando uma seção (ex: #habilidades) entra na viewport, o useFadeInUp dessa seção é disparado, e os elementos aparecem.

Tratamento de Erro (Conflito Atual):

Passos 1-4.

O layout.tsx (na sua implementação antiga) cria uma instância de scroll sem a integração com o scrollerProxy.

O Contexto é preenchido com esta instância "incompleta".

A página aparece.

O utilizador faz scroll.

O scroll suave funciona (porque o Locomotive está a correr).

Os useFadeInUp (que ouvem o ScrollTrigger) nunca são disparados, porque o ScrollTrigger não está ligado ao scroll do Locomotive.

Resultado: O utilizador vê uma página estática sem animações de entrada.

5.2 Funcionalidade: Submissão do Formulário de Contato (no Footer)
Fluxo Ideal:

Utilizador preenche "Nome", "E-mail" e "Mensagem".

Clica em "Enviar mensagem".

handleSubmit é chamado.

validateForm() é executado. Como é válido, retorna true.

setIsSubmitting(true). O botão fica desativado e mostra "Enviando...".

Uma fetch (ou similar) é feita para o API route do Next.js.

O API route valida os dados no servidor. Como é válido, executa a lógica de envio de email.

O API route retorna { success: true }.

handleSubmit recebe a resposta. setIsSubmitted(true). O botão mostra "Mensagem Enviada!".

O formulário é limpo após 5 segundos.

Tratamento de Erro (Cliente):

Utilizador deixa "Nome" em branco e clica em "Enviar".

handleSubmit -> validateForm().

validateForm() deteta o nome em falta, chama setErrors({ name: 'Nome é obrigatório' }) e retorna false.

handleSubmit termina (retorna void).

O componente é re-renderizado. A mensagem de erro "Nome é obrigatório" aparece abaixo do input.

setIsSubmitting nunca fica true. Nenhuma chamada de API é feita.

Tratamento de Erro (Servidor):

Passos 1-6 do Fluxo Ideal.

O API route falha (ex: o serviço de email está offline) e retorna { error: "Falha no servidor" } com status 500.

O catch (error) no handleSubmit é acionado.

console.error() regista o erro.

O finally block define setIsSubmitting(false).

O botão volta ao estado "Enviar mensagem". (Recomendação: Adicionar um estado setError para mostrar uma mensagem de falha ao utilizador).

