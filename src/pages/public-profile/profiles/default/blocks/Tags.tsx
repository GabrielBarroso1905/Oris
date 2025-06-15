import clsx from 'clsx';

interface ITagsItem {
  label: string;
}
interface ITagsItems extends Array<ITagsItem> {}

interface ITagsProps {
  title: string;  
  className?: string;
  items?: ITagsItems;  // Agora os tópicos podem vir de fora (do backend)
}

const Tags = ({ title, className, items = [
  { label: 'Estresse Ocupacional' },
  { label: 'Fatores Psicossociais' },
  { label: 'Carga de Trabalho' },
  { label: 'Ambiente Organizacional' },
  { label: 'Assédio Moral no Trabalho' },
  { label: 'Demandas Emocionais' },
  { label: 'Relações Interpessoais no Trabalho' },
  { label: 'Prevenção ao Burnout' }
] }: ITagsProps) => {

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
          {items.map((item, index) => {
            return renderItem(item, index);
          })}
        </div>
      </div>
    </div>
  );
};

export { Tags, type ITagsItem, type ITagsItems, type ITagsProps };
