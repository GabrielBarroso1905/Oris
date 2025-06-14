import { KeenIcon } from '@/components';
import { CommonHexagonBadge } from '@/partials/common';

interface ICardData {
  title: string;
  stroke: string;
  fill: string;
  icon: string;
  iconColor: string;
  value: string;
  updated: string;
}

interface ICommunityBadgesProps {
  title: string;
}

const CommunityBadges = ({ title }: ICommunityBadgesProps) => {
  const cardsData: ICardData[] = [
    {
      title: "Sono",
      stroke: 'stroke-primary-clarity',
      fill: 'fill-primary-light',
      icon: 'ki-filled ki-moon',
      iconColor: 'text-primary',
      value: '8 hrs',
      updated: '3hrs'
    },
    {
      title: "Humor",
      stroke: 'stroke-success-clarity',
      fill: 'fill-success-light',
      icon: 'ki-filled ki-emoji-happy',
      iconColor: 'text-success',
      value: 'Contente',
      updated: '2hrs'
    },
    {
      title: "BPM",
      stroke: 'stroke-danger',
      fill: 'fill-danger-light',
      icon: 'ki-filled ki-heart',
      iconColor: 'text-danger',
      value: '95',
      updated: '1hr'
    },
    {
      title: "IMC",
      stroke: 'stroke-info-clarity',
      fill: 'fill-info-light',
      icon: 'ki-filled ki-user-tick',
      iconColor: 'text-info',
      value: '24',
      updated: '30min'
    }
  ];

  const renderCard = (card: ICardData, index: number) => {
    return (
      <div key={index} className="card max-w-40 text-center">
        <div className="card-header justify-center">
          <h3 className="card-title">{card.title}</h3>
        </div>
        <div className="card-body flex justify-center items-center">
          <CommonHexagonBadge
            stroke={card.stroke}
            fill={card.fill}
            size="size-[90px]"
            badge={<KeenIcon icon={card.icon} className={`text-5xl ps-px ${card.iconColor}`} />}
          />
        </div>
        <div className="text-2xl font-bold text-gray-900 mb-1">{card.value}</div>
        <div className="text-xs text-gray-400 mb-2">
          Atualizado há {card.updated}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Layout para mobile (exatamente como você tinha) */}
      <div className="md:hidden flex flex-wrap justify-center gap-6">
        {/* Coluna 1 (ligeiramente acima) */}
        <div className="flex flex-col gap-6">
          {renderCard(cardsData[0], 0)}
          {renderCard(cardsData[1], 1)}
        </div>

        {/* Coluna 2 (ligeiramente abaixo) */}
        <div className="flex flex-col gap-6 mt-14">
          {renderCard(cardsData[2], 2)}
          {renderCard(cardsData[3], 3)}
        </div>
      </div>

      {/* Layout para desktop (4 itens em linha) */}
      <div className="hidden md:flex flex-row justify-center gap-6">
        {cardsData.map((card, index) => renderCard(card, index))}
      </div>
    </>
  );
};

export {
  CommunityBadges,
  type ICommunityBadgesProps
};