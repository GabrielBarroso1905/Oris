// src/pages/account/home/settings-sidebar.tsx
import React, { Fragment } from 'react'
import { KeenIcon } from '@/components'
import { ArrowRight } from 'lucide-react'

interface IExternalServicesManageApiProps {
  title: string
  switch: boolean
}

/**
 * Card “Pílula do Dia” com hexágono, título, descrição e botão.
 * Ajustado para overflow-visible, de modo que o hexágono não seja cortado.
 */
const ExternalServicesManageApi: React.FC<IExternalServicesManageApiProps> = ({
  title,
  switch: showSwitch,
}) => {
  return (
    <Fragment>
      <style>{`
        .hexagon-container {
          position: relative;
          width: 56px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hexagon {
          position: absolute;
          width: 100%;
          height: 100%;
          background: conic-gradient(from 45deg, #3b82f6, #06b6d4);
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        }
        .hexagon-inner {
          position: relative;
          width: 50px;
          height: 58px;
          background: white;
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .dark .hexagon-inner {
          background: #1f2937;
        }
      `}</style>

      <div className="card rounded-2xl shadow-sm overflow-visible border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-300 w-full max-w-sm mx-auto">
        {/* Topo: hexágono + título + descrição */}
        <div className="p-5 flex flex-col gap-4 overflow-visible">
          <div className="flex items-center gap-4">
            <div className="hexagon-container">
              <div className="hexagon" />
              <div className="hexagon-inner">
                <span className="text-xl font-semibold text-blue-600">183</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                Pílulas Oris
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Moeda de troca para ser utilizadas na Oris.{' '}
                <a href="#" className="text-emerald-500 hover:underline">Sobre</a>
              </span>
            </div>
          </div>
        </div>

        {/* Botão */}
        <button
          disabled={!showSwitch}
          className={`
            w-full flex items-center justify-between px-4 py-3 transition-all duration-200
            ${showSwitch
              ? 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }
          `}
        >
          <div className="flex items-center gap-2">
            <KeenIcon
              icon="ki-solid ki-gift"
              className={`text-white opacity-90 ${showSwitch ? 'group-hover:opacity-100' : ''}`}
            />
            <span className="font-semibold text-sm">
              {showSwitch ? 'Pílula do Dia' : 'Indisponível'}
            </span>
          </div>
          <ArrowRight className="w-4 h-4 text-white" />
        </button>
      </div>
    </Fragment>
  )
}

export { ExternalServicesManageApi, type IExternalServicesManageApiProps }
