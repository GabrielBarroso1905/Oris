// src/pages/account/home/settings-sidebar/blocks/RoadMissionsDashboard.tsx
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
  order: number
  prerequisite?: number
  points: number
  level: 'iniciante' | 'intermediário' | 'avançado'
}

interface RoadMissionsProps {
  title?: string
}

const RoadMissionsDashboard: React.FC<RoadMissionsProps> = ({ title }) => {
  const [selectedMission, setSelectedMission] = useState<IMission | null>(null)
  const [completed, setCompleted] = useState<string[]>([])
  const [countdown, setCountdown] = useState<number>(0)
  const [canConfirm, setCanConfirm] = useState(false)

  const missions = useMemo<IMission[]>(() => [
    { title: 'Reconhecer Sintomas', stroke: 'stroke-blue-600', fill: 'fill-blue-200', icon: 'ki-solid ki-heartbeat', iconColor: 'text-blue-600', description: 'Aprenda a identificar sintomas de ansiedade.', type: 'reading', link: 'https://example.com/reconhecer-ansiedade', duration: '4 minutos', order: 1, points: 20, level: 'iniciante' },
    { title: 'Respiração Básica', stroke: 'stroke-purple-600', fill: 'fill-purple-200', icon: 'ki-solid ki-wind', iconColor: 'text-purple-600', description: 'Técnica 4-7-8 para controlar ansiedade.', type: 'video', link: 'https://youtu.be/example-respiracao', duration: '5 minutos', order: 2, prerequisite: 1, points: 25, level: 'iniciante' },
    { title: 'Autoavaliação', stroke: 'stroke-green-600', fill: 'fill-green-200', icon: 'ki-solid ki-check-square', iconColor: 'text-green-600', description: 'Quiz rápido para avaliar ansiedade.', type: 'form', link: 'https://example.com/quiz-ansiedade', duration: '6 minutos', order: 3, prerequisite: 2, points: 30, level: 'iniciante' },
    { title: 'Técnicas Cognitivas', stroke: 'stroke-red-600', fill: 'fill-red-200', icon: 'ki-solid ki-book-open', iconColor: 'text-red-600', description: 'Reestruturação cognitiva avançada.', type: 'reading', link: 'https://example.com/tecnicas-cognitivas', duration: '8 minutos', order: 4, prerequisite: 3, points: 35, level: 'intermediário' },
    { title: 'Mindfulness Avançado', stroke: 'stroke-indigo-600', fill: 'fill-indigo-200', icon: 'ki-solid ki-video', iconColor: 'text-indigo-600', description: 'Prática guiada de mindfulness.', type: 'video', link: 'https://youtu.be/example-mindfulness-anxiety', duration: '12 minutos', order: 5, prerequisite: 4, points: 40, level: 'intermediário' },
    { title: 'Plano Personalizado', stroke: 'stroke-yellow-600', fill: 'fill-yellow-200', icon: 'ki-solid ki-rocket', iconColor: 'text-yellow-600', description: 'Crie seu plano de manejo da ansiedade.', type: 'form', link: 'https://example.com/plano-personalizado', duration: '10 minutos', order: 6, prerequisite: 5, points: 50, level: 'avançado' }
  ], [])

  const sorted = missions.slice().sort((a, b) => a.order - b.order)
  const isDone = (t: string) => completed.includes(t)
  const isLocked = (m: IMission) => m.prerequisite != null && !isDone(sorted.find(x => x.order === m.prerequisite!)!.title)
  const markDone = (t: string) => setCompleted(prev => [...prev, t])

  useEffect(() => {
    if (!selectedMission) return
    const secs = parseInt(selectedMission.duration) * 60
    let remaining = secs
    setCountdown(remaining)
    setCanConfirm(false)
    const iv = setInterval(() => {
      remaining -= 1
      setCountdown(remaining)
      if (remaining <= 0) {
        clearInterval(iv)
        setCanConfirm(true)
      }
    }, 1000)
    return () => clearInterval(iv)
  }, [selectedMission])

  const handleConfirm = () => {
    if (selectedMission && canConfirm && !isDone(selectedMission.title)) {
      markDone(selectedMission.title)
      setSelectedMission(null)
    }
  }

  const formatTime = (s: number) => `${Math.floor(s/60)}:${(s%60).toString().padStart(2,'0')}`

  const renderCard = (m: IMission) => {
    const locked = isLocked(m)
    const done = isDone(m.title)
    return (
      <div key={m.title} className="flex-shrink-0 w-72 p-3">  {/* Mobile-friendly width */}
        <div className={`rounded-2xl border ${done?'border-green-300 bg-green-50':locked?'border-gray-200 bg-gray-50 opacity-50':'border-gray-200 bg-white'} p-4`} onClick={()=>!locked&&setSelectedMission(m)}>
          <CommonHexagonBadge stroke={locked?'stroke-gray-400':m.stroke} fill={locked?'fill-gray-200':m.fill} size="size-[60px]" badge={<KeenIcon icon={locked?'ki-solid ki-lock':m.icon} className={`${locked?'text-gray-400':m.iconColor} text-lg`} />} />
          <h3 className={`mt-2 text-sm font-bold ${locked?'text-gray-400':'text-gray-800 dark:text-white'}`}>{m.title}</h3>
          <p className={`mt-1 text-xs ${locked?'text-gray-400':'text-gray-600 dark:text-gray-300'}`}>{m.level}</p>
          <p className={`mt-2 text-xs ${locked?'text-gray-400':'text-gray-600 dark:text-gray-300'}`}>{m.description}</p>
        </div>
      </div>
    )
  }

  const renderModal = () => {
    if (!selectedMission) return null
    const m = selectedMission
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-sm p-4 overflow-auto">
          <h2 className="text-lg font-bold mb-2 text-gray-800 dark:text-white">{m.title}</h2>
          <p className="text-xs text-gray-600 dark:text-gray-300 mb-4">{m.description}</p>
          {(m.type==='reading'||m.type==='form')&&(
            <a href={m.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-xs mb-4 block">Abrir ({m.duration})</a>
          )}
          {m.type==='video'&&( <iframe title={m.title} className="w-full h-40 rounded mb-4" src={`${m.link}?controls=1`} allow="autoplay; encrypted-media" /> )}
          {!canConfirm && countdown>0 && <p className="text-center text-xs text-gray-500 mb-4">Tempo restante: {formatTime(countdown)}</p>}
          <div className="flex gap-2">
            <button onClick={()=>setSelectedMission(null)} className="flex-1 px-3 py-2 text-xs border rounded">Cancelar</button>
            <button onClick={handleConfirm} disabled={!canConfirm||isDone(m.title)} className="flex-1 px-3 py-2 text-xs bg-blue-600 text-white rounded disabled:opacity-50">{isDone(m.title)?'Concluído':'Confirmar'}</button>
          </div>
        </div>
      </div>
    )
  }

  const completedCount = completed.length
  const totalPoints = completed.reduce((sum,t)=> sum + (missions.find(x=>x.title===t)?.points||0),0)
  const progress = (completedCount/missions.length)*100

  return (
    <div className="road-missions-container px-4">
      {title&&(
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-base font-bold text-gray-800 dark:text-white">{title}</h1>
          <span className="text-xs text-gray-600 dark:text-gray-400">{completedCount}/{missions.length} etapas • {totalPoints}pts</span>
        </div>
      )}
      <div className="w-full bg-gray-200 dark:bg-gray-600 h-2 rounded mb-4">
        <div className="h-2 bg-blue-600 rounded" style={{width:`${progress}%`}} />
      </div>
      <div className="flex overflow-x-auto space-x-2 pb-4">
        {sorted.map(renderCard)}
      </div>
      {renderModal()}
    </div>
  )
}

export { RoadMissionsDashboard, type RoadMissionsProps }
