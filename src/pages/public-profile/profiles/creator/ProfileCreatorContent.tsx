// src/pages/public-profile/profiles/creator/ProfileCreatorContent.tsx
import React, { useState } from 'react';
import { ExternalServicesManageApi, MissionType } from '@/pages/account/home/settings-sidebar';
import { HealthMissionsDashboard } from '../default/blocks/CommunityBadges2';
import { RoadMissionsDashboard } from '../default/blocks/CommunityBadges3';
import { KeenIcon } from '@/components';

// Define os tipos de temas para melhor clareza
type MissionTheme = 'mentalHealth' | 'workSafety' | 'sleepWellbeing';

const ProfileCreatorContent: React.FC = () => {
  // Estado para controlar o tema da missão selecionado
  const [selectedTheme, setSelectedTheme] = useState<MissionTheme>('mentalHealth');

  const missionsData = {
    mentalHealth: {
      type: MissionType.WATCH_HEALTH_VIDEO, // Missão de Saúde Mental é um vídeo
      title: "Pílulas Oris: Vídeo - Entendendo e Gerenciando o Estresse",
      videoUrl: "https://www.youtube.com/watch?v=MvsAesQ-4zA",
      quizQuestions: undefined, // Explicitamente undefined
      habitTask: undefined,     // Explicitamente undefined
    },
    workSafety: {
      type: MissionType.ANSWER_HEALTH_QUIZ, // Missão de Segurança do Trabalho é um quiz
      title: "Pílulas Oris: Quiz de Prevenção de Acidentes",
      videoUrl: undefined,      // Explicitamente undefined
      quizQuestions: [
        {
          question: 'Qual o primeiro passo ao identificar um risco de incêndio no escritório?',
          options: ['Tentar apagar o fogo sozinho', 'Acionar o alarme de incêndio e evacuar', 'Procurar seu supervisor', 'Abrir as janelas'],
          correctAnswer: 'Acionar o alarme de incêndio e evacuar',
        },
        {
          question: 'Por que é importante manter as rotas de fuga desobstruídas?',
          options: ['Para facilitar a limpeza', 'Para estética do ambiente', 'Para garantir a evacuação rápida em emergências', 'É uma regra sem motivo específico'],
          correctAnswer: 'Para garantir a evacuação rápida em emergências',
        },
      ],
      habitTask: undefined,     // Explicitamente undefined
    },
    sleepWellbeing: {
      type: MissionType.LOG_HEALTHY_HABIT, // Missão de Sono e Bem-estar é um hábito
      title: "Pílulas Oris: Registre sua Rotina de Relaxamento Noturno",
      videoUrl: undefined,      // Explicitamente undefined
      quizQuestions: undefined, // Explicitamente undefined
      habitTask: "Dedicar 15 minutos para uma atividade relaxante antes de dormir (leitura, meditação, etc.).",
    },
  };

  // Obtém as props da missão atual com base no tema selecionado
  const currentMissionProps = missionsData[selectedTheme];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 w-full overflow-x-hidden">
      <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-7.5 max-w-6xl mx-auto">

          {/* Coluna 1: Select de Tema e a Missão Ativa */}
          <div className="col-span-1 flex flex-col space-y-4 sm:space-y-6">
            {/* Select para escolher o Tema da missão */}
            <div className="card rounded-2xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700 p-6">
              <label htmlFor="theme-select" className="block text-base font-semibold text-gray-900 dark:text-white mb-3">
                Escolha a Missão do Dia por Tema:
              </label>
              <select
                id="theme-select"
                value={selectedTheme}
                onChange={(e) => setSelectedTheme(e.target.value as MissionTheme)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="mentalHealth">1. Saúde Mental</option>
                <option value="workSafety">2. Segurança do Trabalho</option>
                <option value="sleepWellbeing">3. Qualidade de Sono e Bem-estar</option>
              </select>
            </div>

            {/* Renderiza a Missão selecionada dinamicamente com base no tema */}
            <ExternalServicesManageApi
              title={currentMissionProps.title}
              show={true}
              // Passamos todas as props, e como elas são opcionais em IExternalServicesManageApiProps,
              // o TypeScript não reclama se algumas são undefined para um tipo específico.
              videoUrl={currentMissionProps.videoUrl}
              missionType={currentMissionProps.type}
              quizQuestions={currentMissionProps.quizQuestions}
              habitTask={currentMissionProps.habitTask}
            />
          </div>

          {/* Colunas 2-3: Dashboards de Missões (não alteradas) */}
          <div className="col-span-1 lg:col-span-2 flex flex-col space-y-4 sm:space-y-6 lg:space-y-8">
            <RoadMissionsDashboard title="Missões da trilha atual" />
            <HealthMissionsDashboard title="Missões de Saúde e Bem-estar" />
          </div>
        </div>

        {/* Seção de estatísticas adicional para mobile (não alterada) */}
        <div className="mt-4 lg:hidden px-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-3 w-full">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 text-center">
              <KeenIcon icon="chart-line-up" className="w-4 h-4 inline-block mr-2 text-green-600" />
              Resumo Semanal
            </h3>
            <div className="flex justify-around text-center w-full">
              <div className="flex-1">
                <div className="text-base font-bold text-green-600 dark:text-green-400">28</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Pílulas</div>
              </div>
              <div className="flex-1">
                <div className="text-base font-bold text-blue-600 dark:text-blue-400">12</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Missões</div>
              </div>
              <div className="flex-1">
                <div className="text-base font-bold text-purple-600 dark:text-purple-400">850</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Pontos</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ProfileCreatorContent };