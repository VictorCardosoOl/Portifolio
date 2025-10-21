// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // Estilos globais

// Importe componentes de Header e Footer (vamos criá-los a seguir)
import Header from "@/components/Header"; // Usando o alias '@/' configurado
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" }); // Configuração da fonte (opcional)

// Metadados atualizados para o portfólio
export const metadata: Metadata = {
  title: "Victor Cunha - Desenvolvedor Full Stack", // SEU NOME E TÍTULO
  description: "Portfólio de Victor Cunha, mostrando projetos e habilidades em desenvolvimento web.", // SUA DESCRIÇÃO
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable}`}> {/* Adiciona a variável da fonte ao HTML */}
      <body>
        {/* Inclui o Header que aparecerá em todas as páginas */}
        <Header />

        {/* Conteúdo principal da página atual */}
        <main className="main-content"> {/* Adiciona uma classe para estilização, se necessário */}
          {children}
        </main>

        {/* Inclui o Footer que aparecerá em todas as páginas */}
        <Footer />
      </body>
    </html>
  );
}