// src/app/page.tsx
// (NÃO DEVE TER "use client;" AQUI)

import styles from './page.module.css';

// 1. Importamos os novos componentes de seção
// (Verifique se criou estes ficheiros em 'src/components/sections/')
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import AcademicSection from '@/components/sections/AcademicSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ContactSection from '@/components/sections/ContactSection';

// Os dados do portfólio
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
  
  // (Note que todas as refs e hooks foram removidos daqui)

  return (
    <>
      {/* --- Renderização Limpa --- */}
      <HeroSection 
        data={{
          name: portfolioData.name,
          title: portfolioData.title,
          tagline: portfolioData.heroTagline
        }} 
      />
      <AboutSection 
        data={{ 
          aboutMe: portfolioData.aboutMe 
        }} 
      />
      <AcademicSection 
        data={{ 
          academic: portfolioData.academic 
        }} 
      />
      <SkillsSection 
        data={{ 
          skills: portfolioData.skills 
        }} 
      />
      <ProjectsSection 
        data={{ 
          projects: portfolioData.projects 
        }} 
      />
      <ContactSection 
        data={{ 
          contactEmail: portfolioData.contactEmail 
        }} 
      />
    </>
  );
}