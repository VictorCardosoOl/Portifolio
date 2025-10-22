// src/components/Footer.tsx
import React from 'react';
import './Footer.css'; // Certifique-se de que este arquivo CSS existe e está correto

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    // Corrigido: Usa apenas className e combina as classes. Adiciona id.
    <footer className="main-footer footer" id="footer">
      {/* Corrigido: className */}
      <div className="footer-content">
        <div className="menu-container">
          {/* Corrigido: className */}
          <a href="#" className="portfolio-link">Portfolio</a>
        </div>
        <div className="contact-info">
          {/* Corrigido: className */}
          <p className="name">Victor Cardoso</p>
          {/* Corrigido: className */}
          <p className="location">São Paulo - SP</p>
          {/* Corrigido: className */}
          <a className="email" href="mailto:victorcardcunha@gmail.com">victorcardcunha@gmail.com</a>
          {/* Corrigido: <br /> auto-fechada */}
          <br />
          {/* Corrigido: className */}
          <a className="phone" href="tel:+5511977440146">(11) 97744-0146</a> {/* Adicionado +55 para código do Brasil */}
          {/* Corrigido: className */}
          <div className="social-links">
            {/* Corrigido: className e <i> auto-fechada. Adicionado rel="noopener noreferrer" por segurança */}
            <a target="_blank" rel="noopener noreferrer" href="https://github.com/VictorCardosoOl" aria-label="GitHub">
              <i className="fab fa-github" />
            </a>
            {/* Corrigido: className e <i> auto-fechada. Adicionado rel="noopener noreferrer" */}
            <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/hi.chicocdo/" aria-label="Instagram">
              <i className="fab fa-instagram" />
            </a>
            {/* Corrigido: className e <i> auto-fechada. Adicionado rel="noopener noreferrer" */}
            <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/victor-card-cunha/" aria-label="LinkedIn">
              <i className="fab fa-linkedin" />
            </a>
            {/* Corrigido: className e <i> auto-fechada. Adicionado rel="noopener noreferrer" */}
            <a target="_blank" rel="noopener noreferrer" href="https://wa.me/5511977440146" aria-label="WhatsApp">
              <i className="fab fa-whatsapp" />
            </a>
          </div>
        </div>
      </div>
      {/* Corrigido: className */}
      <div className="copyright">
          <p>&copy; {currentYear} Todos os direitos reservados.</p>
          <p>Design por Victor Cardoso</p>
      </div>
    </footer>
  );
};

export default Footer;