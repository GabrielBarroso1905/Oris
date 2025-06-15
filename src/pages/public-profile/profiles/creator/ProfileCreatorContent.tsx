// src/pages/public-profile/profiles/creator/ProfileCreatorContent.tsx
import React from 'react'
import { ExternalServicesManageApi } from '@/pages/account/home/settings-sidebar'
import { HealthMissionsDashboard } from '../default/blocks/CommunityBadges2'
import { RoadMissionsDashboard } from '../default/blocks/CommunityBadges3'
import { KeenIcon } from '@/components'

const ProfileCreatorContent: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center">
      <div className="w-full max-w-2xl mx-auto px-6 my-6 space-y-6">

        {/* Pílulas Oris: standalone card no wrapper */}
        <div className="flex justify-center">
  <div className="w-full max-w-xl">
    <ExternalServicesManageApi
      title="Pílulas Oris"
      show={true}
      videoUrl="https://www.youtube.com/watch?v=aWe3HBkH1ro"
    />
  </div>
</div>

        {/* Resumo de Progresso: apenas o card */}
        <div className="rounded-2xl shadow-sm overflow-hidden">
          <div className="bg-white dark:bg-gray-800 p-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
            Seu Progresso Hoje
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {['Pílulas Coletadas', 'Missões Concluídas', 'Outras Métricas', 'Meta Diária'].map(
                (label, idx) => (
                  <div key={idx} className="text-center">
                    <KeenIcon
                      icon="ki-solid ki-pill"
                      className="text-blue-600 dark:text-blue-400 text-xl mx-auto mb-2"
                    />
                    <p className="text-xs text-gray-600 dark:text-gray-400">{label}</p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Trilha: Manejo da Ansiedade: render component directly */}
        <RoadMissionsDashboard title="Missões da trilha atual" />

        {/* Missões de Bem-estar: render component directly */}
        <HealthMissionsDashboard title="Missões de Saúde e Bem-estar" />
      </div>
    </div>
  )
}

export { ProfileCreatorContent }
