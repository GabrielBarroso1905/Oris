// src/pages/account/home/settings-sidebar/blocks/HealthMissionsDashboard.tsx
import React, { useMemo, useState, useEffect } from 'react'
import { KeenIcon } from '@/components'
import { CommonHexagonBadge } from '@/partials/common'

interface IMission {
  title: string
  stroke: string
  fill: string
  icon: string
  iconColor: string
  description: string
  type: 'form' | 'video' | 'reading'
  link: string
  duration: string
  category: 'sono' | 'ergonomia' | 'mental' | 'fisica'
  points: number
  difficulty: 'fácil' | 'médio' | 'difícil'
}

interface HealthMissionsProps {
  title?: string
}

const HealthMissionsDashboard: React.FC<HealthMissionsProps> = ({ title }) => {
  const [selectedMission, setSelectedMission] = useState<IMission | null>(null)
  const [completed, setCompleted] = useState<string[]>([])
  const [countdown, setCountdown] = useState<number>(0)
  const [canConfirm, setCanConfirm] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('todas')

  const missions = useMemo<IMission[]>(() => [
    { 
      title: 'Diário de Sono', 
      stroke: 'stroke-purple-600', 
      fill: 'fill-purple-200', 
      icon: 'ki-solid ki-moon', 
      iconColor: 'text-purple-600', 
      description: 'Registre seu ciclo de sono diário para melhorar a qualidade do descanso e identificar padrões', 
      type: 'form', 
      link: 'https://example.com/diario-sono', 
      duration: '5 minutos',
      category: 'sono',
      points: 15,
      difficulty: 'fácil'
    },
    { 
      title: 'Higiene do Sono', 
      stroke: 'stroke-purple-400', 
      fill: 'fill-purple-100', 
      icon: 'ki-solid ki-book-open', 
      iconColor: 'text-purple-400', 
      description: 'Aprenda práticas essenciais de higiene do sono para um descanso mais reparador', 
      type: 'reading', 
      link: 'https://example.com/artigo-higiene-sono', 
      duration: '8 minutos',
      category: 'sono',
      points: 20,
      difficulty: 'médio'
    },
    { 
      title: 'Postura Correta', 
      stroke: 'stroke-green-600', 
      fill: 'fill-green-200', 
      icon: 'ki-solid ki-laptop', 
      iconColor: 'text-green-600', 
      description: 'Guia completo de ergonomia para prevenir dores corporais no trabalho', 
      type: 'reading', 
      link: 'https://example.com/ergonomia-guia', 
      duration: '6 minutos',
      category: 'ergonomia',
      points: 18,
      difficulty: 'médio'
    },
    { 
      title: 'Avaliação Postural', 
      stroke: 'stroke-green-400', 
      fill: 'fill-green-100', 
     icon: 'ki-solid ki-heart', 
      iconColor: 'text-green-400', 
      description: 'Teste rápido para avaliar sua postura atual e receber dicas personalizadas', 
      type: 'form', 
      link: 'https://example.com/teste-postura', 
      duration: '4 minutos',
      category: 'ergonomia',
      points: 12,
      difficulty: 'fácil'
    },
    { 
      title: 'Mindfulness Diário', 
      stroke: 'stroke-blue-600', 
      fill: 'fill-blue-200', 
       icon: 'ki-solid ki-heart', 
      iconColor: 'text-blue-600', 
      description: 'Sessão guiada de mindfulness para reduzir o estresse e aumentar o foco', 
      type: 'video', 
      link: 'https://youtu.be/example-mindfulness', 
      duration: '10 minutos',
      category: 'mental',
      points: 25,
      difficulty: 'médio'
    },
    { 
      title: 'Saúde Mental', 
      stroke: 'stroke-red-600', 
      fill: 'fill-red-200', 
      icon: 'ki-solid ki-heart', 
      iconColor: 'text-red-600', 
      description: 'Artigo sobre cuidados essenciais com saúde mental no ambiente de trabalho', 
      type: 'reading', 
      link: 'https://example.com/artigo-saude-mental', 
      duration: '7 minutos',
      category: 'mental',
      points: 22,
      difficulty: 'médio'
    },
    { 
      title: 'Exercícios Rápidos', 
      stroke: 'stroke-orange-600', 
      fill: 'fill-orange-200', 
       icon: 'ki-solid ki-heart', 
      iconColor: 'text-orange-600', 
      description: 'Rotina de exercícios de 5 minutos para fazer durante o expediente', 
      type: 'video', 
      link: 'https://youtu.be/example-exercicios', 
      duration: '5 minutos',
      category: 'fisica',
      points: 15,
      difficulty: 'fácil'
    },
    { 
      title: 'Alongamento Preventivo', 
      stroke: 'stroke-orange-400', 
      fill: 'fill-orange-100', 
     icon: 'ki-solid ki-heart', 
      iconColor: 'text-orange-400', 
      description: 'Sequência de alongamentos para prevenir tensões musculares', 
      type: 'form', 
      link: 'https://example.com/alongamento-form', 
      duration: '3 minutos',
      category: 'fisica',
      points: 10,
      difficulty: 'fácil'
    }
  ], [])

  const categories = {
    todas: { label: 'Todas', icon: 'ki-solid ki-grid', color: 'text-gray-600' },
    sono: { label: 'Sono', icon: 'ki-solid ki-moon', color: 'text-purple-600' },
    ergonomia: { label: 'Ergonomia', icon: 'ki-solid ki-laptop', color: 'text-green-600' },
    mental: { label: 'Mental', icon: 'ki-solid ki-heart', color: 'text-blue-600' },
    fisica: { label: 'Física', icon: 'ki-solid ki-dumbbell', color: 'text-orange-600' }
  }

  const filteredMissions = selectedCategory === 'todas' 
    ? missions 
    : missions.filter(m => m.category === selectedCategory)

  const completedCount = completed.length
  const totalPoints = completed.reduce((sum, title) => {
    const mission = missions.find(m => m.title === title)
    return sum + (mission?.points || 0)
  }, 0)

  const isDone = (t: string) => completed.includes(t)
  const markDone = (t: string) => {
    setCompleted(prev => [...prev, t])
    setSelectedMission(null)
  }

  useEffect(() => {
    if (!selectedMission) return
    const mins = parseInt(selectedMission.duration)
    let secs = mins * 60
    setCountdown(secs)
    setCanConfirm(false)
    
    const interval = setInterval(() => {
      secs -= 1
      setCountdown(secs)
      if (secs <= 0) {
        clearInterval(interval)
        setCanConfirm(true)
      }
    }, 1000)
    
    return () => clearInterval(interval)
  }, [selectedMission])

  const handleConfirm = () => {
    if (selectedMission && canConfirm && !isDone(selectedMission.title)) {
      markDone(selectedMission.title)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'fácil': return 'text-green-600 bg-green-50'
      case 'médio': return 'text-yellow-600 bg-yellow-50'
      case 'difícil': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const renderCard = (m: IMission) => (
    <div
      key={m.title}
      className="relative flex-shrink-0 w-32 sm:w-36 p-3 cursor-pointer group"
      onClick={() => setSelectedMission(m)}
    >
      <div className="flex flex-col items-center">
        <div className="relative">
          <CommonHexagonBadge
            stroke={m.stroke}
            fill={m.fill}
            size="size-[70px] sm:size-[80px]"
            badge={<KeenIcon icon={m.icon} className={`${m.iconColor} text-lg sm:text-xl`} />}
          />
          {isDone(m.title) && (
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <KeenIcon icon="ki-solid ki-check" className="text-white text-xs" />
            </div>
          )}
        </div>
        
        <div className="mt-2 text-center">
          <p className="text-xs sm:text-sm font-medium text-gray-800 dark:text-white leading-tight">
            {m.title}
          </p>
          <div className="flex items-center justify-center gap-1 mt-1">
            <span className={`text-xs px-2 py-0.5 rounded-full ${getDifficultyColor(m.difficulty)}`}>
              {m.difficulty}
            </span>
          </div>
          <div className="flex items-center justify-center gap-1 mt-1">
            <KeenIcon icon="ki-solid ki-capsule" className="text-yellow-500 text-xs" />
            <span className="text-xs text-gray-600 dark:text-gray-400">{m.points}pts</span>
          </div>
        </div>
      </div>
    </div>
  )

  const renderModal = () => {
    if (!selectedMission) return null
    const m = selectedMission
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-start gap-4 mb-4">
              <CommonHexagonBadge
                stroke={m.stroke}
                fill={m.fill}
                size="size-[60px]"
                badge={<KeenIcon icon={m.icon} className={`${m.iconColor} text-lg`} />}
              />
              <div className="flex-1">
                <h2 className="text-lg font-bold mb-2 text-gray-800 dark:text-white">{m.title}</h2>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(m.difficulty)}`}>
                    {m.difficulty}
                  </span>
                  <span className="text-xs text-gray-500">
                    <KeenIcon icon="ki-solid ki-clock" className="inline mr-1" />
                    {m.duration}
                  </span>
                  <span className="text-xs text-yellow-600">
                    <KeenIcon icon="ki-solid ki-capsule" className="inline mr-1" />
                    {m.points} Pílulas Oris
                  </span>
                </div>
              </div>
            </div>
            
            <p className="text-sm mb-6 text-gray-600 dark:text-gray-300 leading-relaxed">
              {m.description}
            </p>
            
            {m.type === 'video' && (
              <div className="mb-6">
                <iframe
                  title={m.title}
                  className="w-full h-48 rounded-lg"
                  src={`${m.link}?controls=1&rel=0&showinfo=0&modestbranding=1`}
                  allow="autoplay; encrypted-media"
                />
              </div>
            )}
            
            {(m.type === 'reading' || m.type === 'form') && (
              <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <a
                  href={m.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                >
                  <KeenIcon icon="ki-solid ki-external-link" />
                  {m.type === 'reading' ? 'Abrir artigo' : 'Iniciar atividade'}
                  <span className="text-sm text-gray-500">({m.duration})</span>
                </a>
              </div>
            )}
            
            {!canConfirm && countdown > 0 && (
              <div className="mb-6 text-center">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-full p-4 mb-2">
                  <KeenIcon icon="ki-solid ki-clock" className="text-2xl text-gray-500 mb-2" />
                  <p className="text-lg font-mono font-bold text-gray-700 dark:text-gray-200">
                    {formatTime(countdown)}
                  </p>
                </div>
                <p className="text-xs text-gray-500">
                  Complete a atividade para poder confirmar
                </p>
              </div>
            )}
          </div>
          
          <div className="flex gap-3 p-6 pt-0">
            <button
              onClick={() => setSelectedMission(null)}
              className="flex-1 px-4 py-2 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              Fechar
            </button>
            <button
              onClick={handleConfirm}
              disabled={!canConfirm || isDone(m.title)}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${
                isDone(m.title)
                  ? 'bg-green-100 text-green-700 cursor-default'
                  : canConfirm
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isDone(m.title) ? (
                <>
                  <KeenIcon icon="ki-solid ki-check" className="inline mr-1" />
                  Concluído
                </>
              ) : (
                'Concluir Missão'
              )}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="health-missions-container">
      {title && (
        <div className="px-4 pt-6 pb-2">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">
              {title}
            </h1>
            <div className="text-right">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {completedCount}/{missions.length} concluídas
              </div>
              <div className="text-lg font-bold text-blue-600">
                {totalPoints} Pílulas Oris
              </div>
            </div>
          </div>
          
          {/* Filtros por categoria */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {Object.entries(categories).map(([key, cat]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium whitespace-nowrap transition ${
                  selectedCategory === key
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                    : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <KeenIcon icon={cat.icon} className={`text-sm ${selectedCategory === key ? 'text-blue-700 dark:text-blue-300' : cat.color}`} />
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      )}
      
      <div className="px-4 pb-6">
        <div className="flex overflow-x-auto gap-2 py-2 scrollbar-hide">
          {filteredMissions.map(renderCard)}
        </div>
      </div>
      
      {renderModal()}
    </div>
  )
}

export { HealthMissionsDashboard, type HealthMissionsProps }