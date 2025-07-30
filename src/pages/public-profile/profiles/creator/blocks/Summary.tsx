// src/pages/public-profile/profiles/creator/Summary.tsx
import React from 'react'; // Importe React
import { KeenIcon } from '@/components';

interface ISummaryItem {
  icon: string;
  info: string;
}
interface ISummaryItems extends Array<ISummaryItem> {}

// Definindo os tipos de temas novamente para que Summary possa usá-los
type FeedTheme = 'mentalHealth' | 'workSafety' | 'sleepWellbeing';

interface ISummaryProps {
  title: string;
  /**
   * Breve resumo ou mensagem de acolhimento. Pode vir do backend.
   * Opcional para manter compatibilidade com usos existentes.
   */
  description?: string;
  // NOVA PROP: Para receber o tema selecionado
  selectedTheme?: FeedTheme; 
}

const Summary = ({
  title,
  // O description padrão será para saúde mental
  description = 'Aqui você encontrará acolhimento, escuta e recursos para cuidar da sua saúde mental. Lembre-se: você não está sozinho nessa jornada.',
  selectedTheme = 'mentalHealth' // Valor padrão caso não seja passado
}: ISummaryProps) => {

  // Dados do Summary (itens e descrição) baseados no tema selecionado
  const themeContent = {
    mentalHealth: {
      description: 'Aqui você encontrará acolhimento, escuta e recursos para cuidar da sua saúde mental. Lembre-se: você não está sozinho nessa jornada.',
      items: [
        { icon: 'ki-solid ki-heart', info: 'Práticas de Autocuidado' }, // Ícones atualizados para serem mais pertinentes
        { icon: 'ki-solid ki-wind', info: 'Técnicas de Respiração e Relaxamento' },
        { icon: 'ki-solid ki-user-plus', info: 'Rede de Apoio Emocional' },
        { icon: 'ki-solid ki-phone', info: 'Contato com Especialistas' },
        { icon: 'ki-solid ki-book-open', info: 'Recursos Online de Saúde Mental' },
        { icon: 'ki-solid ki-users', info: 'Comunidade de Apoio' },
        { icon: 'ki-solid ki-video', info: 'Vídeos de Meditação Guiada' }
      ]
    },
    workSafety: {
      description: 'Sua segurança é nossa prioridade. Encontre aqui informações e ferramentas para um ambiente de trabalho mais seguro e saudável.',
      items: [
        { icon: 'ki-solid ki-helmet', info: 'Treinamentos de EPIs' },
        { icon: 'ki-solid ki-siren', info: 'Procedimentos de Emergência' },
        { icon: 'ki-solid ki-ruler', info: 'Dicas de Ergonomia' },
        { icon: 'ki-solid ki-shield-alt', info: 'Prevenção de Acidentes' },
        { icon: 'ki-solid ki-tools', info: 'Manutenção de Equipamentos' },
        { icon: 'ki-solid ki-clipboard', info: 'Relatórios de Incidentes' },
        { icon: 'ki-solid ki-first-aid', info: 'Primeiros Socorros' }
      ]
    },
    sleepWellbeing: {
      description: 'Descubra como melhorar a qualidade do seu sono e alcançar um bem-estar completo. Um bom descanso é a base da saúde.',
      items: [
        { icon: 'ki-solid ki-moon', info: 'Higiene do Sono' },
        { icon: 'ki-solid ki-bed', info: 'Ambiente Ideal para Dormir' },
        { icon: 'ki-solid ki-yin-yang', info: 'Técnicas de Relaxamento Noturno' },
        { icon: 'ki-solid ki-apple-alt', info: 'Nutrição para o Sono' },
        { icon: 'ki-solid ki-headphones', info: 'Sons para Ajudar a Dormir' },
        { icon: 'ki-solid ki-calendar', info: 'Rotina de Sono Consistente' },
        { icon: 'ki-solid ki-bolt', info: 'Impacto do Sono na Energia' }
      ]
    }
  };

  // Seleciona o conteúdo com base no tema
  const currentContent = themeContent[selectedTheme];

  const renderItem = (item: ISummaryItem, index: number) => {
    return (
      <div key={index} className="flex items-center gap-2.5">
        <KeenIcon icon={item.icon} className="text-base text-gray-500" />
        <a href="#" className="text-sm leading-none text-gray-900 hover:text-primary-active">
          {item.info}
        </a>
      </div>
    );
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">{title}</h3>
      </div>

      <div className="card-body">
        <p className="text-sm text-gray-800 leading-5.5 mb-4">{currentContent.description}</p> {/* Usa a descrição do tema */}

        <div className="grid gap-y-3.5">
          {currentContent.items.map((item, index) => { {/* Usa os itens do tema */}
            return renderItem(item, index);
          })}
        </div>
      </div>
    </div>
  );
};

export { Summary, type ISummaryItem, type ISummaryItems, type ISummaryProps };