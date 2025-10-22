// src/components/Header.tsx
"use client"; // Necessário para animações interativas com Framer Motion

import React from 'react';
import Link from 'next/link'; // Importa o Link do Next.js para navegação otimizada
import { motion } from 'framer-motion'; // Importa motion para animações
import './Header.css'; // Importa o CSS para estilização

const Header = () => {
  return (
    // Animação inicial: header desliza de cima para baixo
    <motion.header
      className="main-header"
      initial={{ y: -100, opacity: 0 }} // Começa 100px acima e invisível
      animate={{ y: 0, opacity: 1 }}    // Anima para a posição 0 (visível) e opacidade 1
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }} // Define a transição (duração, easing, atraso)
    >
      <nav className="main-nav">
        {/* Animação no hover do logo */}
        <motion.div
          className="logo"
          whileHover={{ scale: 1.05 }} // Aumenta um pouco no hover
          whileTap={{ scale: 0.95 }}   // Diminui um pouco ao clicar
          transition={{ type: "spring", stiffness: 400, damping: 15 }} // Efeito elástico
        >
          <Link href="/"> {/* Link para a página inicial */}
            Victor Cunha
          </Link>
        </motion.div>

        {/* Links de Navegação */}
        <ul className="nav-links">
          {/* Usando Link para navegação interna suave para seções */}
          <li><Link href="/#sobre">Sobre</Link></li>
          <li><Link href="/#projetos">Projetos</Link></li>
          <li><Link href="/#habilidades">Habilidades</Link></li>
          <li><Link href="/#contato">Contato</Link></li>
        </ul>
      </nav>
    </motion.header>
  );
};

export default Header;