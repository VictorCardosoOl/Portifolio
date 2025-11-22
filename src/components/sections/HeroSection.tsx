// src/components/sections/HeroSection.tsx
"use client";

import React from 'react';
import Image from 'next/image';
import styles from './HeroSection.module.css';

const profileData = {
    title: "PORTFOLIO",
    contactItems: [
        "BE: /hannnb",
        "IG: @han.nnb",
        "LI: /han-nnb"
    ],
    imageText: "i love design and anything related to art. i approach problems in a rational and pragmatic way and seek the simplest and most functional solutions possible."
}

const HeroSection: React.FC = () => {
  return (
    <section 
        className={styles.heroContainer} 
        id="hero-section" 
        data-scroll-section
    >
        <div className={styles.heroContent}>
            
            {/* === COLUNA 1: IMAGEM + OVERLAY + TEXTO CURTO === */}
            <div className={styles.columnLeft}>
                
                {/* Elementos decorativos (Acima da Imagem) */}
                {/* Posicionaremos estes com mais precisão via CSS */}
                <div className={styles.decorativeElements}>
                    <div className={styles.decorativeShape}></div>
                    <div className={styles.decorativeShape}></div>
                </div>

                {/* Container da Imagem com Proporção Vertical Alongada */}
                <div className={styles.imageWrapper}>
                    <Image
                        src="/img/Phone Link/profile.jpg" // CAMINHO DA SUA IMAGEM
                        alt="Foto de perfil"
                        layout="fill"
                        objectFit="cover"
                        className={styles.mainImage}
                    />

                    {/* Bloco de texto sobreposto (Fundo preto) */}
                    <div className={styles.imageTextBlock}>
                        <p className={styles.imageText}>
                            {profileData.imageText}
                        </p>
                    </div>
                </div>
            </div>

            {/* === COLUNA 2: TÍTULO ENORME + TEXTO ARTÍSTICO + CONTATO === */}
            <div className={styles.columnRight}>
                
                {/* Título Principal Serifado e com Peso Visual */}
                <h1 className={styles.mainTitle}>
                    {profileData.title}
                </h1>

                {/* Camada de texto artístico repetido (Outline) */}
                {/* Ajustamos o conteúdo para ficar mais parecido com a referência */}
                <div className={styles.artisticTextLayer}>
                    <p className={styles.artisticText}>TFC</p>
                    <p className={styles.artisticText}>FOLIO</p>
                    <p className={styles.artisticText}>TFC</p>
                    <p className={styles.artisticText}>PORTFOLIO</p>
                </div>

                {/* Bloco de informações de contato (Alinhado à direita/Fim da coluna) */}
                <div className={styles.contactBlock}>
                    {profileData.contactItems.map((item, index) => (
                        <p key={index} className={styles.contactItem}>{item}</p>
                    ))}
                </div>
            </div>
        </div>

        {/* Faixa inferior menor (Rodapé visual) - Agora no fluxo normal */}
        <div className={styles.heroFooterStrip}>
            <div className={styles.footerStripContent}>
                <p className={styles.footerStripText}>
                    i love design and anything related to art. i approach problems in a rational and pragmatic way and seek the simplest and most functional solutions possible.
                </p>
                {/* Outro elemento decorativo no canto inferior direito da faixa */}
                <div className={styles.decorativeShapeBottomRight}></div>
            </div>
        </div>
    </section>
  );
};

export default HeroSection;