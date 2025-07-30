// src/pages/account/home/settings-sidebar/blocks/ExternalServicesManageApi.tsx
import React, { Fragment, useState, useRef, useEffect } from 'react';
import { KeenIcon } from '@/components';
import { toAbsoluteUrl } from '@/utils';
import ReactPlayer from 'react-player';

// --- Enum para Tipos de Missão (mantido como está) ---
export enum MissionType {
  WATCH_HEALTH_VIDEO = 'WATCH_HEALTH_VIDEO',
  ANSWER_HEALTH_QUIZ = 'ANSWER_HEALTH_QUIZ',
  LOG_HEALTHY_HABIT = 'LOG_HEALTHY_HABIT',
}

interface IExternalServicesManageApiProps {
  title: string;
  show: boolean;
  videoUrl?: string; // Opcional, usado apenas para a missão de vídeo
  missionType: MissionType; // Prop para indicar o tipo de interação (vídeo, quiz, hábito)
  quizQuestions?: { question: string; options: string[]; correctAnswer: string }[]; // Para a missão de quiz
  habitTask?: string; // Para a missão de hábito
}

const pillAvailable = true; // Mantido, se "pílulas" for a moeda de gamificação

/**
 * Card "Pontuação do Dia" que renderiza diferentes missões focadas na saúde.
 */
