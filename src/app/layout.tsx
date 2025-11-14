// src/app/layout.tsx
"use client"; 

// 1. Importar hooks do React
import { useRef, useState, useEffect } from 'react';
import "./globals.css";

import StaggeredMenu from "@/components/StaggeredMenu";
import Footer from "@/components/Footer";

// 2. Importar o CSS do Locomotive e o nosso novo Contexto
import 'locomotive-scroll/dist/locomotive-scroll.css';
import { LocomotiveScrollContext } from '@/contexts/LocomotiveScrollContext';

import useLocomotiveScroll from '@/hooks/useLocomotiveScroll';

// (Seus menuItems e socialItems - mantidos)
const menuItems = [
  { label: "Início", ariaLabel: "Ir para o início", link: "/#inicio" },
  { label: "Sobre", ariaLabel: "Ir para sobre mim", link: "/#sobre" },
  { label: "Projetos", ariaLabel: "Ir para projetos", link: "/#projetos" },
  { label: "Habilidades", ariaLabel: "Ir para habilidades", link: "/#habilidades" },
  { label: "Contato", ariaLabel: "Ir para contato", link: "/#contato" },
];
const socialItems = [
  { label: "GitHub", link: "https://github.com/VictorCardosoOl" },
  { label: "LinkedIn", link: "https://www.linkedin.com/in/victor-card-cunha/" },
  { label: "Instagram", link: "https://www.instagram.com/hi.chicocdo/" },
  { label: "WhatsApp", link: "https://wa.me/5511977440146" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  
  // 3. Estado para guardar a instância do scroll
  const [scroll, setScroll] = useState<any | null>(null);

  // 4. Vamos gerir o 'useEffect' aqui
  useEffect(() => {
    let locomotiveScroll: any | null = null;
    let resizeObserver: ResizeObserver | null = null;

    // 5. CORREÇÃO: Usar importação dinâmica (só no cliente)
    import('locomotive-scroll').then((LocomotiveScroll) => {
      if (mainContainerRef.current) {
        locomotiveScroll = new LocomotiveScroll.default({
          el: mainContainerRef.current,
          smooth: true,
          multiplier: 1,
          class: 'is-reveal',
        });
        
        // 6. Guarda a instância no estado para partilhar no Contexto
        setScroll(locomotiveScroll);
        setIsReady(true); // Site pronto!

        // 7. Observer robusto para atualizar o scroll
        resizeObserver = new ResizeObserver(() => {
          locomotiveScroll?.update();
        });
        resizeObserver.observe(mainContainerRef.current);
      }
    }).catch(error => {
      console.error("Erro ao carregar Locomotive Scroll:", error);
      setIsReady(true);
    });

    // 8. Limpeza
    return () => {
      if (locomotiveScroll) {
        locomotiveScroll.destroy();
      }
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      setScroll(null);
      setIsReady(false);
    };
  }, []); // Executa apenas uma vez

  return (
    <html lang="pt-BR"> 
      <body>
        {/* 9. "Fornece" a instância do scroll para todos os componentes filhos */}
        <LocomotiveScrollContext.Provider value={{ scroll }}>
          <StaggeredMenu
            isFixed={true} 
            logoText="Victor Cunha" 
            position="right" 
            items={menuItems}
            socialItems={socialItems}
            displaySocials={true}
            displayItemNumbering={true}
            menuButtonColor="#121212"
            openMenuButtonColor="#121212"
            changeMenuColorOnOpen={true}
            accentColor="#121212" 
            colors={['#FFFFFF', '#F5F5F5']}
          />
          
          <main 
            ref={mainContainerRef} 
            className="main-content" 
            data-scroll-container 
          >
            {isReady && children}
            
            {/* O Footer agora está dentro do Provider */}
            {isReady && <Footer />}
            
          </main> 
        </LocomotiveScrollContext.Provider>
      </body>
    </html>
  );
}