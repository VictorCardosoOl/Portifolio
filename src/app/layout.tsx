// src/app/layout.tsx
"use client"; 

import { useRef, useState } from 'react';
import "./globals.css";

import StaggeredMenu from "@/components/StaggeredMenu";
import Footer from "@/components/Footer";
import useLocomotiveScroll from '@/hooks/useLocomotiveScroll'; 

const menuItems = [
  // ... (seus menuItems)
];

const socialItems = [
  // ... (seus socialItems)
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  useLocomotiveScroll(mainContainerRef, setIsReady);

  return (
    <html lang="pt-BR"> 
      <body>
        <StaggeredMenu
          isFixed={true} 
          logoText="Victor Cunha" 
          position="right" 
          items={menuItems}
          socialItems={socialItems}
          displaySocials={true}
          displayItemNumbering={true}
          menuButtonColor="#FFFFFF"
          openMenuButtonColor="#FFFFFF"
          changeMenuColorOnOpen={true}
          accentColor="#A8D8B9" 
          colors={['#1A1A1A', '#222222']}
        />
        
        <main 
          ref={mainContainerRef} 
          className="main-content" 
          data-scroll-container 
        >
          {/* O conteúdo da página (page.tsx) */}
          {isReady && children}
          
          {/* * ==================
            * CORREÇÃO (PASSO 1)
            * ==================
            * O Footer DEVE estar DENTRO do <main data-scroll-container>
            * Todas as seções (incluindo o footer) precisam estar aqui.
          */}
          {isReady && <Footer />}
          
        </main> 
        {/* O MAIN TERMINA AQUI, ABRAÇANDO TUDO */}

      </body>
    </html>
  );
}