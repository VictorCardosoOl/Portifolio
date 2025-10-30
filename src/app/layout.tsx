// src/app/layout.tsx
"use client"; 

import { useRef, useState } from 'react'; // 1. Importa o useState
// 2. REMOVEMOS as importações de 'next/font/google'
import "./globals.css";

import StaggeredMenu from "@/components/StaggeredMenu";
import Footer from "@/components/Footer";
import useLocomotiveScroll from '@/hooks/useLocomotiveScroll'; 

// 3. REMOVEMOS as constantes 'playfair' e 'manrope'

const menuItems = [
  { label: 'Sobre', ariaLabel: 'Ir para seção Sobre', link: '/#sobre' },
  { label: 'Projetos', ariaLabel: 'Ver meus projetos', link: '/#projetos' },
  { label: 'Habilidades', ariaLabel: 'Ver minhas habilidades', link: '/#habilidades' },
  { label: 'Contato', ariaLabel: 'Entrar em contato', link: '/#contato' }
];

const socialItems = [
  { label: 'GitHub', link: 'https://github.com/VictorCardosoOl' },
  { label: 'LinkedIn', link: 'https://www.linkedin.com/in/victor-card-cunha/' },
  { label: 'Instagram', link: 'https://www.instagram.com/hi.chicocdo/' },
  { label: 'WhatsApp', link: 'https://wa.me/5511977440146' }
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const mainContainerRef = useRef<HTMLDivElement>(null);
  // 4. Cria o estado de "pronto"
  const [isReady, setIsReady] = useState(false);

  // 5. Passa o setIsReady para o hook
  useLocomotiveScroll(mainContainerRef, setIsReady);

  return (
    // 6. REMOVEMOS as classes de fonte da tag <html>
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
          {/* 7. Só renderiza o conteúdo QUANDO estiver pronto */}
          {isReady && children}
          {isReady && <Footer />}
        </main>
      </body>
    </html>
  );
}