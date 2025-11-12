// src/app/page.tsx

// --- IMPORTAÇÕES DE COMPONENTES ---
// Estilos e componentes de seção são importados aqui.
import styles from './page.module.css';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import AcademicSection from '@/components/sections/AcademicSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ContactSection from '@/components/sections/ContactSection';

// --- IMPORTAÇÃO DE DADOS ---
/**
 * @import { portfolioData }
 * Importa os dados de conteúdo do portfólio a partir de um arquivo dedicado (data.ts).
 * Isso desacopla os dados da lógica de apresentação (este componente).
 */
import { portfolioData } from '@/lib/data';

// --- DADOS REMOVIDOS ---
// O objeto 'const portfolioData = { ... }' que estava aqui foi removido
// e movido para 'src/lib/data.ts'.


/**
 * @component Home
 * @description Componente principal da página (rota '/').
 * * Atua como um "orquestrador": sua principal responsabilidade é
 * importar os dados do portfólio ('portfolioData') e passá-los (via props) 
 * para os componentes de seção filhos (HeroSection, AboutSection, etc.).
 * * Cada componente de seção é responsável por sua própria renderização e animação.
 * * @returns {React.ReactElement} O layout da página principal montado.
 */
export default function Home() {
  
  return (
    <>
      {/* Renderiza cada componente de seção, passando a sub-árvore
        relevante do objeto 'portfolioData' como a prop 'data'.
      */}
      
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