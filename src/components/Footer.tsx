// src/components/Footer.tsx
import React from 'react';
// Importa os ícones específicos que você quer usar
import { FaGithub, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="main-footer footer" id="footer">
      <div className="footer-content">
        <div className="menu-container">
          <a href="#" className="portfolio-link">Portfolio</a>
        </div>
        <div className="contact-info">
          <p className="name">Victor Cardoso</p>
          <p className="location">São Paulo - SP</p>
          <a className="email" href="mailto:victorcardcunha@gmail.com">seuemail@email.com</a>
          <br />
          <a className="phone" href="tel:+5511977440146">(11) 97744-0146</a>
          <div className="social-links">
            {/* Substitui <i> por componentes React Icon */}
            <a target="_blank" rel="noopener noreferrer" href="https://github.com/VictorCardosoOl" aria-label="GitHub">
              <FaGithub /> {/* Ícone do GitHub */}
            </a>
            <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/hi.chicocdo/" aria-label="Instagram">
              <FaInstagram /> {/* Ícone do Instagram */}
            </a>
            <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/victor-card-cunha/" aria-label="LinkedIn">
              <FaLinkedin /> {/* Ícone do LinkedIn */}
            </a>
            <a target="_blank" rel="noopener noreferrer" href="https://wa.me/5511977440146" aria-label="WhatsApp">
              <FaWhatsapp /> {/* Ícone do WhatsApp */}
            </a>
          </div>
        </div>
      </div>
      <div className="copyright">
          <p>&copy; {currentYear} Victor Cunha. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;