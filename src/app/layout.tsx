// src/app/layout.tsx
"use client"; 

import { useRef, useState } from 'react';
import "./globals.css";

import StaggeredMenu from "@/components/StaggeredMenu";
import Footer from "@/components/Footer";
import useLocomotiveScroll from '@/hooks/useLocomotiveScroll'; 

// --- ATUALIZAÇÃO: Itens de Menu e Sociais ---
// Preenchi com base nas seções da sua page.tsx e dados do Footer.tsx
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

  useLocomotiveScroll(mainContainerRef, setIsReady);

  return (
    <html lang="pt-BR"> 
      <body>
        
        {/* --- ATUALIZAÇÃO: Props do Menu para o Tema Claro --- */}
        <StaggeredMenu
          isFixed={true} 
          logoText="Victor Cunha" 
          position="right" 
          items={menuItems}
          socialItems={socialItems}
          displaySocials={true}
          displayItemNumbering={true}
          
          /* Cores atualizadas para o tema claro */
          menuButtonColor="#121212"     /* Botão do menu (fechado) em preto */
          openMenuButtonColor="#121212" /* Botão do menu (aberto) em preto */
          changeMenuColorOnOpen={true}
          accentColor="#121212"         /* Cor de acento (números, hovers) em preto */
          colors={['#FFFFFF', '#F5F5F5']} /* Cores dos painéis do menu (branco e cinza claro) */
        />
        
        <main 
          ref={mainContainerRef} 
          className="main-content" 
          data-scroll-container 
        >
          {isReady && children}
          
          {/* Footer dentro do main (Correto!) */}
          {isReady && <Footer />}
          
        </main> 

      </body>
    </html>
  );
}