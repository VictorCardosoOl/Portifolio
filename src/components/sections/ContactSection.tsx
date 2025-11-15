// src/components/sections/ContactSection.tsx
"use client"; 

import React, { useRef } from 'react';
import { FaEnvelope } from 'react-icons/fa';
import styles from '@/app/page.module.css';
import { useFadeInUp } from '@/hooks/useFadeInUp';
// import { useMagneticButton } from '@/hooks/useMagneticButton'; // REMOVIDO

// Props que a seção espera
interface ContactData {
  contactEmail: string;
}

interface ContactSectionProps {
  data: ContactData;
}

const ContactSection: React.FC<ContactSectionProps> = ({ data }) => {
  // Refs para animação
  const contactTitleRef = useRef(null);
  const contactTextRef = useRef(null);
  const contactButtonRef = useRef(null); // Ref mantida para o useFadeInUp

  // Aplica animações de 'fade in'
  useFadeInUp(contactTitleRef, 0.1);
  useFadeInUp(contactTextRef, 0.3);
  useFadeInUp(contactButtonRef, 0.5); // Animação do botão mantida

  // Aplica efeito magnético ao botão
  // useMagneticButton(contactButtonRef, 0.4); // REMOVIDO

  return (
    <section id="contato" className={styles.contactSection} data-scroll-section>
      <div className={styles.container}>
        <h2 ref={contactTitleRef} className={styles.sectionTitle}>Entre em Contato</h2>
        <p ref={contactTextRef} className={styles.contactText}>
          Gostou do que viu? Vamos conversar sobre como posso ajudar no seu próximo projeto!
        </p>
        <a
          ref={contactButtonRef} // Ref mantida para o fade-in
          href={`mailto:${data.contactEmail}`}
          className={`${styles.btn} ${styles.btnPrimary} ${styles.contactButton}`}
        >
          <FaEnvelope aria-hidden="true" /> Enviar Email
        </a>
      </div>
    </section>
  );
};

export default ContactSection;