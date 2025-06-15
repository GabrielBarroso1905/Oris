// src/pages/account/home/settings-sidebar/blocks/ExternalServicesManageApi.tsx
import React, { Fragment, useState, useRef, useEffect } from 'react'
import { KeenIcon } from '@/components'
import { toAbsoluteUrl } from '@/utils'
import ReactPlayer from 'react-player'

interface IExternalServicesManageApiProps {
  title: string
  show: boolean
  videoUrl: string
}

const pillAvailable = true

/**
 * Card "Pontuação do Dia" onde missão é assistir vídeo até o fim para coletar pontos.
 */
const ExternalServicesManageApi: React.FC<IExternalServicesManageApiProps> = ({
  title,
  show: showSwitch,
  videoUrl,
}) => {
  const playerRef = useRef<ReactPlayer>(null)
  const [isMissionModalOpen, setIsMissionModalOpen] = useState(false)
  const [hasWatched, setHasWatched] = useState(false)
  const [dailyScore, setDailyScore] = useState<number | null>(null)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [watchProgress, setWatchProgress] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [videoReady, setVideoReady] = useState(false)

  const openMissionModal = () => setIsMissionModalOpen(true)
  const closeMissionModal = () => {
    setIsMissionModalOpen(false)
    setIsPlaying(false)
  }

  const openInfoModal = () => setIsInfoModalOpen(true)
  const closeInfoModal = () => setIsInfoModalOpen(false)

  const handleVideoEnd = () => {
    setHasWatched(true)
    setWatchProgress(100)
  }

  const handleProgress = (progress: { played: number }) => {
    const progressPercent = Math.round(progress.played * 100)
    setWatchProgress(progressPercent)

    // Considera assistido se chegou a 90% do vídeo
    if (progressPercent >= 90) {
      setHasWatched(true)
    }
  }

  const collectScore = () => {
    const score = Math.floor(Math.random() * 91) + 10
    setDailyScore(score)

    // Salvar no localStorage simulado
    const savedData = {
      score,
      date: new Date().toDateString(),
      videoCompleted: true
    }
    console.log('Pontuação salva:', savedData)
  }

  const handleButtonClick = () => {
    if (!hasWatched && dailyScore === null) {
      openMissionModal()
    } else if (hasWatched && dailyScore === null) {
      collectScore()
      closeMissionModal()
    }
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  // Verifica se já coletou pontos hoje
  useEffect(() => {
    // Simular verificação de dados salvos
    const today = new Date().toDateString()
    // const savedData = localStorage.getItem('dailyMission')
    // if (savedData) {
    //   const data = JSON.parse(savedData)
    //   if (data.date === today) {
    //     setDailyScore(data.score)
    //     setHasWatched(data.videoCompleted)
    //   }
    // }
  }, [])

  const getScoreColor = () => {
    if (!dailyScore) return '#999'
    if (dailyScore >= 80) return '#10b981' // green
    if (dailyScore >= 60) return '#f59e0b' // yellow
    return '#ef4444' // red
  }

  const getScoreLabel = () => {
    if (!dailyScore) return 'Pendente'
    if (dailyScore >= 80) return 'Excelente!'
    if (dailyScore >= 60) return 'Bom!'
    return 'Pode melhorar'
  }

  return (
    <Fragment>
      {/* Modal de Informação das Pílulas Oris */}
      {isInfoModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl">
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
              As <strong>Pílulas Oris</strong> são um sistema gamificado de pontuação que reconhece
              seu engajamento e aprendizado na plataforma.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Como funciona:</h3>
              <ul className="space-y-1 text-xs">
                <li>• Complete missões diárias assistindo vídeos</li>
                <li>• Ganhe pontos baseados no seu engajamento</li>
                <li>• Suba no ranking de colaboradores</li>
                <li>• Concorra a prêmios e reconhecimentos</li>
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

      {/* Modal de Missão (Vídeo) */}
      {isMissionModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">          <div className="bg-white dark:bg-gray-800 rounded-t-2xl sm:rounded-2xl w-full sm:max-w-lg sm:w-full max-h-[90vh] overflow-y-auto">
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
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Assista ao vídeo completo para coletar suas pílulas do dia!
              </p>

              {/* Player de vídeo customizado */}
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
                      playerVars: {
                        controls: 0,
                        modestbranding: 1,
                        rel: 0,
                        showinfo: 0,
                        disablekb: 1,
                      },
                    },
                  }}
                  onReady={() => setVideoReady(true)}
                  onProgress={handleProgress}
                  onEnded={handleVideoEnd}
                />
              </div>

              {/* Indicador de progresso */}
              <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Progresso da Missão
                  </span>
                  <span className={`text-sm font-bold ${hasWatched ? 'text-green-600' : 'text-gray-500'}`}>
                    {hasWatched ? 'Completo!' : `${watchProgress}%`}
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${hasWatched ? 'bg-green-500' : 'bg-blue-500'
                      }`}
                    style={{ width: `${watchProgress + 6}% ` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 pb-6">
            <button
              disabled={!hasWatched}
              onClick={handleButtonClick}
              className={`w-full px-4 py-3 rounded-lg font-medium transition flex items-center justify-center gap-2 ${hasWatched
                ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
            >
              <KeenIcon icon="ki-solid ki-capsule" />
              {hasWatched ? 'Coletar Pílulas!' : `Continue assistindo... (${watchProgress}%)`}
            </button>
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
                Complete a missão diária para ganhar pílulas.{' '}
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
  )
}

export { ExternalServicesManageApi, type IExternalServicesManageApiProps }