// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// 1. Importa o novo StaggeredMenu
import StaggeredMenu from "@/components/StaggeredMenu"; 
// 2. Remove a importação do Header antigo
// import Header from "@/components/Header"; 
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Victor Cunha - Desenvolvedor Full Stack",
  description: "Portfólio de Victor Cunha, mostrando projetos e habilidades em desenvolvimento web.",
};

// 3. Define os teus links aqui, com base nos teus ficheiros
const menuItems = [
  { label: 'Sobre', ariaLabel: 'Ir para seção Sobre', link: '/#sobre' },
  { label: 'Projetos', ariaLabel: 'Ver meus projetos', link: '/#projetos' },
  { label: 'Habilidades', ariaLabel: 'Ver minhas habilidades', link: '/#habilidades' },
  { label: 'Contato', ariaLabel: 'Entrar em contato', link: '/#contato' }
];

// 4. Define os teus links sociais (peguei do teu Footer.tsx)
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
  return (
    <html lang="pt-BR" className={`${inter.variable}`}>
      <body>
        {/* 5. Substitui <Header /> pelo <StaggeredMenu /> configurado */}
        <StaggeredMenu
          isFixed={true} // Mantém o botão do menu fixo na tela
          logoText="Victor Cunha" // O teu nome como logo
          position="right" // Posição do menu (pode ser 'left')
          items={menuItems}
          socialItems={socialItems}
          displaySocials={true}
          displayItemNumbering={true}
          menuButtonColor="#fff" // Cor do botão fechado
          openMenuButtonColor="#1a1a1a" // Cor do botão aberto (para contrastar com o painel)
          changeMenuColorOnOpen={true}
          accentColor="#8a2be2" // Tua cor primária do page.module.css
        />
        
        <main className="main-content">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}