// src/app/layout.tsx
"use client"; 

import { useRef } from 'react';
// Importa Manrope junto com Playfair_Display
import { Playfair_Display, Manrope } from "next/font/google";
import "./globals.css";

import StaggeredMenu from "@/components/StaggeredMenu";
import Footer from "@/components/Footer";
import useLocomotiveScroll from '@/hooks/useLocomotiveScroll'; 

const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-playfair"
}); 

// 1. Configura a nova fonte Manrope
const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  weight: ['400', '500', '700'] // Pesos que vamos usar
});

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
    // 2. Adiciona a variável da fonte Manrope ao HTML
    <html lang="pt-BR" className={`${playfair.variable} ${manrope.variable}`}> 
      <body>
        <StaggeredMenu
          isFixed={true} 
          logoText="Victor Cunha" 
          position="right" 
          items={menuItems}
          socialItems={socialItems}
          displaySocials={true}
          displayItemNumbering={true}
          menuButtonColor="#FFFFFF" // 3. MUDADO para branco
          openMenuButtonColor="#FFFFFF" // MUDADO para branco
          changeMenuColorOnOpen={true}
          accentColor="#A8D8B9" 
          colors={['#1A1A1A', '#222222']} // Cores do painel para o dark mode
        />
        
        <main 
          ref={mainContainerRef} 
          className="main-content" 
          data-scroll-container 
        >
          {children}
          <Footer />  
        </main>
      </body>
    </html>
  );
}