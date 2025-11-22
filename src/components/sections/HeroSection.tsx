// src/components/sections/HeroSection.tsx
import React from 'react';
import Image from 'next/image'; // Usando Next/Image para melhor performance
import styles from './HeroSection.module.css';

// Usamos uma imagem placeholder do seu repositório.
const PROFILE_IMAGE_SRC = '/img/Phone Link/profile.jpg';

const HeroSection: React.FC = () => {
  return (
    // O Hero ocupa toda a largura e tem um padding vertical generoso.
    <section className={styles.heroContainer}>

      {/* Hero Principal: Layout de Duas Colunas */}
      <div className={styles.heroMain}>
        
        {/* Coluna 1: Conteúdo da Imagem (Esquerda) */}
        <div className={styles.columnLeft}>
          
          {/* Elementos decorativos no topo */}
          <div className={styles.decorativeElements}>
            <div className={styles.decorativeShape}></div>
            <div className={styles.decorativeShape}></div>
          </div>

          {/* Container da Imagem com o overlay (usaremos ::before para o overlay) */}
          <div className={styles.imageWrapper}>
            
            {/* Imagem Principal (Proporção vertical alongada) */}
            <Image
              src={PROFILE_IMAGE_SRC}
              alt="Foto de perfil profissional"
              layout="fill" // Permite que a imagem preencha o container
              objectFit="cover"
              className={styles.mainImage}
            />

            {/* Bloco de texto sobreposto (Canto Inferior Esquerdo) */}
            <div className={styles.imageTextBlock}>
              <p className={styles.imageText}>
                Desenvolvedor Full Stack | TypeScript e Next.js
              </p>
            </div>
          </div>
        </div>

        {/* Coluna 2: Título e Informações (Direita) */}
        <div className={styles.columnRight}>
          
          {/* Camada de texto artístico repetido (Outline) - Z-index baixo */}
          <div className={styles.artisticTextLayer}>
            <p className={styles.artisticText}>FOLIO</p>
            <p className={styles.artisticText}>TFC</p>
            <p className={styles.artisticText}>PORTFOLIO</p>
          </div>

          {/* Título Principal - Z-index alto para sobrepor o texto artístico */}
          <h1 className={styles.mainTitle}>
            PORT<span className={styles.titleBreak} />FOLIO
          </h1>

          {/* Bloco de informações de contato (Alinhado à direita) */}
          <div className={styles.contactBlock}>
            <p className={styles.contactItem}>BE: /seu-usuario</p>
            <p className={styles.contactItem}>IG: @seu-usuario</p>
            <p className={styles.contactItem}>LI: /seu-usuario</p>
          </div>
        </div>
      </div>

      {/* Faixa Inferior Menor (Rodapé Visual) */}
      <div className={styles.heroFooterStrip}>
        <p>© 2025 Victor Cardoso. Todos os direitos reservados.</p>
      </div>
    </section>
  );
};

export default HeroSection;