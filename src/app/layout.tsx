// src/app/layout.tsx
"use client"; 

import { useRef } from 'react';
// Removido import de Metadata pois não funciona com "use client" aqui
import { Playfair_Display } from "next/font/google";
import "./globals.css";

import StaggeredMenu from "@/components/StaggeredMenu";
import Footer from "@/components/Footer";
import useLocomotiveScroll from '@/hooks/useLocomotiveScroll'; 

const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-playfair"
}); 

// Se precisar da Metadata, defina-a na page.tsx correspondente

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
  useLocomotiveScroll(mainContainerRef);

  return (
    <html lang="pt-BR" className={`${playfair.variable}`}> 
      <body>
        {/* 1. StaggeredMenu AGORA ESTÁ FORA do <main> */}
        <StaggeredMenu
          isFixed={true} 
          logoText="Victor Cunha" 
          position="right" 
          items={menuItems}
          socialItems={socialItems}
          displaySocials={true}
          displayItemNumbering={true}
          menuButtonColor="#333333" 
          openMenuButtonColor="#FFFFFF" 
          changeMenuColorOnOpen={true}
          accentColor="#A8D8B9" 
          colors={['#E0F2E9', '#A8D8B9']} 
        />
        
        {/* 2. O <main> continua sendo o container do scroll */}
        <main 
          ref={mainContainerRef} 
          className="main-content" 
          data-scroll-container 
        >
          {children}
          {/* O Footer pode ficar aqui DENTRO se você quiser que ele faça parte do scroll suave */}
          {/* Ou FORA se ele deve ficar sempre visível ou ter comportamento diferente */}
          <Footer />  
        </main>

        {/* 3. Coloquei o Footer FORA do main por simplicidade inicial */}
       
      </body>
    </html>
  );
}