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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
      {/* Logo & Saudação */}
      <div className="flex flex-col items-center pt-8">
        <div className="relative inline-block mb-6">
          <img
            src={toAbsoluteUrl('/media/images/Logo.png')}
            alt="Logo Oris"
          />
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 bg-clip-text text-transparent">
          Olá, {userName}
        </h2>
        <div className="inline-flex items-center px-3 py-1 mt-2 rounded-full bg-blue-100/80 border border-blue-200/50">
          <span className="text-sm font-medium text-blue-700">{userId}</span>
        </div>
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
