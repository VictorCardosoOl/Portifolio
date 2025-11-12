// src/components/sections/ProjectsSection.tsx
"use client"; // Necessário para os hooks 'useRef' e 'useFadeInUp'

import React, { useRef } from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import styles from '@/app/page.module.css';
import { useFadeInUp } from '@/hooks/useFadeInUp';

// Tipagem para um projeto
interface Project {
  title: string;
  description: string;
  tags: string[];
  liveUrl: string;
  repoUrl: string;
}

// Props que a seção espera
interface ProjectsData {
  projects: Project[];
}

interface ProjectsSectionProps {
  data: ProjectsData;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ data }) => {
  // Refs para animação
  const projectsTitleRef = useRef(null);
  const projectsGridRef = useRef(null); // Ref para o 'grid'

  // Aplica animações
  useFadeInUp(projectsTitleRef, 0.1);
  useFadeInUp(projectsGridRef, 0.3); // Anima o 'grid'

  return (
    <section id="projetos" className={styles.projectsSection} data-scroll-section>
      <div className={`${styles.container} ${styles.projectsContainer}`}>
        <h2 ref={projectsTitleRef} className={styles.sectionTitle}>Projetos</h2>
        <div ref={projectsGridRef} className={styles.projectsGrid}>
          {data.projects.map((project, index) => (
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
  );
};

export default ProjectsSection;