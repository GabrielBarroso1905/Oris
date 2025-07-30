// src/pages/account/home/settings-sidebar/blocks/RoadMissionsDashboard.tsx
import React, { useMemo, useState, useEffect } from 'react';
import { KeenIcon } from '@/components';
import { CommonHexagonBadge } from '@/partials/common';

interface IMission {
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

interface RoadMissionsProps {
  title?: string;
  roadMissions: IMission[];
  // NOVA PROP: Callback para notificar o componente pai sobre a conclusão da missão
  onMissionComplete: (points: number) => void;
}

const RoadMissionsDashboard: React.FC<RoadMissionsProps> = ({ title, roadMissions, onMissionComplete }) => {
  const [selectedMission, setSelectedMission] = useState<IMission | null>(null);
  const [completed, setCompleted] = useState<string[]>([]);
  const [countdown, setCountdown] = useState<number>(0);
  const [canConfirm, setCanConfirm] = useState(false);

  const sorted = useMemo(() => roadMissions.slice().sort((a, b) => a.order - b.order), [roadMissions]);

  const isDone = (t: string) => completed.includes(t);

  const isLocked = (m: IMission) => m.prerequisite != null && !isDone(roadMissions.find(x => x.order === m.prerequisite!)?.title || '');
  
  const markDone = (t: string) => setCompleted(prev => [...prev, t]);

  // Efeito para resetar o estado de conclusão e missão selecionada ao mudar as missões (ou o tema)
  useEffect(() => {
    setCompleted([]);
    setSelectedMission(null);
  }, [roadMissions]);

  useEffect(() => {
    if (!selectedMission) return;
    // Corrigido para lidar com "0,1 minutos"
    const durationParts = selectedMission.duration.split(' ')[0].replace(',', '.');
    const durationMinutes = parseFloat(durationParts);
    const secs = isNaN(durationMinutes) ? 0 : Math.round(durationMinutes * 60); // Arredonda para o segundo mais próximo
    
    let remaining = secs;
    setCountdown(remaining);
    setCanConfirm(false);
    const iv = setInterval(() => {
      remaining -= 1;
      setCountdown(remaining);
      if (remaining <= 0) {
        clearInterval(iv);
        setCanConfirm(true);
      }
    }, 1000);
    return () => clearInterval(iv);
  }, [selectedMission]);

  const handleConfirm = () => {
    if (selectedMission && canConfirm && !isDone(selectedMission.title)) {
      markDone(selectedMission.title);
      // CHAMA O CALLBACK PARA O COMPONENTE PAI
      onMissionComplete(selectedMission.points);
      setSelectedMission(null);
    }
  };

  const formatTime = (s: number) => `${Math.floor(s/60)}:${(s%60).toString().padStart(2,'0')}`;

  const renderCard = (m: IMission) => {
    const locked = isLocked(m);
    const done = isDone(m.title);
    return (
      <div key={m.title} className="flex-shrink-0 w-72 p-3">
        <div className={`rounded-2xl border ${done?'border-green-300 bg-green-50':locked?'border-gray-200 bg-gray-50 opacity-50':'border-gray-200 bg-white'} p-4`} onClick={()=>!locked&&setSelectedMission(m)}>
          <CommonHexagonBadge stroke={locked?'stroke-gray-400':m.stroke} fill={locked?'fill-gray-200':m.fill} size="size-[60px]" badge={<KeenIcon icon={locked?'ki-solid ki-lock':m.icon} className={`${locked?'text-gray-400':m.iconColor} text-lg`} />} />
          <h3 className={`mt-2 text-sm font-bold ${locked?'text-gray-400':'text-gray-800 dark:text-white'}`}>{m.title}</h3>
          <p className={`mt-1 text-xs ${locked?'text-gray-400':'text-gray-600 dark:text-gray-300'}`}>{m.level}</p>
          <p className={`mt-2 text-xs ${locked?'text-gray-400':'text-gray-600 dark:text-gray-300'}`}>{m.description}</p>
        </div>
      </div>
    );
  };

  const renderModal = () => {
    if (!selectedMission) return null;
    const m = selectedMission;
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
    );
  };

  const completedCount = completed.length;
  const totalPoints = completed.reduce((sum,t)=> sum + (roadMissions.find(x=>x.title===t)?.points||0),0);
  const progress = (completedCount/roadMissions.length)*100;

  return (
    <div className="road-missions-container px-4">
      {title&&(
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-base font-bold text-gray-800 dark:text-white">{title}</h1>
          <span className="text-xs text-gray-600 dark:text-gray-400">{completedCount}/{roadMissions.length} etapas • {totalPoints}pts</span>
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
  );
};

export { RoadMissionsDashboard, type RoadMissionsProps };