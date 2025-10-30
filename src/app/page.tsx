// src/app/page.tsx
"use client"; // Necessário para usar hooks como useRef

import React, { useRef } from 'react'; // Importa useRef
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaBriefcase, FaGraduationCap, FaEnvelope, FaExternalLinkAlt } from 'react-icons/fa';
import styles from './page.module.css';

// Importa os novos hooks de animação
import { useFadeInUp } from '@/hooks/useFadeInUp';
import { useMagneticButton } from '@/hooks/useMagneticButton';

// Dados do Portfólio (mantidos)
const portfolioData = {
  name: "Victor Cunha",
  title: "Desenvolvedor Full Stack",
  heroTagline: "Apaixonado por criar experiências digitais intuitivas e performáticas.",
  aboutMe: [
    "Olá! Sou Victor, um desenvolvedor com foco em criar soluções web robustas e escaláveis.",
    "Com experiência em todo o ciclo de desenvolvimento, do front-end com React/Next.js ao back-end com Node.js, busco sempre as melhores práticas e tecnologias para entregar valor."
  ],
  academic: [
    {
      course: "Análise e Desenvolvimento de Sistemas",
      institution: "Instituição Fictícia de Ensino",
      period: "2020 - 2023",
      description: "Foco em desenvolvimento de software, banco de dados e engenharia de requisitos."
    },
  ],
  projects: [
    {
      title: "Plataforma de E-commerce",
      description: "Loja virtual completa com carrinho, checkout e painel administrativo.",
      tags: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "CSS Modules"],
      liveUrl: "#",
      repoUrl: "#"
    },
    {
      title: "Sistema de Gerenciamento",
      description: "Aplicação para gestão interna de tarefas e projetos.",
      tags: ["React", "Firebase", "CSS Modules"],
      liveUrl: "#",
      repoUrl: "#"
    },
     {
      title: "Landing Page Interativa",
      description: "Página de produto com animações e design moderno.",
      tags: ["HTML", "CSS", "JavaScript", "GSAP"],
      liveUrl: "#",
      repoUrl: "#"
    }
  ],
  skills: ["React", "Next.js", "TypeScript", "JavaScript", "Node.js", "Express", "PostgreSQL", "MongoDB", "Docker", "Git", "CSS Modules", "HTML5", "CSS3"],
  contactEmail: "victor@email.com",
};


