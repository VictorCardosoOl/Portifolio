// src/app/layout.tsx
"use client";

import { useRef, useState, useEffect } from 'react';
import "./globals.css";

import StaggeredMenu from "@/components/StaggeredMenu";
import Footer from "@/components/Footer";

// Importações do Locomotive Scroll
import 'locomotive-scroll/dist/locomotive-scroll.css';
import { LocomotiveScrollContext } from '@/contexts/LocomotiveScrollContext';
import useLocomotiveScroll from '@/hooks/useLocomotiveScroll';

// --- DEFINIÇÃO DOS ITENS DO MENU ---
// Os 'links' correspondem aos IDs definidos nas suas seções (ex: <section id="about">)
const menuItems = [
  { 
    label: 'Home', 
    ariaLabel: 'Voltar ao topo', 
    link: '#hero-section' 
  },
  { 
    label: 'Sobre', 
    ariaLabel: 'Ir para Sobre Mim', 
    link: '#about' 
  },
  { 
    label: 'Formação', 
    ariaLabel: 'Ir para Formação Acadêmica', 
    link: '#academic' 
  },
  { 
    label: 'Skills', 
    ariaLabel: 'Ir para Habilidades', 
    link: '#skills' 
  },
  { 
    label: 'Projetos', 
    ariaLabel: 'Ir para Projetos', 
    link: '#projects' 
  },
  { 
    label: 'Contato', 
    ariaLabel: 'Ir para Contato', 
    link: '#contact' 
  },
];

// --- DEFINIÇÃO DAS REDES SOCIAIS ---
// Lembre-se de colocar seus links reais aqui
const socialItems = [
  { label: 'LinkedIn', link: 'https://www.linkedin.com/' },
  { label: 'GitHub', link: 'https://github.com/' },
  { label: 'Instagram', link: 'https://www.instagram.com/' },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const mainContainerRef = useRef<HTMLDivElement>(null);
  
  // Estados para controle do carregamento e scroll
  const [isLocomotiveReady, setIsLocomotiveReady] = useState(false);
  const [isContentLoaded, setIsContentLoaded] = useState(false);
  const [scroll, setScroll] = useState<any | null>(null);

  // Inicializa o hook customizado do scroll
  useLocomotiveScroll(mainContainerRef, setIsLocomotiveReady, setScroll);

  // Verifica quando a página terminou de carregar completamente
  useEffect(() => {
    const onPageLoad = () => {
      setIsContentLoaded(true);
    };

    if (document.readyState === 'complete') {
      onPageLoad();
    } else {
      window.addEventListener('load', onPageLoad);
      return () => window.removeEventListener('load', onPageLoad);
    }
  }, []); 

  // Só mostra o conteúdo quando o scroll e a página estiverem prontos
  const isReady = isLocomotiveReady && isContentLoaded;

  return (
    <html lang="pt-BR"> 
      <body>
        <LocomotiveScrollContext.Provider value={{ scroll }}>
          <StaggeredMenu
            isFixed={true} 
            logoText="" // Deixamos vazio pois ocultamos via CSS
            position="right" 
            items={menuItems}
            socialItems={socialItems}
            displaySocials={true}
            displayItemNumbering={true}
            // Cores do botão (o mix-blend-mode no CSS cuida do contraste, então branco é seguro)
            menuButtonColor="#000000ff"
            openMenuButtonColor="#020202ff"
            changeMenuColorOnOpen={true} 
            accentColor="#B19EEF" // Cor de destaque ao passar o mouse (roxo claro)
            colors={['#1e1e22', '#35353c']} // Cores das camadas de fundo da animação
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
      </body>
    </html>
  );
}