// src/components/sections/AcademicSection.tsx
"use client"; // Necessário para os hooks 'useRef' e 'useFadeInUp'

import React, { useRef } from 'react';
import styles from '@/app/page.module.css';
import { useFadeInUp } from '@/hooks/useFadeInUp';

// Tipagem para um item acadêmico (boa prática)
interface AcademicItem {
  course: string;
  institution: string;
  period: string;
  description: string;
}

// Props que a seção espera
interface AcademicData {
  academic: AcademicItem[];
}

interface AcademicSectionProps {
  data: AcademicData;
}

const AcademicSection: React.FC<AcademicSectionProps> = ({ data }) => {
  // Refs para animação
  const academicTitleRef = useRef(null);
  const academicListRef = useRef(null); // Ref para o 'container' da lista

  // Aplica animações
  useFadeInUp(academicTitleRef, 0.1);
  useFadeInUp(academicListRef, 0.3); // Anima o 'wrapper' da lista

  return (
    <section id="academico" className={styles.academicSection} data-scroll-section>
      <div className={styles.container}>
        <h2 ref={academicTitleRef} className={styles.sectionTitle}>Formação Acadêmica</h2>
        {/* Liga a 'ref' ao 'wrapper' da lista */}
        <div ref={academicListRef} className={styles.academicList}>
          {data.academic.map((item, index) => (
            <div key={index} className={styles.academicItem}>
              <h3 className={styles.academicCourse}>{item.course}</h3>
              <p className={styles.academicInstitution}>{item.institution} • {item.period}</p>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AcademicSection;