export default function Home() {
  
  // --- 1. Definir Refs para animações ---
  const heroTitleRef = useRef(null);
  const heroSubtitleRef = useRef(null);
  const heroTaglineRef = useRef(null);
  const heroActionsRef = useRef(null);
  const aboutTitleRef = useRef(null);
  const aboutContentRef = useRef(null);
  const academicTitleRef = useRef(null);
  const academicListRef = useRef(null);
  const skillsTitleRef = useRef(null);
  const skillsGridRef = useRef(null);
  const projectsTitleRef = useRef(null);
  const projectsGridRef = useRef(null);
  const contactTitleRef = useRef(null);
  const contactTextRef = useRef(null);
  const contactButtonRef = useRef(null);

  // Refs para botões magnéticos
  const magneticBtn1Ref = useRef(null);
  const magneticBtn2Ref = useRef(null);

  // --- 2. Aplicar Hooks de Animação ---
  
  // Hero
  useFadeInUp(heroTitleRef, 0.1);
  useFadeInUp(heroSubtitleRef, 0.3);
  useFadeInUp(heroTaglineRef, 0.5);
  useFadeInUp(heroActionsRef, 0.7);

  // Sobre
  useFadeInUp(aboutTitleRef, 0.1);
  useFadeInUp(aboutContentRef, 0.3);

  // Acadêmico
  useFadeInUp(academicTitleRef, 0.1);
  useFadeInUp(academicListRef, 0.3); // Pode aplicar ao container da lista

  // Habilidades
  useFadeInUp(skillsTitleRef, 0.1);
  useFadeInUp(skillsGridRef, 0.3); // Pode aplicar ao grid

  // Projetos
  useFadeInUp(projectsTitleRef, 0.1);
  useFadeInUp(projectsGridRef, 0.3); // Pode aplicar ao grid

  // Contato
  useFadeInUp(contactTitleRef, 0.1);
  useFadeInUp(contactTextRef, 0.3);
  useFadeInUp(contactButtonRef, 0.5);

  // Hooks Magnéticos
  useMagneticButton(magneticBtn1Ref, 0.4);
  useMagneticButton(magneticBtn2Ref, 0.4);
  useMagneticButton(contactButtonRef, 0.4); // Aplicando no botão de contato também


  return (
    <>
      {/* --- 3. Adicionar 'data-scroll-section' e 'refs' --- */}
      
      {/* ========== Hero Section ========== */}
      <section id="inicio" className={styles.heroSection} data-scroll-section>
        <div className={styles.container}>
          <h1 ref={heroTitleRef} className={styles.heroTitle}>{portfolioData.name}</h1>
          <p ref={heroSubtitleRef} className={styles.heroSubtitle}>{portfolioData.title}</p>
          <p ref={heroTaglineRef} className={styles.heroTagline}>{portfolioData.heroTagline}</p>
          <div ref={heroActionsRef} className={styles.heroActions}>
             <Link 
                ref={magneticBtn1Ref}
                href="/#projetos" 
                className={`${styles.btn} ${styles.btnPrimary}`}
             >
                Meus Projetos
             </Link>
             <Link 
                ref={magneticBtn2Ref}
                href="/#contato" 
                className={`${styles.btn} ${styles.btnSecondary}`}
             >
                Entre em Contato
             </Link>
          </div>
        </div>
         <div className={styles.scrollIndicator}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
         </div>
      </section>

      {/* ========== About Section ========== */}
      <section id="sobre" className={styles.aboutSection} data-scroll-section>
        <div className={`${styles.container} ${styles.aboutContainer}`}>
          <h2 ref={aboutTitleRef} className={styles.sectionTitle}>Sobre Mim</h2>
          <div ref={aboutContentRef} className={styles.aboutContent}>
            {portfolioData.aboutMe.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {/* ========== Academic Section ========== */}
      <section id="academico" className={styles.academicSection} data-scroll-section>
        <div className={styles.container}>
          <h2 ref={academicTitleRef} className={styles.sectionTitle}>Formação Acadêmica</h2>
          <div ref={academicListRef} className={styles.academicList}>
            {portfolioData.academic.map((item, index) => (
              <div key={index} className={styles.academicItem}>
                <h3 className={styles.academicCourse}>{item.course}</h3>
                <p className={styles.academicInstitution}>{item.institution} • {item.period}</p>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== Skills Section ========== */}
      <section id="habilidades" className={styles.skillsSection} data-scroll-section>
        <div className={styles.container}>
          <h2 ref={skillsTitleRef} className={styles.sectionTitle}>Habilidades</h2>
          <div ref={skillsGridRef} className={styles.skillsGrid}>
            {portfolioData.skills.map((skill) => (
              <span key={skill} className={styles.skillTag}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ========== Projects Section ========== */}
      <section id="projetos" className={styles.projectsSection} data-scroll-section>
        <div className={`${styles.container} ${styles.projectsContainer}`}>
          <h2 ref={projectsTitleRef} className={styles.sectionTitle}>Projetos</h2>
          <div ref={projectsGridRef} className={styles.projectsGrid}>
            {portfolioData.projects.map((project, index) => (
              <div key={index} className={styles.projectCard}>
                <div className={styles.projectCardContent}>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <p className={styles.projectDescription}>{project.description}</p>
                  <div className={styles.projectTags}>
                    {project.tags.map(tag => (
                      <span key={tag} className={styles.projectTag}>{tag}</span>
                    ))}
                  </div>
                  <div className={styles.projectLinks}>
                    {project.liveUrl && project.liveUrl !== "#" && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
                        <FaExternalLinkAlt aria-hidden="true" /> Ver Demo
                      </a>
                    )}
                     {project.repoUrl && project.repoUrl !== "#" && (
                      <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
                        <FaGithub aria-hidden="true" /> Código
                      </a>
                     )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== Contact Section ========== */}
      <section id="contato" className={styles.contactSection} data-scroll-section>
        <div className={styles.container}>
          <h2 ref={contactTitleRef} className={styles.sectionTitle}>Entre em Contato</h2>
          <p ref={contactTextRef} className={styles.contactText}>
            Gostou do que viu? Vamos conversar sobre como posso ajudar no seu próximo projeto!
          </p>
          <a
            ref={contactButtonRef}
            href={`mailto:${portfolioData.contactEmail}`}
            className={`${styles.btn} ${styles.btnPrimary} ${styles.contactButton}`}
          >
            <FaEnvelope aria-hidden="true" /> Enviar Email
          </a>
        </div>
      </section>
    </>
  );
}