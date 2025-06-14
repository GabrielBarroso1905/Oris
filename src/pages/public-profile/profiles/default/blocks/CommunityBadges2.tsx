import { KeenIcon } from '@/components';
import { CommonHexagonBadge } from '@/partials/common';
import { useMemo, useState } from 'react';

interface IMission {
  title: string;
  stroke: string;
  fill: string;
  icon: string;
  iconColor: string;
  frequency: 'semanal' | 'mensal';
  description: string;
  type: 'form' | 'video' | 'reading';
  healthBenefits?: string[];
  duration?: string;
}

interface HealthMissionsProps {
  title?: string;
}

const HealthMissionsDashboard = ({ title }: HealthMissionsProps) => {
  const [selectedMission, setSelectedMission] = useState<IMission | null>(null);
  const [completedMissions, setCompletedMissions] = useState<string[]>([]);

  const missions = useMemo<IMission[]>(() => [
     {
      title: 'Diário de Saúde',
      stroke: 'stroke-primary-clarity',
      fill: 'fill-primary-light',
      icon: 'ki-filled ki-book-open',
      iconColor: 'text-primary',
      frequency: 'semanal',
      description: 'Registre seus hábitos saudáveis da semana',
      type: 'form',
      healthBenefits: [
        'Aumenta a consciência sobre saúde',
        'Melhora a adesão a hábitos saudáveis',
        'Reduz comportamentos prejudiciais'
      ],
      duration: '15 minutos'
    },
      {
      title: 'Diário de Saúde',
      stroke: 'stroke-primary-clarity',
      fill: 'fill-primary-light',
      icon: 'ki-filled ki-book-open',
      iconColor: 'text-primary',
      frequency: 'semanal',
      description: 'Registre seus hábitos saudáveis da semana',
      type: 'form',
      healthBenefits: [
        'Aumenta a consciência sobre saúde',
        'Melhora a adesão a hábitos saudáveis',
        'Reduz comportamentos prejudiciais'
      ],
      duration: '15 minutos'
    },
      {
      title: 'Diário de Saúde',
      stroke: 'stroke-primary-clarity',
      fill: 'fill-primary-light',
      icon: 'ki-filled ki-book-open',
      iconColor: 'text-primary',
      frequency: 'semanal',
      description: 'Registre seus hábitos saudáveis da semana',
      type: 'form',
      healthBenefits: [
        'Aumenta a consciência sobre saúde',
        'Melhora a adesão a hábitos saudáveis',
        'Reduz comportamentos prejudiciais'
      ],
      duration: '15 minutos'
    },
    {
      title: 'Vídeo: Nutrição',
      stroke: 'stroke-info-clarity',
      fill: 'fill-info-light',
      icon: 'ki-filled ki-video',
      iconColor: 'text-info',
      frequency: 'mensal',
      description: 'Assista a vídeo educativo sobre alimentação saudável',
      type: 'video',
      healthBenefits: [
        'Aprenda sobre nutrição balanceada',
        'Descubra novas receitas saudáveis',
        'Entenda rótulos nutricionais'
      ],
      duration: '20 minutos'
    },
     
     {
      title: 'Vídeo: Nutrição',
      stroke: 'stroke-info-clarity',
      fill: 'fill-info-light',
      icon: 'ki-filled ki-video',
      iconColor: 'text-info',
      frequency: 'mensal',
      description: 'Assista a vídeo educativo sobre alimentação saudável',
      type: 'video',
      healthBenefits: [
        'Aprenda sobre nutrição balanceada',
        'Descubra novas receitas saudáveis',
        'Entenda rótulos nutricionais'
      ],
      duration: '20 minutos'
    },
    {
      title: 'Check-up Mensal',
      stroke: 'stroke-danger',
      fill: 'fill-danger-light',
      icon: 'ki-filled ki-clipboard',
      iconColor: 'text-danger',
      frequency: 'mensal',
      description: 'Registre medidas corporais e exames básicos',
      type: 'form',
      healthBenefits: [
        'Monitoramento preventivo',
        'Detecção precoce de problemas',
        'Acompanhamento de progresso'
      ],
      duration: '30 minutos'
    }
  ], []);

  const isMissionCompleted = (missionTitle: string) =>
    completedMissions.includes(missionTitle);

  const handleCompleteMission = (missionTitle: string) => {
    if (!isMissionCompleted(missionTitle)) {
      setCompletedMissions(prev => [...prev, missionTitle]);
    }
    setSelectedMission(null);
  };

  const renderCard = (mission: IMission) => (
    <div
      key={mission.title}
      className="relative card max-w-40 text-center cursor-pointer hover:shadow-md transition-all"
      onClick={() => setSelectedMission(mission)}
    >
      <div className="card-header justify-center">
        <h3 className="card-title">{mission.title}</h3>
      </div>
      <div className="card-body flex justify-center items-center">
        <CommonHexagonBadge
          stroke={mission.stroke}
          fill={mission.fill}
          size="size-[90px]"
          badge={
            <KeenIcon 
              icon={mission.icon}
              className={`text-5xl ps-px ${mission.iconColor} ${isMissionCompleted(mission.title) ? 'opacity-50' : ''}`} 
            />
          }
        />
      </div>
      {isMissionCompleted(mission.title) && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-green-500 text-white rounded-full p-1">
            <KeenIcon icon="ki-filled ki-check" className="text-xl" />
          </div>
        </div>
      )}
    </div>
  );

  const renderModal = () => {
    if (!selectedMission) return null;

    const { title, stroke, fill, icon, iconColor, frequency, duration, description, healthBenefits } = selectedMission;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-800">{title}</h2>
                <p className="text-sm text-gray-500 mt-1">
                  {frequency === 'semanal' ? 'Semanal' : 'Mensal'} • {duration}
                </p>
              </div>
              <button 
                onClick={() => setSelectedMission(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="flex justify-center my-4">
              <CommonHexagonBadge
                stroke={stroke}
                fill={fill}
                size="size-[120px]"
                badge={
                  <KeenIcon 
                    icon={icon} 
                    className={`text-6xl ps-px ${iconColor}`} 
                  />
                }
              />
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-800 mb-1">Descrição:</h4>
                <p className="text-gray-600">{description}</p>
              </div>

              {healthBenefits && (
                <div>
                  <h4 className="font-medium text-gray-800 mb-1">Benefícios:</h4>
                  <ul className="list-disc pl-5 text-gray-600 space-y-1">
                    {healthBenefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3">
            <button
              onClick={() => setSelectedMission(null)}
              className="px-4 py-2 text-gray-700 hover:text-gray-900"
            >
              Fechar
            </button>
            <button
              onClick={() => handleCompleteMission(title)}
              className={`px-4 py-2 rounded-lg ${
                isMissionCompleted(title) 
                  ? 'bg-green-100 text-green-700'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isMissionCompleted(title) ? 'Concluído ✓' : 'Marcar como Concluído'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderMissionSection = (frequency: 'semanal' | 'mensal') => {
    const filteredMissions = missions.filter(m => m.frequency === frequency);
    if (filteredMissions.length === 0) return null;

    return (
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 capitalize">
          Missões {frequency === 'semanal' ? 'Semanais' : 'Mensais'}
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          {filteredMissions.map(renderCard)}
        </div>
      </section>
    );
  };

  return (
    <div className="health-missions-container">
      {title && <h1 className="text-2xl font-bold text-gray-800 mb-8">{title}</h1>}
      
      {renderMissionSection('semanal')}
      {renderMissionSection('mensal')}
      
      {renderModal()}
    </div>
  );
};

export { HealthMissionsDashboard, type HealthMissionsProps };
