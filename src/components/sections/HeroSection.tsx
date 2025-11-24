// src/components/sections/HeroSection.tsx
"use client";

import React from 'react';
import Image from 'next/image';
import styles from './HeroSection.module.css';

const HeroSection: React.FC = () => {
  return (
    <section 
        className={styles.heroContainer} 
        id="hero-section" 
        data-scroll-section
    >
        <div className={styles.heroContent}>
            
            {/* Nota do Hero */}
            <div className={styles.heroNote}>this is not a portfólio</div>

            {/* Imagem do Hero */}
            <div className={styles.heroImage}>
                <Image
                    src="/assets/profile.jpg"
                    alt="Retrato de Júlia Nascimento"
                    width={400}
                    height={500}
                    className={styles.profileImage}
                />
            </div>

            {/* Texto do Hero */}
            <div className={styles.heroText}>
                <h1>
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
        </div>

    </section>
  );
};

export default HeroSection;