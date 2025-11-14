// src/app/layout.tsx
"use client"; 

// 1. Importar hooks do React (REMOVEMOS O 'useEffect' DAQUI)
import { useRef, useState } from 'react';
import "./globals.css";

import StaggeredMenu from "@/components/StaggeredMenu";
import Footer from "@/components/Footer";

// 2. Importar o CSS e o Contexto
import 'locomotive-scroll/dist/locomotive-scroll.css';
import { LocomotiveScrollContext } from '@/contexts/LocomotiveScrollContext';

// 3. IMPORTAR O HOOK CORRETO (QUE TEM O GSAP)
import useLocomotiveScroll from '@/hooks/useLocomotiveScroll';

// (Os teus menuItems e socialItems - mantidos)
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
  children: React.Node;
}>) {
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  
  // 3. Estado para guardar a instância do scroll
  const [scroll, setScroll] = useState<any | null>(null);

  // 4. O 'useEffect' (linhas 33-83 do teu ficheiro antigo) FOI REMOVIDO!
  // Esta era a Lógica 1 (conflituosa).

  // 5. CHAMAR A LÓGICA 2 (O HOOK CORRETO)
  // Agora o layout DELEGA a criação do scroll para o hook.
  useLocomotiveScroll(mainContainerRef, setIsReady, setScroll);

  return (
    <html lang="pt-BR"> 
      <body>
        {/* 6. O Provider agora recebe a instância de scroll vinda do HOOK (com GSAP) */}
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