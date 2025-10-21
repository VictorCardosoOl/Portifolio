// src/components/Header.tsx
import React from 'react';
import Link from 'next/link'; // Importa o Link do Next.js para navegação
import './Header.css'; // Vamos criar este CSS a seguir

const Header = () => {
  return (
    <header className="main-header">
      <nav className="main-nav">
        <div className="logo">
          <Link href="/"> {/* Link para a página inicial */}
            Victor Cunha
          </Link>
        </div>
        <ul className="nav-links">
          <li><Link href="/#sobre">Sobre</Link></li> {/* Exemplo de link para seção */}
          <li><Link href="/#projetos">Projetos</Link></li>
          <li><Link href="/#habilidades">Habilidades</Link></li>
          <li><Link href="/#contato">Contato</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;