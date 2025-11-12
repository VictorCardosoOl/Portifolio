/**
 * @file data.ts
 * @description Arquivo centralizado para armazenar os dados de conteúdo do portfólio.
 * * Manter os dados separados da lógica da UI (componentes) permite:
 * 1. Atualizações fáceis: Mude textos, links ou projetos sem tocar nos componentes.
 * 2. Reutilização: Os dados podem ser importados em qualquer parte da aplicação.
 * 3. Manutenibilidade: Reduz a complexidade dos componentes e segue o 
 * Princípio da Responsabilidade Única (SRP).
 */

// --- DEFINIÇÕES DE TIPO (Boas Práticas para TS) ---
// Definir interfaces garante que os dados futuros sigam a mesma estrutura,
// facilitando a edição e prevenindo erros.

/**
 * Define a estrutura para um item na seção "Formação Acadêmica".
 */
interface AcademicItem {
  course: string;
  institution: string;
  period: string;
  description: string;
}

/**
 * Define a estrutura para um item na seção "Projetos".
 */
interface ProjectItem {
  title: string;
  description: string;
  tags: string[];
  liveUrl: string;
  repoUrl: string;
}

/**
 * Define a estrutura principal do objeto de dados do portfólio.
 * Tipar o objeto principal garante que todas as chaves necessárias estão presentes.
 */
interface PortfolioData {
  name: string;
  title: string;
  heroTagline: string;
  aboutMe: string[];
  academic: AcademicItem[];
  projects: ProjectItem[];
  skills: string[];
  contactEmail: string;
}

// --- DADOS DO PORTFÓLIO ---

/**
 * Objeto principal contendo todos os dados de texto e arrays do portfólio.
 * Este objeto é exportado e depois importado pela 'page.tsx' 
 * para popular os componentes da seção.
 */
export const portfolioData: PortfolioData = {
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