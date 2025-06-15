// src/pages/account/home/settings-sidebar.tsx
import { KeenIcon } from '@/components'
import { toAbsoluteUrl } from '@/utils'
import { ArrowRight } from 'lucide-react'
import React, { Fragment } from 'react'

interface IExternalServicesManageApiProps {
  title: string
  switch: boolean
}

const pillAvailable = true  // simula disponibilidade da pílula do dia


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
      <div className="card rounded-2xl shadow-sm overflow-visible border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-300 w-full max-w-sm mx-auto">
        {/* Topo: hexágono + título + descrição */}
        <div className="p-5 flex flex-col gap-4 overflow-visible">
          <div className="flex items-center gap-4">

            <div className="relative w-16 h-16 mb-2">
              <img
                src={toAbsoluteUrl('/media/icons/polygon1.svg')}
                alt="Hexágono Pílulas Oris"
                className="w-full h-full"
              />
              <span
                className="absolute inset-0 flex items-center justify-center font-semibold"
                style={{
                  background: pillAvailable
                    ? 'linear-gradient(to bottom, #3b82f6, #06b6d4)'
                    : 'transparent',
                  WebkitBackgroundClip: pillAvailable ? 'text' : undefined,
                  color: pillAvailable ? 'transparent' : '#999',
                }}
              >
                183
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                Pílulas Oris
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Moeda de troca para ser utilizadas no Oris.{' '}
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
        </button>
      </div>
    </Fragment>
  )
}

export { ExternalServicesManageApi, type IExternalServicesManageApiProps }

