// Types para os dados de cases
export interface Case {
  id: number;
  title: string;
  shortTitle: string;
  excerpt: string;
  description: string;
  author: string;
  date: string;
  readingTime: string;
  category: string;
  sector: string;
  image: string;
  logo: string;
  slug: string;
  client: string;
  duration: string;
  solution: string;
  objective: string;
  challenges: string[];
  results: string[];
  tools: string[];
  featured: boolean;
}

export interface Sector {
  id: string;
  name: string;
  count: number;
}

// Lista de setores para filtros
export const sectors: Sector[] = [
  { id: 'todos', name: 'Todos os setores', count: 2 },
  { id: 'eventos', name: 'Eventos', count: 1 },
  { id: 'cartorio', name: 'Cartórios', count: 1 },
  { id: 'agricultura', name: 'Agricultura', count: 0 },
  { id: 'farmaceutico', name: 'Farmacêutico', count: 0 },
  { id: 'orgaos-publicos', name: 'Órgãos Públicos', count: 0 },
  { id: 'educacao', name: 'Educação', count: 0 },
  { id: 'saude', name: 'Saúde', count: 0 }
];

// Helper function para obter setores traduzidos
export const getTranslatedSectors = (t: any): Sector[] => {
  return sectors.map(sector => ({
    ...sector,
    name: t(`cases.sectors.${sector.id}`)
  }));
};

// Dados estruturados dos cases
export const cases: Case[] = [
  {
    id: 1,
    title: "Desafios do Agendamento na Bienal do Livro Rio 2025",
    shortTitle: "Bienal do Livro Rio 2025",
    excerpt: "Como a Mupi Systems forneceu expertise em agendamento online para as Escape Rooms da Bienal do Livro Rio, lidando com alta demanda e regras complexas.",
    description: "Solução completa de agendamento para as Escape Rooms do maior evento literário do Brasil.",
    author: "admin",
    date: "26 de junho de 2025",
    readingTime: "8 min",
    category: "Eventos",
    sector: "eventos",
    image: "/images/bienal.webp",
    logo: "/parceiros/bienal.png",
    slug: "bienal-livro-rio-2025",
    client: "Bienal do Livro Rio",
    duration: "7 dias",
    solution: "eAgenda",
    objective: "Desenvolver uma solução de agendamento online robusta e escalável para gerenciar as Escape Rooms da Bienal do Livro Rio 2025",
    challenges: [
      "Grande Volume de Acesso e Agendamentos Simultâneos",
      "Limitação de Agendamentos por Usuário (CPF e E-mail)",
      "Restrições de Idade para Participação", 
      "Gerenciamento de Lista de Espera",
      "Agendamento com Acompanhantes e Validação de Dados"
    ],
    results: [
      "Sistema Estável - Zero downtime durante picos de acesso",
      "Controle Eficaz - Distribuição justa de vagas implementada",
      "Otimização de Vagas - Lista de espera minimizou vagas ociosas",
      "Experiência Fluida - Processo de agendamento intuitivo"
    ],
    tools: ["Plataforma eAgenda", "Arquitetura Cloud", "Sistema de Validação", "Lista de Espera"],
    featured: true
  },
  {
    id: 2,
    title: "Transformação Digital no 1º Registro de Imóveis de Montes Claros",
    shortTitle: "1º Registro de Imóveis de Montes Claros",
    excerpt: "Implementação de soluções integradas de agendamento e gestão de filas para modernizar o atendimento cartorial, combinando eAgenda e Meu Atendimento Virtual.",
    description: "Modernização completa do atendimento cartorial com soluções integradas de agendamento e gestão.",
    author: "admin",
    date: "15 de agosto de 2025",
    readingTime: "6 min",
    category: "Cartórios",
    sector: "cartorio",
    image: "/images/1rimc.jpeg",
    logo: "/parceiros/1rimc.png",
    slug: "1rimc-registro-imoveis-montes-claros",
    client: "1º Registro de Imóveis de Montes Claros",
    duration: "Implementação contínua",
    solution: "eAgenda + Meu Atendimento Virtual",
    objective: "Modernizar o atendimento cartorial implementando agendamento online e gestão digital de filas para atendimentos presenciais e virtuais",
    challenges: [
      "Integração de Múltiplas Plataformas",
      "Gestão de Atendimentos Presenciais e Virtuais",
      "Controle de Fluxo de Clientes",
      "Modernização de Processos Tradicionais",
      "Experiência do Usuário em Ambiente Cartorial"
    ],
    results: [
      "Atendimento Híbrido - Agendamentos presenciais e virtuais unificados",
      "Gestão Eficiente - Controle digital de senhas e filas implementado",
      "Redução de Espera - Otimização significativa do tempo de atendimento",
      "Modernização - Digitalização completa dos processos de atendimento"
    ],
    tools: ["eAgenda", "Meu Atendimento Virtual", "Sistema de Senhas", "Gestão de Filas"],
    featured: true
  }
  // Estrutura preparada para novos cases futuros
  // {
  //   id: 3,
  //   title: "Próximo Case de Sucesso",
  //   shortTitle: "Case Futuro",
  //   excerpt: "Descrição breve do próximo case...",
  //   description: "Descrição completa do case...",
  //   author: "admin",
  //   date: "Data futura",
  //   readingTime: "X min",
  //   category: "Categoria",
  //   sector: "setor",
  //   image: "/images/case3.png",
  //   logo: "/parceiros/cliente3.png",
  //   slug: "slug-do-case",
  //   client: "Nome do Cliente",
  //   duration: "Duração",
  //   solution: "Solução utilizada",
  //   objective: "Objetivo do projeto",
  //   challenges: ["Desafio 1", "Desafio 2"],
  //   results: ["Resultado 1", "Resultado 2"],
  //   tools: ["Ferramenta 1", "Ferramenta 2"],
  //   featured: false
  // }
];

