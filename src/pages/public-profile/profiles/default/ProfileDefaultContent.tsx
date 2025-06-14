// src/components/ProfileDefaultContent.tsx
import React from 'react'
import { toAbsoluteUrl } from '@/utils/Assets'
import { CommunityBadges, Contributions } from './blocks'
import { DoubleButtonApp } from '@/pages/account/home/settings-sidebar/blocks/DoubleButtonApp'

export const ProfileDefaultContent: React.FC = () => {
  const userName = 'Pedro'
  const userId   = '20222SI0026'

  return (
    <div className="min-h-screen bg-white pb-12 flex flex-col items-center">
      {/* Logo & Saudação */}
      <div className="flex flex-col items-center mt-8">
        <img
          src={toAbsoluteUrl('/public/media/images/Logo.png')}
          alt="Logo Oris"
          className="w-24 h-24 object-contain mb-2"
        />
        <h2 className="text-2xl font-bold text-blue-600">Olá, {userName}</h2>
        <p className="text-sm text-gray-500">{userId}</p>
      </div>

      {/* BOTÕES QUADRADOS EM 2 COLUNAS NO MOBILE */}
      <div className="w-full px-4 mt-6 max-w-sm">
        <DoubleButtonApp />
      </div>

      {/* BADGES */}
      <div className="w-full px-4 mt-8 max-w-lg">
        <CommunityBadges title="Community Badges" />
      </div>

      {/* GRÁFICO */}
      <div className="w-full px-4 mt-8 max-w-lg">
        <Contributions title="Investments" />
      </div>
    </div>
  )
}
