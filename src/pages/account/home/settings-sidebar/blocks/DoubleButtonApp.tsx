// src/pages/account/home/settings-sidebar.tsx
import React from 'react'
import { ArrowRight } from 'lucide-react'
import { KeenIcon } from '@/components'
import { toAbsoluteUrl } from '@/utils/Assets'

export interface IDoubleButtonAppProps {}

/**
 * Dois cards quadrados, usando PNGs de hexágono no topo
 * (polygon1.png e polygon2.png em public/media/icons),
 * com status de disponibilidade e ícones sobrepostos.
 */
export const DoubleButtonApp: React.FC<IDoubleButtonAppProps> = () => {
  const pillAvailable = false  // simula se a pílula do dia está disponível

  return (
    <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
      {/* Pílula do Dia */}
      <a
        href={pillAvailable ? "#" : undefined}
        className={`
          aspect-square bg-white rounded-2xl shadow-sm flex flex-col overflow-hidden
          transform transition hover:scale-105
          ${pillAvailable ? "" : "opacity-50 cursor-not-allowed"}
        `}
      >
        <div className="flex-1 flex flex-col items-center justify-center px-4">
          {/* Hexágono + contador em degradê azul→verde */}
          <div className="relative w-16 h-16 mb-2">
            <img
              src={toAbsoluteUrl('/media/icons/polygon1.svg')}
              alt="Hexágono Pílulas Oris"
              className="w-full h-full"
            />
            <span
              className="absolute inset-0 flex items-center justify-center font-semibold"
              style={{
                background: 'linear-gradient(to bottom, #3b82f6, #06b6d4)',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}
            >
              183
            </span>
          </div>
          <span className="text-sm font-semibold text-gray-900">Pílulas Oris</span>
        </div>
        <div
          className={`
            flex items-center justify-center gap-2 py-2
            ${pillAvailable
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-300 text-gray-600'}
          `}
        >
          <span className="font-medium">
            {pillAvailable ? 'Pílula do Dia' : 'Indisponível'}
          </span>
          <ArrowRight size={16} />
        </div>
      </a>

      {/* Denúncia Rápida */}
      <a
        href="http://localhost:5173/metronic/tailwind/react/public-profile/profiles/company"
        className="aspect-square bg-white rounded-2xl shadow-sm flex flex-col overflow-hidden transform transition hover:scale-105"
      >
        <div className="flex-1 flex flex-col items-center justify-center px-4">
          {/* Hexágono vermelho + ícone de alerta */}
          <div className="relative w-16 h-16 mb-2">
            <img
              src={toAbsoluteUrl('/media/icons/polygon2.svg')}
              alt="Hexágono Denúncia Rápida"
              className="w-full h-full"
            />
            <KeenIcon
              icon="ki-solid ki-alert-triangle"
              className="absolute top-1/2 left-1/2 w-6 h-6 -translate-x-1/2 -translate-y-1/2 text-red-600"
            />
          </div>
          <span className="text-sm font-semibold text-gray-900">Denúncia Rápida</span>
        </div>
        <div className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2">
          <span className="font-medium">Fazer Denúncia</span>
          <ArrowRight size={16} />
        </div>
      </a>
    </div>
  )
}
