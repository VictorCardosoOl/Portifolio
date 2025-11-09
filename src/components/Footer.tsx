// src/components/Footer.tsx
import React, { useState, useContext, useRef } from 'react'; // 1. Importar useContext e useRef
import './Footer.css';
// 2. Importar o Contexto de Scroll e o Hook de Animação
import { LocomotiveScrollContext } from '@/contexts/LocomotiveScrollContext';
import { useFadeInUp } from '@/hooks/useFadeInUp';

// ... (Interface FormData e FormErrors - mantidas)
interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // --- MELHORIA: FUNCIONALIDADE SCROLL ---
  // 3. "Consumir" o contexto para obter a instância do scroll
  const { scroll } = useContext(LocomotiveScrollContext);

  // --- MELHORIA: ANIMAÇÃO ---
  // 4. Criar refs para os elementos
  const topRef = useRef(null);
  const contactColRef = useRef(null);
  const socialColRef = useRef(null);
  const formColRef = useRef(null);
  const bottomRef = useRef(null);

  // 5. Aplicar a animação
  useFadeInUp(topRef, 0.1);
  useFadeInUp(contactColRef, 0.2);
  useFadeInUp(socialColRef, 0.3);
  useFadeInUp(formColRef, 0.4);
  useFadeInUp(bottomRef, 0.2);

  
  // --- SEU CÓDIGO DE FORMULÁRIO (CORRIGIDO) ---
  // (Funções definidas APENAS UMA VEZ)

  // Validação do formulário
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório';
    if (!formData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'E-mail inválido';
    }
    if (!formData.message.trim()) newErrors.message = 'Mensagem é obrigatória';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manipulação de mudanças nos inputs
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  // Envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Dados do formulário:', formData);
      if (typeof window.gtag !== 'undefined') { // Usar window.gtag
        window.gtag('event', 'form_submit', {
          event_category: 'contact',
          event_label: 'footer_form'
        });
      }
      setIsSubmitted(true);
      setTimeout(() => {
        setFormData({
          name: '', email: '', phone: '', company: '', message: ''
        });
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 6. Scroll suave para o topo (AGORA FUNCIONAL)
  const scrollToTop = () => {
    if (scroll) {
      scroll.scrollTo('#inicio', {
        duration: 1200, 
        easing: [0.25, 0.0, 0.35, 1.0],
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Tracking de cliques em redes sociais
  const handleSocialClick = (platform: string) => {
    if (typeof window.gtag !== 'undefined') { // Usar window.gtag
      window.gtag('event', 'social_click', {
        event_category: 'social',
        event_label: platform
      });
    }
  };


  return (
    <footer 
      className="footer" 
      id="footer"
      role="contentinfo"
      aria-label="Rodapé do site"
      data-scroll-section // (Mantido - corrige a "faixa branca")
    >
      <div className="footer-container">
        
        {/* Seção Superior - Layout horizontal */}
        <div className="footer-top" ref={topRef}> {/* 7. Adicionar ref */}
          <div className="footer-brand">
            <a 
              href="#inicio" 
              className="footer-logo"
              aria-label="Voltar ao início"
              onClick={scrollToTop} // 8. Usar o onClick para o scroll suave
            >
              Portfolio
            </a>
          </div>
          
          <div className="footer-locations">
            <div className="location">
              <h4 className="location-label">O ESTÚDIO</h4>
              <p className="location-address">
                Vila Formosa, São Paulo<br />
                Brasil
              </p>
              <p className="location-name">Estúdio Formosa</p>
            </div>
            <div className="location">
              <h4 className="location-label">ESCRITÓRIO</h4>
              <p className="location-address">
                Tatuapé, São Paulo<br />
                Brasil
              </p>
              <p className="location-name">Escritório do Tatuapé</p>
            </div>
          </div>
        </div>

        {/* Seção Média - 3 colunas */}
        <div className="footer-middle">
          {/* Coluna Contato */}
          <div className="footer-column" ref={contactColRef}> {/* 7. Adicionar ref */}
            <h4 className="column-title">CONTATO</h4>
            <div className="contact-info">
              <a 
                href="mailto:victorcardcunha@gmail.com" 
                className="contact-link"
                aria-label="Enviar e-mail para victorcardcunha@gmail.com"
              >
                victorcardcunha@gmail.com
              </a>
              <a 
                href="tel:+5511977440146" 
                className="contact-link"
                aria-label="Ligar para +55 (11) 97744-0146"
              >
                +55 (11) 97744-0146
              </a>
            </div>
            <button 
              className="project-btn"
              onClick={() => {
                // 8. Usar o scroll suave aqui também
                if (scroll) {
                  scroll.scrollTo('#contato'); // ID da sua seção de contato
                } else {
                  document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              aria-label="Iniciar um novo projeto"
            >
              Iniciar um projeto
            </button>
          </div>

          {/* Coluna Social */}
          <div className="footer-column" ref={socialColRef}> {/* 7. Adicionar ref */}
            <h4 className="column-title">CONECTAR</h4>
            <nav className="social-grid" aria-label="Redes sociais">
              <a href="https://www.linkedin.com/in/victor-card-cunha/" className="social-link" onClick={() => handleSocialClick('linkedin')} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (abre em nova aba)">LinkedIn</a>
              <a href="https://www.instagram.com/hi.chicocdo/" className="social-link" onClick={() => handleSocialClick('instagram')} target="_blank" rel="noopener noreferrer" aria-label="Instagram (abre em nova aba)">Instagram</a>
              <a href="https://dribbble.com/" className="social-link" onClick={() => handleSocialClick('dribbble')} target="_blank" rel="noopener noreferrer" aria-label="Dribbble (abre em nova aba)">Dribbble</a>
              <a href="https://behance.net/" className="social-link" onClick={() => handleSocialClick('behance')} target="_blank" rel="noopener noreferrer" aria-label="Behance (abre em nova aba)">Behance</a>
              <a href="https://pinterest.com/" className="social-link" onClick={() => handleSocialClick('pinterest')} target="_blank" rel="noopener noreferrer" aria-label="Pinterest (abre em nova aba)">Pinterest</a>
              <a href="https://facebook.com/" className="social-link" onClick={() => handleSocialClick('facebook')} target="_blank" rel="noopener noreferrer" aria-label="Facebook (abre em nova aba)">Facebook</a>
            </nav>
          </div>

          {/* Coluna Formulário */}
          <div className="footer-column" ref={formColRef}> {/* 7. Adicionar ref */}
            <h4 className="column-title">ENTRE EM CONTATO</h4>
            <form 
              className={`contact-form ${isSubmitted ? 'form-submitted' : ''}`}
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="form-grid">
                <div className="form-group">
                  <input type="text" name="name" placeholder="Seu nome*" className="form-input" value={formData.name} onChange={handleInputChange} required aria-invalid={!!errors.name} aria-describedby="name-error" />
                  {errors.name && (<span id="name-error" className="form-error" role="alert">{errors.name}</span>)}
                </div>
                
                <div className="form-group">
                  <input type="email" name="email" placeholder="Seu e-mail*" className="form-input" value={formData.email} onChange={handleInputChange} required aria-invalid={!!errors.email} aria-describedby="email-error" />
                  {errors.email && (<span id="email-error" className="form-error" role="alert">{errors.email}</span>)}
                </div>
                
                <div className="form-group">
                  <input type="tel" name="phone" placeholder="Número de telefone" className="form-input" value={formData.phone} onChange={handleInputChange} />
                </div>
                
                <div className="form-group">
                  <input type="text" name="company" placeholder="Nome da empresa" className="form-input" value={formData.company} onChange={handleInputChange} />
                </div>
              </div>
              
              <div className="form-group">
                <textarea name="message" placeholder="Mensagem*" className="form-textarea" rows={3} value={formData.message} onChange={handleInputChange} required aria-invalid={!!errors.message} aria-describedby="message-error"></textarea>
                {errors.message && (<span id="message-error" className="form-error" role="alert">{errors.message}</span>)}
              </div>
              
              <button 
                type="submit" 
                className={`submit-btn ${isSubmitting ? 'loading' : ''}`}
                disabled={isSubmitting || isSubmitted}
                aria-live="polite"
              >
                {isSubmitting ? (
                  <>
                    <span aria-hidden="true">Enviando...</span>
                    <div className="loading-spinner" aria-hidden="true"></div>
                  </>
                ) : isSubmitted ? (
                  'Mensagem Enviada!'
                ) : (
                  'Enviar mensagem'
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Seção Inferior */}
        <div className="footer-bottom" ref={bottomRef}> {/* 7. Adicionar ref */}
          <nav 
            className="footer-nav" 
            aria-label="Navegação secundária"
          >
            <a href="#politica" className="nav-link">POLÍTICA DE PRIVACIDADE</a>
            <span className="nav-separator" aria-hidden="true">/</span>
            <a href="#cookies" className="nav-link">COOKIES</a>
            <span className="nav-separator" aria-hidden="true">/</span>
            <a href="#trabalhar" className="nav-link">TRABALHAR</a>
            <a href="#servicos" className="nav-link">SERVIÇOS</a>
            <a href="#estudio" className="nav-link">ESTÚDIO</a>
            <a href="#musa" className="nav-link">MUSA</a>
            <a href="#contato" className="nav-link">CONTATO</a>
          </nav>
          
          <div className="footer-copyright">
            <p className="brand-tagline">Brand Artistry.</p>
            <p className="company-info">
              Victor Cunha Limited número de registro 12345678<br />
              © 2015 - {currentYear} Victor Cunha.
            </p>
            <button 
              onClick={scrollToTop} // 8. Usar o onClick para o scroll suave
              className="back-to-top"
              aria-label="Voltar ao topo da página"
            >
              Voltar ao Topo ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;