const ExternalServicesManageApi: React.FC<IExternalServicesManageApiProps> = ({
  title,
  show: showSwitch,
  videoUrl,
  missionType,
  quizQuestions,
  habitTask,
}) => {
  const playerRef = useRef<ReactPlayer>(null);
  const [isMissionModalOpen, setIsMissionModalOpen] = useState(false);
  const [hasCompletedMission, setHasCompletedMission] = useState(false);
  const [dailyScore, setDailyScore] = useState<number | null>(null);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  // Estados específicos para a missão de vídeo
  const [watchProgress, setWatchProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  // Estados específicos para a missão de quiz
  const [currentQuizQuestionIndex, setCurrentQuizQuestionIndex] = useState(0);
  const [quizAttempted, setQuizAttempted] = useState(false);
  const [quizCorrect, setQuizCorrect] = useState(false);
  // Estados específicos para a missão de hábito
  const [habitLogged, setHabitLogged] = useState(false);

  const openMissionModal = () => setIsMissionModalOpen(true);
  const closeMissionModal = () => {
    setIsMissionModalOpen(false);
    setIsPlaying(false); // Garante que o vídeo pare ao fechar
    // Resetar estados das missões ao fechar o modal
    setWatchProgress(0);
    setCurrentQuizQuestionIndex(0);
    setQuizAttempted(false);
    setQuizCorrect(false);
    setHabitLogged(false);
  };

  const openInfoModal = () => setIsInfoModalOpen(true);
  const closeInfoModal = () => setIsInfoModalOpen(false);

  // --- Funções Auxiliares para Missão de Vídeo ---
  const handleVideoEnd = () => {
    setHasCompletedMission(true);
    setWatchProgress(100);
  };

  const handleVideoProgress = (progress: { played: number }) => {
    const progressPercent = Math.round(progress.played * 100);
    setWatchProgress(progressPercent);
    if (progressPercent >= 90) { // Considera assistido se chegou a 90% do vídeo
      setHasCompletedMission(true);
    }
  };

  // --- Funções Auxiliares para Missão de Quiz ---
  const handleAnswerQuiz = (selectedAnswer: string) => {
    if (!quizQuestions || quizQuestions.length === 0) return;

    setQuizAttempted(true);
    if (selectedAnswer === quizQuestions[currentQuizQuestionIndex].correctAnswer) {
      setQuizCorrect(true);
      setHasCompletedMission(true);
    } else {
      setQuizCorrect(false); // Permite tentar novamente ou mostra que errou
      // Poderia adicionar lógica para avançar para a próxima pergunta se houver várias
    }
  };

  // --- Funções Auxiliares para Missão de Hábito Saudável ---
  const handleLogHabit = () => {
    setHabitLogged(true);
    setHasCompletedMission(true);
  };

  // Lógica para coletar pontos (comum a todas as missões)
  const collectScore = () => {
    const score = Math.floor(Math.random() * 91) + 10; // Pontuação de 10 a 100
    setDailyScore(score);

    // TODO: Implementar salvamento real em localStorage ou API
    const savedData = {
      score,
      date: new Date().toDateString(),
      missionCompleted: true,
      missionType,
      // Poderia adicionar 'theme' aqui também se for relevante para o salvamento
    };
    console.log('Pontuação salva:', savedData);
    closeMissionModal();
  };

  const handleButtonClick = () => {
    if (!hasCompletedMission && dailyScore === null) {
      openMissionModal();
    } else if (hasCompletedMission && dailyScore === null) {
      collectScore();
    }
  };

  // useEffect para carregar o estado da missão do dia (simulado)
  useEffect(() => {
    const today = new Date().toDateString();
    // Simular carregamento de dados salvos para a missão do dia
    // const savedData = localStorage.getItem(`dailyMission_${missionType}_${theme}`); // Se você salvar por tema e tipo
    // if (savedData) {
    //   const data = JSON.parse(savedData);
    //   if (data.date === today && data.missionType === missionType) { // && data.theme === theme
    //     setDailyScore(data.score);
    //     setHasCompletedMission(data.missionCompleted);
    //   }
    // }
  }, [missionType]); // Depende do tipo de missão para carregar o estado correto

  const getScoreColor = () => {
    if (!dailyScore) return '#999';
    if (dailyScore >= 80) return '#10b981'; // green
    if (dailyScore >= 60) return '#f59e0b'; // yellow
    return '#ef4444'; // red
  };

  const getScoreLabel = () => {
    if (!dailyScore) return 'Pendente';
    if (dailyScore >= 80) return 'Excelente!';
    if (dailyScore >= 60) return 'Bom!';
    return 'Pode melhorar';
  };

  // --- Renderização condicional das Missões ---
  const renderMissionContent = () => {
    let displayTitle = title;
    // Remove o prefixo "Pílulas Oris: Tipo - " para exibir um título mais limpo no modal
    if (title.startsWith("Pílulas Oris: Vídeo - ")) {
      displayTitle = title.replace("Pílulas Oris: Vídeo - ", "");
    } else if (title.startsWith("Pílulas Oris: Quiz - ")) {
      displayTitle = title.replace("Pílulas Oris: Quiz - ", "");
    } else if (title.startsWith("Pílulas Oris: Registre sua Rotina de ")) {
        displayTitle = title.replace("Pílulas Oris: Registre sua Rotina de ", "Sua Rotina de "); // Pequeno ajuste para o hábito
    }


    switch (missionType) {
      case MissionType.WATCH_HEALTH_VIDEO:
        return (
          <>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Assista ao vídeo completo sobre **{displayTitle}** para coletar suas pílulas do dia!
            </p>
            <div className="relative bg-black rounded-lg overflow-hidden">
              <ReactPlayer
                ref={playerRef}
                url={videoUrl}
                controls={false}
                playing={isPlaying}
                width="100%"
                height="240px"
                config={{
                  youtube: {
                    playerVars: { controls: 0, modestbranding: 1, rel: 0, showinfo: 0, disablekb: 1 },
                  },
                }}
                onReady={() => setVideoReady(true)}
                onProgress={handleVideoProgress}
                onEnded={handleVideoEnd}
              />
            </div>
            <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Progresso do Vídeo
                </span>
                <span className={`text-sm font-bold ${hasCompletedMission ? 'text-green-600' : 'text-gray-500'}`}>
                  {hasCompletedMission ? 'Completo!' : `${watchProgress}%`}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${hasCompletedMission ? 'bg-green-500' : 'bg-blue-500'}`}
                  style={{ width: `${watchProgress}%` }}
                />
              </div>
            </div>
            <button
              disabled={!hasCompletedMission || dailyScore !== null}
              onClick={handleButtonClick}
              className={`w-full px-4 py-3 rounded-lg font-medium transition flex items-center justify-center gap-2 mt-6 ${hasCompletedMission && dailyScore === null
                ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
            >
              <KeenIcon icon="ki-solid ki-capsule" />
              {hasCompletedMission ? 'Coletar Pílulas!' : `Assista o vídeo (${watchProgress}%)`}
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-full mt-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition"
            >
              {isPlaying ? 'Pausar' : 'Reproduzir'} Vídeo
            </button>
          </>
        );

      case MissionType.ANSWER_HEALTH_QUIZ:
        const currentQuestion = quizQuestions?.[currentQuizQuestionIndex];
        return (
          <>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Responda a esta pergunta sobre **{displayTitle}** para coletar suas pílulas!
            </p>
            {currentQuestion ? (
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-4">
                <h3 className="font-semibold text-gray-800 dark:text-white mb-3">
                  {currentQuizQuestionIndex + 1}. {currentQuestion.question}
                </h3>
                <div className="space-y-2">
                  {currentQuestion.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerQuiz(option)}
                      disabled={quizAttempted}
                      className={`w-full text-left p-3 rounded-lg border transition ${quizAttempted
                        ? (option === currentQuestion.correctAnswer
                          ? 'bg-green-100 border-green-400 text-green-800'
                          : (quizCorrect ? 'bg-gray-100 border-gray-300 text-gray-700' : 'bg-red-100 border-red-400 text-red-800'))
                        : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-900 dark:text-white'
                        }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                {quizAttempted && (
                  <p className={`mt-3 text-sm font-medium ${quizCorrect ? 'text-green-600' : 'text-red-600'}`}>
                    {quizCorrect ? 'Resposta Correta!' : `Resposta Incorreta. A correta era: ${currentQuestion.correctAnswer}`}
                  </p>
                )}
              </div>
            ) : (
              <p className="text-red-500">Nenhuma pergunta de quiz disponível.</p>
            )}
            <button
              disabled={!hasCompletedMission || dailyScore !== null}
              onClick={handleButtonClick}
              className={`w-full px-4 py-3 rounded-lg font-medium transition flex items-center justify-center gap-2 mt-6 ${hasCompletedMission && dailyScore === null
                ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
            >
              <KeenIcon icon="ki-solid ki-capsule" />
              {hasCompletedMission ? 'Coletar Pílulas!' : 'Responder Quiz'}
            </button>
          </>
        );

      case MissionType.LOG_HEALTHY_HABIT:
        return (
          <>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Marque como concluído o hábito de hoje: **{habitTask || 'Registrar um Hábito Saudável'}**.
            </p>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center">
              <p className="text-lg font-bold text-gray-800 dark:text-white mb-4">
                {habitTask || 'Hábito Saudável do Dia'}
              </p>
              <button
                onClick={handleLogHabit}
                disabled={habitLogged || dailyScore !== null}
                className={`px-6 py-3 rounded-lg font-medium transition flex items-center justify-center gap-2 mx-auto ${habitLogged
                  ? 'bg-green-100 text-green-700 cursor-default'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                  }`}
              >
                <KeenIcon icon="ki-solid ki-check" />
                {habitLogged ? 'Hábito Registrado!' : 'Concluir Hábito'}
              </button>
              {habitLogged && (
                <p className="mt-3 text-sm text-green-600">
                  Parabéns! Hábito registrado com sucesso.
                </p>
              )}
            </div>
            <button
              disabled={!hasCompletedMission || dailyScore !== null}
              onClick={handleButtonClick}
              className={`w-full px-4 py-3 rounded-lg font-medium transition flex items-center justify-center gap-2 mt-6 ${hasCompletedMission && dailyScore === null
                ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
            >
              <KeenIcon icon="ki-solid ki-capsule" />
              {hasCompletedMission ? 'Coletar Pílulas!' : 'Coletar Pílulas (Conclua o hábito primeiro)'}
            </button>
          </>
        );
      default:
        return <p className="text-red-500">Tipo de missão desconhecido.</p>;
    }
  };

  return (
    <Fragment>
      {/* Modal de Informação das Pílulas Oris */}
      {isInfoModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <KeenIcon icon="ki-solid ki-capsule" className="text-white text-2xl" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Sobre as Pílulas Oris
              </h2>
            </div>

            <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
              <p>
                As **Pílulas Oris** são um sistema gamificado de pontuação que reconhece
                seu engajamento e aprendizado na plataforma de saúde.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Como funciona:</h3>
                <ul className="space-y-1 text-xs">
                  <li>• Complete missões diárias de saúde</li>
                  <li>• Ganhe pontos (pílulas) baseados no seu engajamento</li>
                  <li>• Suba no ranking e seja reconhecido por sua jornada de bem-estar</li>
                  <li>• Concorra a prêmios e reconhecimentos por um estilo de vida saudável</li>
                </ul>
              </div>
              <p className="text-xs text-gray-500">
                Seu progresso é acompanhado diariamente e contribui para sua visibilidade interna.
              </p>
            </div>

            <button
              onClick={closeInfoModal}
              className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition font-medium"
            >
              Entendi!
            </button>
          </div>
        </div>
      )}

      {/* Modal da Missão do Dia */}
      {isMissionModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-t-2xl sm:rounded-2xl w-full sm:max-w-lg sm:w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  Missão do Dia
                </h2>
                <button
                  onClick={closeMissionModal}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition"
                >
                  <KeenIcon icon="ki-solid ki-cross" className="text-gray-500" />
                </button>
              </div>

              <div className="mb-4">
                {renderMissionContent()} {/* Renderiza o conteúdo da missão específica */}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Card Principal */}
      <div className="card rounded-2xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 w-full max-w-xl mx-auto">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="relative">
              <div className="w-16 h-16 relative">
                <img
                  src={toAbsoluteUrl('/media/icons/polygon1.svg')}
                  alt="Hexágono Pontuação"
                  className="w-full h-full"
                />
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    background: pillAvailable && dailyScore
                      ? `linear-gradient(135deg, ${getScoreColor()}, ${getScoreColor()}99)`
                      : 'transparent',
                    WebkitBackgroundClip: pillAvailable && dailyScore ? 'text' : undefined,
                    color: pillAvailable && dailyScore ? 'transparent' : '#999',
                  }}
                >
                  <span className="text-lg font-bold">
                    {dailyScore || '0'}
                  </span>
                </div>
              </div>

              {dailyScore && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <KeenIcon icon="ki-solid ki-check" className="text-white text-xs" />
                </div>
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-gray-900 dark:text-white">
                  {title}
                </h3>
                {dailyScore && (
                  <span className={`text-xs px-2 py-1 rounded-full text-white`}
                    style={{ backgroundColor: getScoreColor() }}>
                    {getScoreLabel()}
                  </span>
                )}
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Complete a missão diária para ganhar pílulas de saúde.{' '}
                <button
                  onClick={openInfoModal}
                  className="text-blue-600 hover:text-blue-700 hover:underline font-medium"
                >
                  Saiba mais
                </button>
              </p>

              {dailyScore && (
                <div className="text-xs text-gray-500">
                  Missão concluída hoje • {dailyScore} pílulas coletadas
                </div>
              )}
            </div>
          </div>
        </div>

        <button
          disabled={!showSwitch || dailyScore !== null}
          onClick={handleButtonClick}
          className={`w-full flex items-center justify-center gap-2 px-4 py-4 transition-all duration-200 font-medium ${!showSwitch
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
            : dailyScore !== null
              ? 'bg-green-100 text-green-700 cursor-default'
              : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
            }`}
        >
          <KeenIcon
            icon={dailyScore ? "ki-solid ki-check" : "ki-solid ki-capsule"}
            className={dailyScore ? "text-green-600" : "text-current"}
          />
          <span>
            {!showSwitch
              ? 'Indisponível'
              : dailyScore !== null
                ? 'Missão Concluída'
                : 'Fazer Missão do Dia'}
          </span>
        </button>
      </div>
    </Fragment>
  );
};

export { ExternalServicesManageApi, type IExternalServicesManageApiProps };