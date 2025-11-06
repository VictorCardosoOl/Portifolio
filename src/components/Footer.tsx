// src/components/Footer.tsx
import React from 'react';
import './Footer.css'; // O seu novo CSS (com a correção abaixo)

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="footer" 
      id="footer"
      data-scroll-section // <-- CORREÇÃO 1: Corrige a "faixa branca"
    >
      <div className="footer-container">
        
        {/* Seção Superior - Layout horizontal */}
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#inicio" className="footer-logo">Portfolio</a>
          </div>
          
          <div className="footer-locations">
            <div className="location">
              <h4 className="location-label">O ESTÚDIO</h4>
              <p className="location-address">
                Quereo Park Villa, 30 West Drive<br />
                Brighton, BV2 QQJ
              </p>
              <p className="location-name">Estúdio Brighton</p>
            </div>
            
            <div className="location">
              <h4 className="location-label">ESCRITÓRIO DE LONDRES</h4>
              <p className="location-address">
                14 Florham Gardens, Lower Richmond Road<br />
                Richmond, TW9 4LJ
              </p>
              <p className="location-name">Escritório de Londres</p>
            </div>
          </div>
        </div>

        {/* Seção Média - 3 colunas */}
        <div className="footer-middle">
          {/* Coluna Contato */}
          <div className="footer-column">
            <h4 className="column-title">CONTATO</h4>
            <div className="contact-info">
              <a href="mailto:victorcardcunha@gmail.com" className="contact-link">
                victorcardcunha@gmail.com
              </a>
              <a href="tel:+5511977440146" className="contact-link">
                +55 (11) 97744-0146
              </a>
            </div>
            <button className="project-btn">
              Iniciar um projeto
            </button>
          </div>

          {/* Coluna Social */}
          <div className="footer-column">
            <h4 className="column-title">CONECTAR</h4>
            <div className="social-grid">
              <a href="https://www.linkedin.com/in/victor-card-cunha/" className="social-link">LinkedIn</a>
              <a href="https://www.instagram.com/hi.chicocdo/" className="social-link">Instagram</a>
              <a href="https://dribbble.com/" className="social-link">Dribbble</a>
              <a href="https://behance.net/" className="social-link">Behance</a>
              <a href="https://pinterest.com/" className="social-link">Pinterest</a>
              <a href="https://facebook.com/" className="social-link">Facebook</a>
            </div>
          </div>

          {/* Coluna Formulário */}
          <div className="footer-column">
            <h4 className="column-title">ENTRE EM CONTATO</h4>
            <form className="contact-form">
              <div className="form-grid">
                <input type="text" placeholder="Seu nome*" className="form-input" />
                <input type="email" placeholder="Seu e-mail*" className="form-input" />
                <input type="tel" placeholder="Número de telefone" className="form-input" />
                <input type="text" placeholder="nome da empresa" className="form-input" />
              </div>
              <textarea placeholder="Mensagem*" className="form-textarea" rows={3}></textarea>
              <button type="submit" className="submit-btn">Enviar mensagem</button>
            </form>
          </div>
        </div>

        {/* Seção Inferior */}
        <div className="footer-bottom">
          <div className="footer-nav">
            <a href="#politica" className="nav-link">POLÍTICA DE PRIVACIDADE</a>
            <span className="nav-separator">/</span>
            <a href="#cookies" className="nav-link">COOKIES</a>
            <span className="nav-separator">/</span>
            <a href="#trabalhar" className="nav-link">TRABALHAR</a>
            <a href="#servicos" className="nav-link">SERVIÇOS</a>
            <a href="#estudio" className="nav-link">ESTÚDIO</a>
            <a href="#musa" className="nav-link">MUSA</a>
            <a href="#contato" className="nav-link">CONTATO</a>
          </div>
          
          <div className="footer-copyright">
            <p className="brand-tagline">Brand Artistry.</p>
            <p className="company-info">
              Victor Cunha Limited número de registro 12345678<br />
              © 2015 - {currentYear} Victor Cunha.
            </p>
            <a href="#inicio" className="back-to-top">
              Voltar ao Topo ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;