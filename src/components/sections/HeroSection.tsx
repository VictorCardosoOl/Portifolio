// src/components/sections/HeroSection.tsx
"use client"; // 1. OBRIGATÓRIO: Esta diretiva é necessária porque usamos hooks (useRef, useFadeInUp, etc.)

import React, { useRef } from 'react';
import Link from 'next/link';
// 2. IMPORTANTE: Importamos os estilos do 'page.module.css' original
import styles from '@/app/page.module.css'; 

// 3. Importamos os hooks de animação que esta seção utiliza
import { useFadeInUp } from '@/hooks/useFadeInUp';
import { useMagneticButton } from '@/hooks/useMagneticButton';

// 4. Definimos os 'Props' que este componente espera receber
// Isto ajuda a garantir que a 'page.tsx' está a enviar os dados corretos
interface HeroData {
  name: string;
  title: string;
  tagline: string;
}

interface HeroSectionProps {
  data: HeroData;
}

// 5. O componente 'HeroSection' recebe 'data' como prop
const HeroSection: React.FC<HeroSectionProps> = ({ data }) => {
  
  // 6. GERIR REFS: As refs agora vivem DENTRO do componente que as usa
  // 'useRef(null)' cria um "contentor" que pode guardar uma referência a um elemento do DOM
  const heroTitleRef = useRef(null);
  const heroSubtitleRef = useRef(null);
  const heroTaglineRef = useRef(null);
  const heroActionsRef = useRef(null);
  const magneticBtn1Ref = useRef(null);
  const magneticBtn2Ref = useRef(null);

  // 7. APLICAR ANIMAÇÕES: A lógica de animação está encapsulada aqui
  // 'useFadeInUp' é o seu hook customizado.
  // Ele recebe a 'ref' do elemento e um 'delay' (atraso) em segundos.
  useFadeInUp(heroTitleRef, 0.1);
  useFadeInUp(heroSubtitleRef, 0.3);
  useFadeInUp(heroTaglineRef, 0.5);
  useFadeInUp(heroActionsRef, 0.7);

  // 'useMagneticButton' aplica o efeito magnético ao botão
  useMagneticButton(magneticBtn1Ref, 0.4);
  useMagneticButton(magneticBtn2Ref, 0.4);

  return (
    // 8. DATA-SCROLL-SECTION: Atributo essencial para o Locomotive Scroll
    // identificar isto como uma seção rolável.
    <section id="inicio" className={styles.heroSection} data-scroll-section>
      <div className={styles.container}>
        {/* 9. LIGAR REFS: A 'ref' criada no passo 6 é "ligada" ao elemento JSX */}
        {/* Os dados agora vêm do objeto 'data' recebido via props */}
        <h1 ref={heroTitleRef} className={styles.heroTitle}>{data.name}</h1>
        <p ref={heroSubtitleRef} className={styles.heroSubtitle}>{data.title}</p>
        <p ref={heroTaglineRef} className={styles.heroTagline}>{data.tagline}</p>
        
        <div ref={heroActionsRef} className={styles.heroActions}>
           <Link 
              ref={magneticBtn1Ref} // Ref para o botão magnético
              href="/#projetos" 
              className={`${styles.btn} ${styles.btnPrimary}`}
           >
              Meus Projetos
           </Link>
           <Link 
              ref={magneticBtn2Ref} // Ref para o botão magnético
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