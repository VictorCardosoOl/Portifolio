// src/components/sections/HeroSection.tsx

"use client"; // ESSENCIAL: Permite o uso de Hooks (useRef) e interatividade

import React, { useRef } from 'react';
import styles from './HeroSection.module.css'; 

// --- 1. Dados de Perfil (MOCKUP) ---
// Idealmente, estes dados viriam do seu ficheiro src/lib/data.ts
const profileData = {
    name: "Victor Cardoso",
    role: "Desenvolvedor & Arquiteto Web",
    description: "Transformo ideias complexas em experiências digitais fluidas e bem arquitetadas, com foco em performance, acessibilidade e design de código limpo.",
    linkedin: "https://www.linkedin.com/in/seu-perfil",
    location: "São Paulo, Brasil",
    email: "victorcardcunha@gmail.com",
    phone: "+55 (11) 97744-0146",
    birthDate: "Nascido em 1990",
    nationality: "Brasileiro"
}

// --- 2. Componentes de Ícones (Para Limpeza do Código) ---
// Estes são SVGs básicos. Use a sua biblioteca de ícones preferida (Lucide, Feather, etc.)
const LocationIcon = () => (<svg className={styles.contactIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>);
const MailIcon = () => (<svg className={styles.contactIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>);
const PhoneIcon = () => (<svg className={styles.contactIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-4.71-4.71 19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 3.08 2h3a2 2 0 0 1 2 1.72 17.6 17.6 0 0 0 .96 4.16 2 2 0 0 1-.41 2.56l-1.35 1.35a1 1 0 0 0 0 1.41 15.68 15.68 0 0 0 7.3 7.3 1 1 0 0 0 1.41 0l1.35-1.35a2 2 0 0 1 2.56-.41 17.6 17.6 0 0 0 4.16.96A2 2 0 0 1 22 16.92z"></path></svg>);
const LinkedinIcon = () => (<svg className={styles.linkedinIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>);


// --- 3. Componente Principal ---
const HeroSection = () => {
    // Referência para animações (mantida para a integração com Locomotive Scroll/GSAP)
    const heroRef = useRef(null);

    return (
        <section 
            className={styles.hero} 
            id="inicio"
            data-scroll-section
            ref={heroRef}
        >
            <div className={styles.heroContent}>
                
                {/* === Coluna Esquerda: Conteúdo Principal === */}
                <div className={styles.leftColumn}>
                    <h1 className={styles.title}>
                        {profileData.name}
                    </h1>
                    <p className={styles.subtitle}>
                        {profileData.description}
                    </p>
                    <a 
                        href={profileData.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.linkedinLink}
                        aria-label="Meu perfil no LinkedIn"
                    >
                        <LinkedinIcon />
                        Ver Perfil no LinkedIn
                    </a>
                </div>

                {/* === Coluna Direita: Foto + Elementos Visuais === */}
                <div className={styles.rightColumn}>
                    
                    {/* Formas Geométricas (Atrás da Foto) */}
                    <div className={styles.shapeSquare} aria-hidden="true"></div>
                    <div className={styles.shapeCircle} aria-hidden="true"></div>
                    
                    {/* Tags Flutuantes */}
                    <div className={`${styles.tag} ${styles.tagRight}`}>
                        {profileData.birthDate}
                    </div>
                    
                    <div className={`${styles.tag} ${styles.tagLeft}`}>
                        {profileData.nationality}
                    </div>

                    {/* Foto Principal */}
                    <div className={styles.photoContainer}>
                        <img 
                            src="/img/Phone Link/profile.jpg" // Altere este caminho para a sua foto real
                            alt={`Foto de perfil de ${profileData.name}`} 
                            className={styles.photo} 
                        />
                    </div>

                </div>
            </div>
            
            {/* === Bloco de Contato Fixo (no canto inferior direito) === */}
            <div className={styles.contactBlock}>
                <div className={styles.contactItem}>
                    <LocationIcon />
                    <span>{profileData.location}</span>
                </div>
                <div className={styles.contactItem}>
                    <MailIcon />
                    <span>{profileData.email}</span>
                </div>
                <div className={styles.contactItem}>
                    <PhoneIcon />
                    <span>{profileData.phone}</span>
                </div>
            </div>

        </section>
    );
};

export default HeroSection;