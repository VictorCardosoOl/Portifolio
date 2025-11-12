// src/components/sections/AboutSection.tsx
"use client"; // Necessário para os hooks 'useRef' e 'useFadeInUp'

import React, { useRef } from 'react';
import styles from '@/app/page.module.css'; // Importa os estilos da página principal
import { useFadeInUp } from '@/hooks/useFadeInUp';

// Define os 'Props' (dados) que esta seção espera
interface AboutData {
  aboutMe: string[];
}

interface AboutSectionProps {
  data: AboutData;
}

const AboutSection: React.FC<AboutSectionProps> = ({ data }) => {
  // Refs para os elementos a animar nesta seção
  const aboutTitleRef = useRef(null);
  const aboutContentRef = useRef(null);

  // Aplica as animações de 'fade in'
  useFadeInUp(aboutTitleRef, 0.1);
  useFadeInUp(aboutContentRef, 0.3);

  return (
    <section id="sobre" className={styles.aboutSection} data-scroll-section>
      <div className={`${styles.container} ${styles.aboutContainer}`}>
        {/* Liga as 'refs' aos elementos JSX */}
        <h2 ref={aboutTitleRef} className={styles.sectionTitle}>Sobre Mim</h2>
        <div ref={aboutContentRef} className={styles.aboutContent}>
          {/* Faz o 'map' dos dados recebidos via props */}
          {data.aboutMe.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;