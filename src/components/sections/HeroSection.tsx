// src/components/sections/HeroSection.tsx
"use client"; 

import React, { useRef } from 'react';
import Link from 'next/link';
import styles from '@/app/page.module.css'; 

// Importamos APENAS os hooks que ainda usamos
import { useFadeInUp } from '@/hooks/useFadeInUp';
// A importação do 'useMagneticButton' FOI REMOVIDA

// (Interface HeroData mantida)
interface HeroData {
  name: string;
  title: string;
  tagline: string;
}

interface HeroSectionProps {
  data: HeroData;
}

const HeroSection: React.FC<HeroSectionProps> = ({ data }) => {
  
  // Refs para animações de 'fade in' (mantidas)
  const heroTitleRef = useRef(null);
  const heroSubtitleRef = useRef(null);
  const heroTaglineRef = useRef(null);
  const heroActionsRef = useRef(null);
  
  // Refs para os botões magnéticos (REMOVIDAS)
  // const magneticBtn1Ref = useRef(null);
  // const magneticBtn2Ref = useRef(null);

  // Animações 'useFadeInUp' (mantidas)
  useFadeInUp(heroTitleRef, 0.1);
  useFadeInUp(heroSubtitleRef, 0.3);
  useFadeInUp(heroTaglineRef, 0.5);
  useFadeInUp(heroActionsRef, 0.7);

  // Chamadas ao 'useMagneticButton' (REMOVIDAS)
  // useMagneticButton(magneticBtn1Ref, 0.4);
  // useMagneticButton(magneticBtn2Ref, 0.4);

  return (
    <section id="inicio" className={styles.heroSection} data-scroll-section>
      <div className={styles.container}>
        <h1 ref={heroTitleRef} className={styles.heroTitle}>{data.name}</h1>
        <p ref={heroSubtitleRef} className={styles.heroSubtitle}>{data.title}</p>
        <p ref={heroTaglineRef} className={styles.heroTagline}>{data.tagline}</p>
        
        <div ref={heroActionsRef} className={styles.heroActions}>
           <Link 
              // A prop 'ref' FOI REMOVIDA daqui
              href="/#projetos" 
              className={`${styles.btn} ${styles.btnPrimary}`}
           >
              Meus Projetos
           </Link>
           <Link 
              // A prop 'ref' FOI REMOVIDA daqui
              href="/#contato" 
              className={`${styles.btn} ${styles.btnSecondary}`}
           >
              Entre em Contato
           </Link>
        </div>
      </div>
       <div className={styles.scrollIndicator}>
          {/* (Restante do seu SVG) */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
       </div>
    </section>
  );
};

export default HeroSection;