// src/app/layout.tsx
"use client"; 

// 1. Importar hooks do React (NÃO precisamos do useEffect aqui)
import { useRef, useState } from 'react';
import "./globals.css";

import StaggeredMenu from "@/components/StaggeredMenu";
import Footer from "@/components/Footer";

// 2. Importar o CSS do Locomotive e o nosso Contexto
import 'locomotive-scroll/dist/locomotive-scroll.css';
import { LocomotiveScrollContext } from '@/contexts/LocomotiveScrollContext';

// 3. !! IMPORTANTE: Importar o NOSSO hook !!
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
  
  const [scroll, setScroll] = useState<any | null>(null);

  // 4. !! AQUI ESTÁ A VERSÃO CORRETA !!
  // Nós apenas CHAMAMOS o hook.
  useLocomotiveScroll(mainContainerRef, setIsReady, setScroll);

  return (
    <html lang="pt-BR"> 
      <body>
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
            
            {/* O Footer está no sítio certo (dentro do main) */}
            {isReady && <Footer />}
            
          </main> 
        </LocomotiveScrollContext.Provider>
      </body>
    </html>
  );
}