// Helper functions para trabalhar com os dados
export const getFeaturedCases = (): Case[] => {
  return cases.filter(c => c.featured);
};

export const getCaseBySlug = (slug: string): Case | undefined => {
  return cases.find(c => c.slug === slug);
};

export const getCasesByCategory = (category: string): Case[] => {
  return cases.filter(c => c.category.toLowerCase() === category.toLowerCase());
};

export const getCasesBySector = (sectorId: string): Case[] => {
  if (sectorId === 'todos') return cases;
  return cases.filter(c => c.sector === sectorId);
};

export const getAllCategories = (): string[] => {
  return [...new Set(cases.map(c => c.category))];
};

export const getRelatedCases = (currentSlug: string, limit: number = 3): Case[] => {
  const currentCase = getCaseBySlug(currentSlug);
  if (!currentCase) return [];
  
  return cases
    .filter(c => c.slug !== currentSlug && (c.sector === currentCase.sector || c.category === currentCase.category))
    .slice(0, limit);
};

// Helper function para obter dados traduzidos de um case
export const getTranslatedCaseData = (caseItem: Case, t: any) => {
  try {
    // Tenta buscar cada propriedade individualmente
    const translatedTitle = t(`cases.caseData.${caseItem.id}.title`, caseItem.title);
    const translatedShortTitle = t(`cases.caseData.${caseItem.id}.shortTitle`, caseItem.shortTitle);
    const translatedDescription = t(`cases.caseData.${caseItem.id}.description`, caseItem.description);
    const translatedCategory = t(`cases.caseData.${caseItem.id}.category`, caseItem.category);
    
    console.log(`Case ${caseItem.id} translations:`, {
      title: translatedTitle,
      shortTitle: translatedShortTitle,
      description: translatedDescription,
      category: translatedCategory
    });
    
    return {
      ...caseItem,
      title: translatedTitle,
      shortTitle: translatedShortTitle,
      description: translatedDescription,
      category: translatedCategory
    };
  } catch (error) {
    console.error('Error translating case data:', error);
    return caseItem;
  }
};