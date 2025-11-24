// src/components/sections/HeroSection.tsx
"use client";

import React from 'react';
import Image from 'next/image';
import styles from './HeroSection.module.css';

const HeroSection: React.FC = () => {
  return (
    // DOCUMENTAÇÃO: Classe principal corrigida para styles.hero
    <section 
        className={styles.hero} 
        id="hero-section" 
        data-scroll-section
    >
        {/* DOCUMENTAÇÃO: Os filhos agora são diretos do grid definido em styles.hero. */}
        
        {/* Nota do Hero */}
        <div className={styles.heroNote}>this is not a portfólio</div>

        {/* Imagem do Hero */}
        <div className={styles.heroImage}>
            <Image
                src="/img/Phone Link/profile.jpg"
                alt="Retrato de Júlia Nascimento"
                width={400}
                height={500}
                // DOCUMENTAÇÃO: Não é necessário 'className' aqui, pois o estilo é aplicado pelo seletor aninhado no CSS.
            />
        </div>

        {/* Texto do Hero */}
        <div className={styles.heroText}>
            <h1>
                {/* Classes de cores em camelCase */}
                <span className={styles.textLightGrey}>Prazer sou o</span>{' '}
                <span className={styles.textDarkBold}>Victor</span>{' '}
                <span className={styles.textLightGrey}>Cardoso,</span>
                <br />
                <span className={styles.textDarkBold}>Software Developer</span>{' '}
                <span className={styles.textLightGrey}>&</span>{' '}
                <span className={styles.textLightGrey}>estudante de</span>
                <span className={styles.textLightGrey}> Engenharia da Computação,</span>{' '}
        
                <span className={styles.textGreenBold}>criando soluções</span>{' '}
                <span className={styles.textGreenBold}>para você!</span>{' '}
                
                
                <br />
                
            </h1>
        </div>

    </section>
  );
};

export default HeroSection;