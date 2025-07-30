import React from 'react'; // Importe React
import clsx from 'clsx';

interface ITagsItem {
  label: string;
}
interface ITagsItems extends Array<ITagsItem> {}

// Definindo os tipos de temas para que Tags possa usá-los
type FeedTheme = 'mentalHealth' | 'workSafety' | 'sleepWellbeing';

interface ITagsProps {
  title: string;  
  className?: string;
  // NOVA PROP: Para receber o tema selecionado
  selectedTheme?: FeedTheme;
}

const Tags = ({ title, className, selectedTheme = 'mentalHealth' }: ITagsProps) => { // Removido 'items' padrão do destructuring, será dinâmico

  // Dados das tags (tópicos) baseados no tema selecionado
  const themeTags: Record<FeedTheme, ITagsItem[]> = {
    mentalHealth: [
      { label: 'Estresse Ocupacional' },
      { label: 'Fatores Psicossociais' },
      { label: 'Ansiedade no Trabalho' },
      { label: 'Prevenção ao Burnout' },
      { label: 'Acolhimento' },
      { label: 'Bem-estar Emocional' },
      { label: 'Equilíbrio Vida-Trabalho' },
      { label: 'Resiliência' }
    ],
    workSafety: [
      { label: 'Equipamentos de Proteção Individual (EPI)' },
      { label: 'Prevenção de Acidentes' },
      { label: 'NRs' },
      { label: 'Primeiros Socorros' },
      { label: 'Ergonomia' },
      { label: 'CIPA' },
      { label: 'Segurança Ocupacional' },
      { label: 'Análise de Risco' }
    ],
    sleepWellbeing: [
      { label: 'Higiene do Sono' },
      { label: 'Insônia' },
      { label: 'Ritmo Circadiano' },
      { label: 'Sonolência Diurna' },
      { label: 'Relaxamento' },
      { label: 'Estresse e Sono' },
      { label: 'Ambiente do Sono' },
      { label: 'Qualidade de Vida' }
    ],
  };

  // Seleciona os itens de tags com base no tema
  const currentItems = themeTags[selectedTheme];

  const renderItem = (item: ITagsItem, index: number) => {
    return (
      <span key={index} className="badge badge-sm badge-gray-200">
        {item.label}
      </span>
    );
  };

  return (
    <div className={clsx('card', className && className)}>
      <div className="card-header">
        <h3 className="card-title">{title}</h3>
      </div>

      <div className="card-body">
        <div className="flex flex-wrap gap-2.5 mb-2">
          {/* Mapeia os itens de tags do tema selecionado */}
          {currentItems.map((item, index) => {
            return renderItem(item, index);
          })}
        </div>
      </div>
    </div>
  );
};

export { Tags, type ITagsItem, type ITagsItems, type ITagsProps };