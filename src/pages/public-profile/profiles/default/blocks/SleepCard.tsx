import { KeenIcon } from '@/components';
import { CommonHexagonBadge } from '@/partials/common';

interface ISleepCardProps {
  title: string;
  value: string;
  updatedAt: string;
  items?: {
    stroke: string;
    fill: string;
    icon: string;
    iconColor: string;
  }[];
}

const SleepCard = ({ 
  title = "Sono", 
  value = "8h", 
  updatedAt = "1 dia",
  items = [
    {
      stroke: 'stroke-primary-clarity',
      fill: 'fill-primary-light',
      icon: 'weather-moon',
      iconColor: 'text-primary'
    }
  ]
}: ISleepCardProps) => {
  const renderHexagon = (item: typeof items[0], index: number) => (
    <CommonHexagonBadge
      key={index}
      stroke={item.stroke}
      fill={item.fill}
      size="size-[40px]"
      badge={
        <KeenIcon 
          icon={item.icon} 
          className={`text-lg ${item.iconColor}`} 
        />
      }
    />
  );

  return (
    <div className="card max-w-[180px] p-4 rounded-xl shadow-sm bg-white border border-gray-100 text-center">
      {/* Cabeçalho com título */}
      <div className="card-header mb-2  text-center">
        <h3 className="text-sm font-medium text-gray-700  text-center">{title}</h3>
      </div>

      {/* Hexágono central */}
      <div className="card-body flex justify-center mb-3">
        <div className="flex justify-center">
          {items.map(renderHexagon)}
        </div>
      </div>

      {/* Valor principal */}
      <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>

      {/* Rodapé */}
      <div className="text-xs text-gray-400">
        Atualizado há {updatedAt}
      </div>
    </div>
  );
};

export { SleepCard, type ISleepCardProps };