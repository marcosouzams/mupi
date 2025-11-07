'use client';

import { useEffect, useState } from 'react';
import { useClientLocale } from '@/hooks/useClientLocale';
import { ProductsSectionServer } from './ProductsSectionServer';

// Traduções padrão em português (fora do componente para SSR)
const defaultTranslations = {
  products: {
    badge: "NOSSAS PLATAFORMAS",
    title: "Catálogo de",
    titleHighlight: "Soluções",
    description: "Explore nossas plataformas tecnológicas inovadoras",
    leftSection: {
      title: "Inovação e Tecnologia",
      titleHighlight: "para o Futuro",
      paragraph1: "A MUPI SYSTEMS nasceu para revolucionar o mercado através de plataformas tecnológicas escaláveis e inovadoras. Desenvolvemos soluções que não apenas resolvem problemas reais, mas transformam a forma como empresas operam e crescem no ambiente digital.",
      paragraph2: "Nosso foco está em desenvolver soluções que impulsionam a transformação digital: sistemas inteligentes de atendimento ao cliente, plataformas de gestão de recursos humanos (recrutamento, desenvolvimento e treinamento), tecnologias avançadas para análise de textos (contratos, documentos, notícias), smart contracts e agentes de IA autônomos que estão revolucionando processos de negócio.",
      tags: {
        customerService: "Atendimento ao Cliente",
        hrManagement: "Gestão de RH",
        textAnalysis: "Análise de Textos",
        smartContracts: "Smart Contracts"
      }
    },
    ctaLearnMore: "Saiba mais",
    items: {
      eagenda: {
        title: "eAgenda",
        category: "Agendamento",
        description: "Plataforma de agendamento online de uso geral para otimizar a gestão de compromissos e horários.",
        features: ["Agendamento online", "Gestão de horários", "Notificações automáticas", "Integração com calendários"]
      },
      minhaSala: {
        title: "Minha Sala Virtual",
        category: "Educação",
        description: "Plataforma de EAD para treinamentos corporativos com foco em engajamento e resultados.",
        features: ["Cursos online", "Gamificação", "Relatórios de progresso", "Certificações"]
      },
      meuAtendimento: {
        title: "Meu Atendimento Virtual",
        category: "Atendimento",
        description: "Gestão inteligente de filas de atendimento para melhorar a experiência do cliente.",
        features: ["Gestão de filas", "Atendimento virtual", "Métricas em tempo real", "Chat integrado"]
      },
      atendeAqui: {
        title: "Atende Aqui",
        category: "Suporte",
        description: "Gestão completa de tickets de suporte, vendas e desenvolvimento em uma única plataforma.",
        features: ["Gestão de tickets", "Suporte multicanal", "Base de conhecimento", "Automação de processos"]
      },
      eQualifica: {
        title: "eQualifica",
        category: "Qualificação",
        description: "Plataforma especializada em qualificação registral para processos seguros e eficientes.",
        features: ["Qualificação digital", "Assinatura eletrônica", "Validação de documentos", "Compliance"]
      },
      eTalentos: {
        title: "e-Talentos",
        category: "RH",
        description: "Solução completa para gestão de talentos, recrutamento e seleção inteligente.",
        features: ["Recrutamento", "Seleção inteligente", "Gestão de candidatos", "Analytics de RH"]
      },
      sigVirtual: {
        title: "SIG Virtual",
        category: "Gestão",
        description: "Sistema integrado de gestão para otimizar processos empresariais.",
        features: ["Gestão integrada", "Processos automatizados", "Relatórios gerenciais", "Dashboard em tempo real"]
      },
      textualiza: {
        title: "Textualiza",
        category: "Análise",
        description: "Plataforma de análise inteligente de textos e documentos com IA.",
        features: ["Análise de textos", "IA avançada", "Processamento de documentos", "Insights automáticos"]
      }
    }
  }
};

export const ProductsSection = () => {
  const locale = useClientLocale();
  const [translations, setTranslations] = useState<{
    products: {
      leftSection: {
        title: string;
        titleHighlight: string;
        paragraph1: string;
        paragraph2: string;
        tags: {
          customerService: string;
          hrManagement: string;
          textAnalysis: string;
          smartContracts: string;
        };
      };
      [key: string]: unknown;
    };
  }>(defaultTranslations);

  useEffect(() => {
    fetch(`/locales/${locale}/products.json`)
      .then(res => res.json())
      .then(data => setTranslations(data))
      .catch(() => setTranslations(defaultTranslations));
  }, [locale]);

  return <ProductsSectionServer translations={translations} />;
};
