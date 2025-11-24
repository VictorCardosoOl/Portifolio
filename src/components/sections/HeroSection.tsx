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
                <span className={styles.textLightGrey}>I am</span>{' '}
                <span className={styles.textDarkBold}>Julia</span>{' '}
                <span className={styles.textLightGrey}>Nascimento, a</span>
                <br />
                <span className={styles.textLightGrey}>brazilian</span>{' '}
                <span className={styles.textDarkBold}>UX Designer</span>{' '}
                <span className={styles.textLightGrey}>at</span>
                <br />
                <span className={styles.textGreenBold}>Millennium</span>{' '}
                <span className={styles.textFadedGrey}>bcp Bank |</span>
                <br />
                <span className={styles.textFadedGrey}>Spark 2D Digital Experience</span>
                <br />
                <span className={styles.textGreenBold}>in Portugal.</span>
            </h1>
        </div>

    </section>
  );
};

export default HeroSection;