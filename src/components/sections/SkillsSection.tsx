// src/components/sections/SkillsSection.tsx
"use client"; // Necessário para os hooks 'useRef' e 'useFadeInUp'

import React, { useRef } from 'react';
import styles from '@/app/page.module.css';
import { useFadeInUp } from '@/hooks/useFadeInUp';

// Props que a seção espera
interface SkillsData {
  skills: string[];
}

interface SkillsSectionProps {
  data: SkillsData;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ data }) => {
  // Refs para animação
  const skillsTitleRef = useRef(null);
  const skillsGridRef = useRef(null); // Ref para o 'grid'

  // Aplica animações
  useFadeInUp(skillsTitleRef, 0.1);
  useFadeInUp(skillsGridRef, 0.3); // Anima o 'grid' como um todo

  return (
    <section id="habilidades" className={styles.skillsSection} data-scroll-section>
      <div className={styles.container}>
        <h2 ref={skillsTitleRef} className={styles.sectionTitle}>Habilidades</h2>
        {/* Liga a 'ref' ao 'grid' */}
        <div ref={skillsGridRef} className={styles.skillsGrid}>
          {data.skills.map((skill) => (
            <span key={skill} className={styles.skillTag}>
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;