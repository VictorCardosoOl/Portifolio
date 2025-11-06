// src/components/Footer.tsx
import React from 'react';
import './Footer.css'; // O seu novo CSS que vamos corrigir

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="footer" 
      id="footer"
      data-scroll-section // <-- CORREÇÃO 1: Isto corrige a "faixa branca"
    >
      <div className="footer-container">
        
        {/* ===== SEÇÃO SUPERIOR ===== */}
        <div className="footer-top">
          <div className="footer-brand">
            {/* A classe "footer-logo" agora está no <a> */}
            <a href="#inicio" className="footer-logo">Portfolio</a>
          </div>
          
          <div className="footer-offices">
            <div className="office-group">
              <div className="office">
                <h4 className="office-title">ESTÚDIO</h4>
                <p className="office-address">
                  Quereo Park Villa, 30 West Drive<br />
                  Brighton, BV2 QQJ
                </p>
                <p className="office-label">Estúdio Brighton</p>
              </div>
              
              <div className="office">
                <h4 className="office-title">ESCRITÓRIO DE LONDRES</h4>
                <p className="office-address">
                  14 Florham Gardens, Lower Richmond Road<br />
                  Richmond, TW9 4LJ
                </p>
                <p className="office-label">Escritório de Londres</p>
              </div>
            </div>
          </div>
        </div>

        {/* ===== SEÇÃO MÉDIA ===== */}
        <div className="footer-middle">
          {/* Coluna Contato */}
          <div>
            <h4 className="column-title">CONTATO</h4>
            <div className="contact-info">
              <a href="mailto:victorcardcunha@gmail.com" className="contact-email">
                victorcardcunha@gmail.com
              </a>
              <a href="tel:+5511977440146" className="contact-phone">
                +55 (11) 97744-0146
              </a>
            </div>
            <button className="cta-button">
              Iniciar um projeto
            </button>
          </div>

          {/* Coluna Social */}
          <div>
            <h4 className="column-title">CONECTAR</h4>
            <div className="social-links">
              <a href="https://www.linkedin.com/in/victor-card-cunha/" className="social-link">LinkedIn</a>
              <a href="https://www.instagram.com/hi.chicocdo/" className="social-link">Instagram</a>
              <a href="https://github.com/VictorCardosoOl" className="social-link">GitHub</a>
              <a href="https://wa.me/5511977440146" className="social-link">WhatsApp</a>
            </div>
          </div>

          {/* Coluna Formulário */}
          <div className="contact-column">
            <h4 className="column-title">ENTRE EM CONTATO</h4>
            <form className="contact-form">
              <div className="form-row">
                <input type="text" placeholder="Seu nome*" className="form-input" />
                <input type="email" placeholder="Seu e-mail*" className="form-input" />
              </div>
              <div className="form-row">
                <input type="tel" placeholder="Número de telefone" className="form-input" />
                <input type="text" placeholder="Nome da empresa" className="form-input" />
              </div>
              <textarea placeholder="Mensagem*" className="form-textarea"></textarea>
              <button type="submit" className="submit-button">Enviar mensagem</button>
            </form>
          </div>
        </div>

        {/* ===== SEÇÃO INFERIOR ===== */}
        <div className="footer-bottom">
          <div className="footer-links">
            <a href="#politica" className="footer-link">Política de Privacidade</a>
            <span className="link-separator">/</span>
            <a href="#cookies" className="footer-link">Cookies</a>
            <span className="link-separator">/</span>
            <a href="#trabalhar" className="footer-link">Trabalhar</a>
          </div>
          
          <div className="copyright-section">
            <p className="company-info">
              Victor Cunha Limited © {currentYear}
            </p>
            <a href="#inicio" className="back-to-top">Voltar ao Topo ↑</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;