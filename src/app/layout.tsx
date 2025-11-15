// src/app/layout.tsx
"use client"; 

// 1. Importar hooks do React
import { useRef, useState, useEffect } from 'react';
import "./globals.css";

import StaggeredMenu from "@/components/StaggeredMenu";
import Footer from "@/components/Footer";

// 2. Importar o CSS e os Contextos
import 'locomotive-scroll/dist/locomotive-scroll.css';
import { LocomotiveScrollContext } from '@/contexts/LocomotiveScrollContext';
// A importação do 'MagneticProvider' FOI REMOVIDA daqui

// 3. IMPORTAR O HOOK CORRETO (QUE TEM O GSAP)
import useLocomotiveScroll from '@/hooks/useLocomotiveScroll';

// (Os teus menuItems e socialItems - mantidos)
const menuItems = [ /* ... */ ];
const socialItems = [ /* ... */ ];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const mainContainerRef = useRef<HTMLDivElement>(null);
  
  // Lógica do Preloader (mantida)
  const [isLocomotiveReady, setIsLocomotiveReady] = useState(false);
  const [isContentLoaded, setIsContentLoaded] = useState(false);
  const [scroll, setScroll] = useState<any | null>(null);

  useLocomotiveScroll(mainContainerRef, setIsLocomotiveReady, setScroll);

  useEffect(() => {
    const onPageLoad = () => {
      console.log("Conteúdo da página totalmente carregado.");
      setIsContentLoaded(true);
    };

    if (document.readyState === 'complete') {
      onPageLoad();
    } else {
      window.addEventListener('load', onPageLoad);
      return () => window.removeEventListener('load', onPageLoad);
    }
  }, []); 

  const isReady = isLocomotiveReady && isContentLoaded;

  return (
    <html lang="pt-BR"> 
      <body>
        {/* O 'MagneticProvider' FOI REMOVIDO daqui */}
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
            {isReady && <Footer />}
          </main> 
        </LocomotiveScrollContext.Provider>
        {/* O 'MagneticProvider' FOI REMOVIDO daqui */}
      </body>
    </html>
  );
}