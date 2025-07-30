// src/components/ProfileDefaultContent.tsx
import React, { useEffect, useState } from 'react'
import { toAbsoluteUrl } from '@/utils/Assets'
import { CommunityBadges, Contributions } from './blocks'
import { DoubleButtonApp } from '@/pages/account/home/settings-sidebar/blocks/DoubleButtonApp'

export const ProfileDefaultContent: React.FC = () => {
  const userName = 'Pedro'
  const userId   = '20222SI0026'

  const [healthData, setHealthData] = useState({ sono: '', humor: '', ergonomia: '', imc: '' })

  useEffect(() => {
    const data = localStorage.getItem('userHealthData')
    if (data) {
      setHealthData(JSON.parse(data))
    }

    // Listener para detectar mudanças no localStorage
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'userHealthData' && e.newValue) {
        setHealthData(JSON.parse(e.newValue))
      }
    }

    // Listener para evento customizado
    const handleHealthDataUpdated = (e: CustomEvent) => {
      setHealthData(e.detail)
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('healthDataUpdated', handleHealthDataUpdated as EventListener)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('healthDataUpdated', handleHealthDataUpdated as EventListener)
    }
  }, [])

  return (
    <div className="min-h-screen bg-white pb-12 flex flex-col items-center">
      {/* Logo & Saudação */}
      <div className="flex flex-col items-center mt-8">
        <img
          src={toAbsoluteUrl('/media/images/Logo.png')}
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

      {/* BADGES de humor, sono, Ergonomia e IMC */}
      <div className="w-full px-4 mt-8 max-w-lg">
        <CommunityBadges
          title="Community Badges"
          sono={healthData.sono}
          humor={healthData.humor}
          ergonomia={healthData.ergonomia}
          imc={healthData.imc}
        />
      </div>

      {/* GRÁFICO */}
      <div className="w-full px-4 mt-8 max-w-lg">
        <Contributions 
          title="Investments"
          sono={healthData.sono}
          humor={healthData.humor}
          ergonomia={healthData.ergonomia}
          imc={healthData.imc}
        />
      </div>
    </div>
  )
}
