import { KeenIcon } from '@/components';

interface ISummaryItem {
  icon: string;
  info: string;
}
interface ISummaryItems extends Array<ISummaryItem> {}

interface ISummaryProps {
  title: string;
  /**
   * Breve resumo ou mensagem de acolhimento. Pode vir do backend.
   * Opcional para manter compatibilidade com usos existentes.
   */
  description?: string;
}

const Summary = ({
  title,
  description = 'Aqui você encontrará acolhimento, escuta e recursos para cuidar da sua saúde mental. Lembre-se: você não está sozinho nessa jornada.'
}: ISummaryProps) => {
  const items: ISummaryItems = [
    { icon: 'box', info: 'Práticas de Autocuidado' },
    { icon: 'box', info: 'Técnicas de Respiração e Relaxamento' },
    { icon: 'box', info: 'Rede de Apoio Emocional' },
    { icon: 'box', info: 'Contato com Especialistas' },
    { icon: 'box', info: 'Recursos Online de Saúde Mental' },
    { icon: 'box', info: 'Comunidade de Apoio' },
    { icon: 'box', info: 'Vídeos de Meditação Guiada' }
  ];

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
        <p className="text-sm text-gray-800 leading-5.5 mb-4">{description}</p>

        <div className="grid gap-y-3.5">
          {items.map((item, index) => {
            return renderItem(item, index);
          })}
        </div>
      </div>
    </div>
  );
};

export { Summary, type ISummaryItem, type ISummaryItems, type ISummaryProps };
