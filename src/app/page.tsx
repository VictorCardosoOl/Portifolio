// src/app/page.tsx
import React from 'react';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaBriefcase, FaGraduationCap, FaEnvelope, FaExternalLinkAlt } from 'react-icons/fa'; // Adicionando FaExternalLinkAlt
import styles from './page.module.css'; // Importa o CSS Module

// Dados do Portfólio (mantidos aqui por enquanto)
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
  return (
    <>
      {/* ========== Hero Section ========== */}
      <section id="inicio" className={styles.heroSection}>
        <div className={styles.container}> {/* Container geral */}
          <h1 className={styles.heroTitle}>{portfolioData.name}</h1>
          <p className={styles.heroSubtitle}>{portfolioData.title}</p>
          <p className={styles.heroTagline}>{portfolioData.heroTagline}</p>
          <div className={styles.heroActions}>
             <Link href="/#projetos" className={`${styles.btn} ${styles.btnPrimary}`}>
                Meus Projetos
             </Link>
             <Link href="/#contato" className={`${styles.btn} ${styles.btnSecondary}`}>
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
      <section id="sobre" className={styles.aboutSection}>
        <div className={`${styles.container} ${styles.aboutContainer}`}> {/* Container com classe específica */}
          <h2 className={styles.sectionTitle}>Sobre Mim</h2>
          <div className={styles.aboutContent}>
            {portfolioData.aboutMe.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {/* ========== Academic Section ========== */}
      <section id="academico" className={styles.academicSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Formação Acadêmica</h2>
          <div className={styles.academicList}>
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
      <section id="habilidades" className={styles.skillsSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Habilidades</h2>
          <div className={styles.skillsGrid}>
            {portfolioData.skills.map((skill) => (
              <span key={skill} className={styles.skillTag}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ========== Projects Section ========== */}
      <section id="projetos" className={styles.projectsSection}>
        <div className={`${styles.container} ${styles.projectsContainer}`}> {/* Container mais largo */}
          <h2 className={styles.sectionTitle}>Projetos</h2>
          <div className={styles.projectsGrid}>
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
      <section id="contato" className={styles.contactSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Entre em Contato</h2>
          <p className={styles.contactText}>
            Gostou do que viu? Vamos conversar sobre como posso ajudar no seu próximo projeto!
          </p>
          <a
            href={`mailto:${portfolioData.contactEmail}`}
            className={`${styles.btn} ${styles.btnPrimary} ${styles.contactButton}`}
          >
            <FaEnvelope aria-hidden="true" /> Enviar Email
          </a>
        </div>
      </section>

      {/* Espaço extra no final */}
      {/* <div className={styles.bottomSpacer}></div> */}
    </>
  );
}