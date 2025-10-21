// src/components/Footer.tsx
import React from 'react';
import './Footer.css'; // Vamos criar este CSS

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="main-footer">
      <p>&copy; {currentYear} Victor Cunha. Todos os direitos reservados.</p>
      {/* Adicionar links sociais aqui, se desejar */}
    </footer>
  );
};

export default Footer;