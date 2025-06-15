// src/pages/public-profile/profiles/creator/ProfileCreatorContent.tsx
import React from 'react'
import { ExternalServicesManageApi } from '@/pages/account/home/settings-sidebar'
import { HealthMissionsDashboard } from '../default/blocks/CommunityBadges2'
import { RoadMissionsDashboard } from '../default/blocks/CommunityBadges3'
import { KeenIcon } from '@/components'

const ProfileCreatorContent: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 w-full overflow-x-hidden">
      <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-7.5 max-w-6xl mx-auto">

          {/* Coluna 1: Pílulas Oris e Resumo de Progresso */}
          <div className="col-span-1 flex flex-col space-y-4 sm:space-y-6">
            <ExternalServicesManageApi
              title="Pílulas Oris"
              show={true}
              videoUrl="https://www.youtube.com/watch?v=aWe3HBkH1ro"
            />

            <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden w-full">
              <div className="p-3 sm:p-6 lg:p-8 w-full">
                <h2 className="text-base sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-6 text-center sm:text-left">
                  <KeenIcon icon="chart-pie-simple" className="w-4 h-4 sm:w-6 sm:h-6 inline-block mr-2 text-blue-600 dark:text-blue-400" />
                  Seu Progresso Hoje
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 lg:gap-6 w-full">
                  {[
                    { label: 'Pílulas Coletadas', icon: 'pill', value: '8', color: 'blue' },
                    { label: 'Missões Concluídas', icon: 'rocket', value: '3', color: 'green' },
                    { label: 'Pontos Ganhos', icon: 'star', value: '150', color: 'yellow' },
                    { label: 'Meta Diária', icon: 'target', value: '75%', color: 'purple' }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-2 sm:p-4 text-center hover:shadow-md transition-shadow duration-200 w-full min-w-0">
                      <div className={`w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-1 sm:mb-3 rounded-full flex items-center justify-center ${
                        item.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900' :
                        item.color === 'green' ? 'bg-green-100 dark:bg-green-900' :
                        item.color === 'yellow' ? 'bg-yellow-100 dark:bg-yellow-900' :
                        'bg-purple-100 dark:bg-purple-900'
                      }`}>
                        <KeenIcon
                          icon={item.icon}
                          className={`w-4 h-4 sm:w-6 sm:h-6 ${
                            item.color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                            item.color === 'green' ? 'text-green-600 dark:text-green-400' :
                            item.color === 'yellow' ? 'text-yellow-600 dark:text-yellow-400' :
                            'text-purple-600 dark:text-purple-400'
                          }`}
                        />
                      </div>
                      <div className="text-lg sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                        {item.value}
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-tight break-words">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-3 sm:mt-6 w-full">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Meta Diária</span>
                    <span className="text-xs sm:text-sm font-bold text-purple-600 dark:text-purple-400">75%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 sm:h-3">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 sm:h-3 rounded-full transition-all duration-500" 
                      style={{ width: '75%' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Colunas 2-3: Missões */}
          <div className="col-span-1 lg:col-span-2 flex flex-col space-y-4 sm:space-y-6 lg:space-y-8">
            <RoadMissionsDashboard title="Missões da trilha atual" />
            <HealthMissionsDashboard title="Missões de Saúde e Bem-estar" />
          </div>
        </div>

        {/* Seção de estatísticas adicional para mobile */}
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
  )
}

export { ProfileCreatorContent }
