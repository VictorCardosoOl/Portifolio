// src/app/layout.tsx
import type { Metadata } from "next";
// 1. Importa a nova fonte 'Playfair_Display'
import { Playfair_Display } from "next/font/google"; // Remove ou comenta 'Inter'
import "./globals.css";

import StaggeredMenu from "@/components/StaggeredMenu";
import Footer from "@/components/Footer";

// 2. Configura a nova fonte
const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-playfair" // Define a variável CSS que usamos no globals.css
}); 

export const metadata: Metadata = {
  title: "Victor Cunha - Desenvolvedor Full Stack",
  description: "Portfólio de Victor Cunha, mostrando projetos e habilidades em desenvolvimento web.",
};

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
  return (
    // 3. Aplica a classe da nova fonte ao HTML
    <html lang="pt-BR" className={`${playfair.variable}`}> 
      <body>
        <StaggeredMenu
          isFixed={true} 
          logoText="Victor Cunha" 
          position="right" 
          items={menuItems}
          socialItems={socialItems}
          displaySocials={true}
          displayItemNumbering={true}
          // 4. Ajusta as cores do botão do menu para o tema claro
          menuButtonColor="#333333" // Botão escuro no fundo branco
          openMenuButtonColor="#FFFFFF" // Botão branco no painel verde (ajustar cor do painel no CSS)
          changeMenuColorOnOpen={true}
          accentColor="#A8D8B9" // Verde pastel principal
          // 5. Ajusta as cores das camadas de fundo do menu
          colors={['#E0F2E9', '#A8D8B9']} // Tons de verde pastel
        />
        
        <main className="main-content">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}