/**
 * @file data.ts
 * @description Arquivo centralizado para armazenar os dados de conteúdo do portfólio.
 * ... (comentários anteriores mantidos) ...
 */

// --- DEFINIÇÕES DE TIPO (Boas Práticas para TS) ---
// ... (interfaces AcademicItem, ProjectItem, PortfolioData mantidas) ...

/**
 * Define a estrutura para um item do menu principal.
 */
interface MenuItem {
  label: string;
  ariaLabel: string;
  link: string;
}


// --- DADOS DO PORTFÓLIO ---

/**
 * Objeto principal contendo todos os dados de texto e arrays do portfólio.
 * ...
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


// --- !! NOVO !! DADOS DO MENU ---

/**
 * Array contendo os itens de navegação principal.
 * Usado pelo componente StaggeredMenu.
 */
export const menuItems: MenuItem[] = [
  {
    label: "Início",
    ariaLabel: "Ir para o topo da página",
    link: "#inicio" 
  },
  {
    label: "Sobre",
    ariaLabel: "Ir para a seção Sobre",
    link: "#sobre" // Assumindo que sua AboutSection tem id="sobre"
  },
    {
    label: "Formação",
    ariaLabel: "Ir para a seção Formação Acadêmica",
    link: "#academico" // Assumindo que sua AcademicSection tem id="academico"
  },
      {
    label: "Skills",
    ariaLabel: "Ir para a seção Skills",
    link: "#skills" // Assumindo que sua SkillsSection tem id="skills"
  },
  {
    label: "Projetos",
    ariaLabel: "Ir para a seção Projetos",
    link: "#projetos" // Assumindo que sua ProjectsSection tem id="projetos"
  },
  {
    label: "Contato",
    ariaLabel: "Ir para a seção Contato",
    link: "#contato" // ContactSection tem id="contato"
  }
];