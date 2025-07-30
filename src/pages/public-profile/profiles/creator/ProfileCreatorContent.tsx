// src/pages/public-profile/profiles/creator/ProfileCreatorContent.tsx
import React, { useState, useMemo, useCallback } from 'react';
import { ExternalServicesManageApi, MissionType } from '@/pages/account/home/settings-sidebar';
import { HealthMissionsDashboard } from '../default/blocks/CommunityBadges2';
// CORRIGIDO: O caminho de importação do RoadMissionsDashboard

import { KeenIcon } from '@/components';
import { RoadMissionsDashboard } from '../default/blocks/CommunityBadges3';

// Define os tipos de temas para melhor clareza
type MissionTheme = 'mentalHealth' | 'workSafety' | 'sleepWellbeing';

// Interface para as missões da trilha, para tipar corretamente os dados
interface IRoadMission {
  title: string;
  stroke: string;
  fill: string;
  icon: string;
  iconColor: string;
  description: string;
  type: 'form' | 'video' | 'reading';
  link: string;
  duration: string;
  order: number;
  prerequisite?: number;
  points: number;
  level: 'iniciante' | 'intermediário' | 'avançado';
}

const ProfileCreatorContent: React.FC = () => {
  // Estado para controlar o tema da missão selecionado
  const [selectedTheme, setSelectedTheme] = useState<MissionTheme>('mentalHealth');

  // NOVO ESTADO: Total de Pílulas (pontos) acumuladas
  // Inicializado com o valor exibido no resumo semanal
  const [totalPills, setTotalPills] = useState<number>(850);
  // NOVO ESTADO: Total de Missões concluídas
  // Inicializado com o valor exibido no resumo semanal
  const [totalMissionsCompleted, setTotalMissionsCompleted] = useState<number>(12);

  // Estrutura de dados para as 'Missões do Dia' (ExternalServicesManageApi) - mantido como estava
  const missionsData = {
    mentalHealth: {
      type: MissionType.WATCH_HEALTH_VIDEO,
      title: "Pílulas Oris: Vídeo - Entendendo e Gerenciando o Estresse",
      videoUrl: "https://www.youtube.com/watch?v=JDcvtKsSfxg",
      quizQuestions: undefined,
      habitTask: undefined,
    },
    workSafety: {
      type: MissionType.ANSWER_HEALTH_QUIZ,
      title: "Pílulas Oris: Quiz de Prevenção de Acidentes",
      videoUrl: undefined,
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
      habitTask: undefined,
    },
    sleepWellbeing: {
      type: MissionType.LOG_HEALTHY_HABIT,
      title: "Pílulas Oris: Registre sua Rotina de Relaxamento Noturno",
      videoUrl: undefined,
      quizQuestions: undefined,
      habitTask: "Dedicar 15 minutos para uma atividade relaxante antes de dormir (leitura, meditação, etc.).",
    },
  };

  // NOVAS MISSÕES DA TRILHA POR TEMA
  const roadMissionsByTheme: Record<MissionTheme, IRoadMission[]> = {
    mentalHealth: [
      { title: 'Reconhecer Sintomas de Ansiedade', stroke: 'stroke-blue-600', fill: 'fill-blue-200', icon: 'ki-solid ki-heart', iconColor: 'text-blue-600', description: 'Aprenda a identificar sintomas de ansiedade e pânico.', type: 'reading', link: 'https://vidasaudavel.einstein.br/crise-de-ansiedade/', duration: '0,01 minutos', order: 1, points: 20, level: 'iniciante' },
      { title: 'Técnica de Respiração 4-7-8', stroke: 'stroke-purple-600', fill: 'fill-purple-200', icon: 'ki-solid ki-wind', iconColor: 'text-purple-600', description: 'Assista e pratique a técnica de respiração para acalmar a mente.', type: 'video', link: 'https://youtu.be/example-respiracao', duration: '0,01 minutos', order: 2, prerequisite: 1, points: 25, level: 'iniciante' },
      { title: 'Autoavaliação de Humor Diário', stroke: 'stroke-green-600', fill: 'fill-green-200', icon: 'ki-solid ki-check-square', iconColor: 'text-green-600', description: 'Responda um quiz rápido para avaliar seu estado emocional.', type: 'form', link: 'https://example.com/quiz-ansiedade', duration: '0,01 minutos', order: 3, prerequisite: 2, points: 30, level: 'iniciante' },
      { title: 'Reestruturação Cognitiva Básica', stroke: 'stroke-red-600', fill: 'fill-red-200', icon: 'ki-solid ki-book-open', iconColor: 'text-red-600', description: 'Leitura sobre como identificar e mudar padrões de pensamento negativos.', type: 'reading', link: 'https://example.com/tecnicas-cognitivas', duration: '0,01 minutos', order: 4, prerequisite: 3, points: 35, level: 'intermediário' },
      { title: 'Introdução ao Mindfulness', stroke: 'stroke-indigo-600', fill: 'fill-indigo-200', icon: 'ki-solid ki-video', iconColor: 'text-indigo-600', description: 'Vídeo guia para sua primeira prática de atenção plena.', type: 'video', link: 'https://youtu.be/example-mindfulness-anxiety', duration: '0,01 minutos', order: 5, prerequisite: 4, points: 40, level: 'intermediário' },
      { title: 'Plano de Bem-estar Personalizado', stroke: 'stroke-yellow-600', fill: 'fill-yellow-200', icon: 'ki-solid ki-rocket', iconColor: 'text-yellow-600', description: 'Crie um plano simples para gerenciar o estresse e a ansiedade no dia a dia.', type: 'form', link: 'https://example.com/plano-personalizado', duration: '0,01 minutos', order: 6, prerequisite: 5, points: 50, level: 'avançado' }
    ],
    workSafety: [
      { title: 'Introdução à Segurança do Trabalho', stroke: 'stroke-orange-600', fill: 'fill-orange-200', icon: 'ki-solid ki-briefcase', iconColor: 'text-orange-600', description: 'Fundamentos e importância da segurança no ambiente de trabalho.', type: 'reading', link: 'https://example.com/introducao-seguranca', duration: '5 minutos', order: 1, points: 20, level: 'iniciante' },
      { title: 'Identificação de Riscos no Escritório', stroke: 'stroke-teal-600', fill: 'fill-teal-200', icon: 'ki-solid ki-search', iconColor: 'text-teal-600', description: 'Assista a um vídeo sobre como identificar perigos comuns no local de trabalho.', type: 'video', link: 'http://googleusercontent.com/youtube.com/work_risks', duration: '7 minutos', order: 2, prerequisite: 1, points: 25, level: 'iniciante' },
      { title: 'Procedimentos de Emergência', stroke: 'stroke-red-600', fill: 'fill-red-200', icon: 'ki-solid ki-siren', iconColor: 'text-red-600', description: 'Quiz sobre o que fazer em caso de incêndio ou outras emergências.', type: 'form', link: 'https://example.com/quiz-emergencia', duration: '6 minutos', order: 3, prerequisite: 2, points: 30, level: 'iniciante' },
      { title: 'Ergonomia no Home Office', stroke: 'stroke-gray-600', fill: 'fill-gray-200', icon: 'ki-solid ki-chair', iconColor: 'text-gray-600', description: 'Dicas para montar um ambiente de trabalho confortável e seguro em casa.', type: 'reading', link: 'https://example.com/ergonomia-homeoffice', duration: '8 minutos', order: 4, prerequisite: 3, points: 35, level: 'intermediário' },
      { title: 'Primeiros Socorros Básicos', stroke: 'stroke-lime-600', fill: 'fill-lime-200', icon: 'ki-solid ki-band-aid', iconColor: 'text-lime-600', description: 'Vídeo instrutivo sobre como agir em situações de acidentes leves.', type: 'video', link: 'http://googleusercontent.com/youtube.com/first_aid', duration: '12 minutos', order: 5, prerequisite: 4, points: 40, level: 'intermediário' },
      { title: 'Relatório de Incidentes', stroke: 'stroke-pink-600', fill: 'fill-pink-200', icon: 'ki-solid ki-file-alt', iconColor: 'text-pink-600', description: 'Preencha um formulário simulado de registro de ocorrências de segurança.', type: 'form', link: 'https://example.com/relatorio-incidentes', duration: '10 minutos', order: 6, prerequisite: 5, points: 50, level: 'avançado' }
    ],
    sleepWellbeing: [
      { title: 'A Importância do Sono', stroke: 'stroke-indigo-600', fill: 'fill-indigo-200', icon: 'ki-solid ki-moon', iconColor: 'text-indigo-600', description: 'Descubra por que o sono é crucial para sua saúde física e mental.', type: 'reading', link: 'https://example.com/importancia-sono', duration: '4 minutos', order: 1, points: 20, level: 'iniciante' },
      { title: 'Rotina de Relaxamento Noturno', stroke: 'stroke-purple-600', fill: 'fill-purple-200', icon: 'ki-solid ki-book-reader', iconColor: 'text-purple-600', description: 'Vídeo com dicas para criar uma rotina antes de dormir.', type: 'video', link: 'http://googleusercontent.com/youtube.com/sleep_routine', duration: '6 minutos', order: 2, prerequisite: 1, points: 25, level: 'iniciante' },
      { title: 'Questionário de Qualidade do Sono', stroke: 'stroke-cyan-600', fill: 'fill-cyan-200', icon: 'ki-solid ki-poll', iconColor: 'text-cyan-600', description: 'Avalie a qualidade do seu sono com este formulário.', type: 'form', link: 'https://example.com/quiz-sono', duration: '7 minutos', order: 3, prerequisite: 2, points: 30, level: 'iniciante' },
      { title: 'Nutrição e Sono', stroke: 'stroke-green-600', fill: 'fill-green-200', icon: 'ki-solid ki-leaf', iconColor: 'text-green-600', description: 'Leia sobre alimentos que podem ajudar ou atrapalhar seu sono.', type: 'reading', link: 'https://example.com/nutricao-sono', duration: '9 minutos', order: 4, prerequisite: 3, points: 35, level: 'intermediário' },
      { title: 'Sons Relaxantes para Dormir', stroke: 'stroke-blue-600', fill: 'fill-blue-200', icon: 'ki-solid ki-headphones', iconColor: 'text-blue-600', description: 'Experimente sons ambientes ou música relaxante para auxiliar no sono.', type: 'video', link: 'http://googleusercontent.com/youtube.com/sleep_sounds', duration: '15 minutos', order: 5, prerequisite: 4, points: 40, level: 'intermediário' },
      { title: 'Registro de Sonhos', stroke: 'stroke-yellow-600', fill: 'fill-yellow-200', icon: 'ki-solid ki-pencil-alt', iconColor: 'text-yellow-600', description: 'Comece um diário de sonhos para entender melhor seu subconsciente.', type: 'form', link: 'https://example.com/dream-journal', duration: '10 minutos', order: 6, prerequisite: 5, points: 50, level: 'avançado' }
    ],
  };

  // Obtém as props da missão do dia atual com base no tema selecionado
  const currentDailyMissionProps = missionsData[selectedTheme];

  // Obtém a lista de missões da trilha para o tema selecionado
  const currentRoadMissions = useMemo(() => roadMissionsByTheme[selectedTheme], [selectedTheme]);

  // Callback para atualizar os pontos e missões concluídas DE TRILHA
  const handleRoadMissionCompletion = useCallback((missionPoints: number) => {
    setTotalPills(prevPoints => prevPoints + missionPoints);
    setTotalMissionsCompleted(prevCount => prevCount + 1);
  }, []);

  // NOVO CALLBACK: Para atualizar os pontos ganhos da Missão Diária
  const handleDailyMissionCompletion = useCallback((dailyMissionPoints: number) => {
    setTotalPills(prevPoints => prevPoints + dailyMissionPoints);
    setTotalMissionsCompleted(prevCount => prevCount + 1); // Contabiliza a missão diária como uma missão concluída
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 w-full overflow-x-hidden">
      <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-7.5 max-w-6xl mx-auto">

          {/* Coluna 1: Select de Tema e a Missão do Dia Ativa */}
          <div className="col-span-1 flex flex-col space-y-4 sm:space-y-6">
            {/* Select para escolher o Tema da missão */}
            <div className="card rounded-2xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700 p-6">
              <label htmlFor="theme-select" className="block text-base font-semibold text-gray-900 dark:text-white mb-3">
                Escolha o Tema do Dia:
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

            {/* Renderiza a Missão do Dia selecionada dinamicamente com base no tema */}
            <ExternalServicesManageApi
              title={currentDailyMissionProps.title}
              show={true}
              videoUrl={currentDailyMissionProps.videoUrl}
              missionType={currentDailyMissionProps.type}
              quizQuestions={currentDailyMissionProps.quizQuestions}
              habitTask={currentDailyMissionProps.habitTask}
              overallTotalPills={totalPills} // PASSA O TOTAL ACUMULADO PARA EXIBIÇÃO
              onPointsEarned={handleDailyMissionCompletion} // PASSA O NOVO CALLBACK
            />
          </div>

          {/* Colunas 2-3: Dashboards de Missões */}
          <div className="col-span-1 lg:col-span-2 flex flex-col space-y-4 sm:space-y-6 lg:space-y-8">
            {/* O RoadMissionsDashboard agora recebe a lista de missões do tema selecionado */}
            <RoadMissionsDashboard
              title={`Missões da trilha de ${selectedTheme === 'mentalHealth' ? 'Saúde Mental' : selectedTheme === 'workSafety' ? 'Segurança do Trabalho' : 'Sono e Bem-estar'}`}
              roadMissions={currentRoadMissions} // Passa as missões específicas do tema
              onMissionComplete={handleRoadMissionCompletion} // Passa o callback para atualizar os pontos
            />
            <HealthMissionsDashboard title="Missões de Saúde e Bem-estar" />
          </div>
        </div>

        {/* Seção de estatísticas adicional para mobile (ATUALIZADA) */}
        <div className="mt-4 lg:hidden px-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-3 w-full">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 text-center">
              <KeenIcon icon="chart-line-up" className="w-4 h-4 inline-block mr-2 text-green-600" />
              Resumo Semanal
            </h3>
            <div className="flex justify-around text-center w-full">
              <div className="flex-1">
                <div className="text-base font-bold text-green-600 dark:text-green-400">{totalPills}</div> {/* DYNAMIC */}
                <div className="text-xs text-gray-600 dark:text-gray-400">Pílulas</div>
              </div>
              <div className="flex-1">
                <div className="text-base font-bold text-blue-600 dark:text-blue-400">{totalMissionsCompleted}</div> {/* DYNAMIC */}
                <div className="text-xs text-gray-600 dark:text-gray-400">Missões</div>
              </div>
              <div className="flex-1">
                <div className="text-base font-bold text-purple-600 dark:text-purple-400">850</div> {/* Este valor permanece estático por enquanto, ou pode ser ajustado se houver outra fonte de pontos */}
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