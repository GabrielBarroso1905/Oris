// src/components/Contributions.tsx
import React, { useEffect, useRef, useState } from 'react'
import ApexChart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'
import { useLanguage } from '@/i18n'
import { KeenIcon, Menu, MenuItem, MenuToggle } from '@/components'
import { DropdownCard2 } from '@/partials/dropdowns/general'

export interface IContributionsProps {
  title: string
  sono?: string
  humor?: string
  ergonomia?: string
  imc?: string
}

interface ICardData {
  title: string
  icon: string
  iconColor: string
}

export const Contributions: React.FC<IContributionsProps> = ({ title, sono, humor, ergonomia, imc }) => {
  const { isRTL } = useLanguage()
  const chartRef = useRef<any>(null)
  const [ready, setReady] = useState(false)

  const cardsData: ICardData[] = [
    { title: 'Sono', icon: 'ki-filled ki-moon', iconColor: 'text-primary' },
    { title: 'Humor', icon: 'ki-filled ki-emoji-happy', iconColor: 'text-success' },
    { title: 'Ergonomia', icon: 'ki-filled ki-heart', iconColor: 'text-danger' },
    { title: 'IMC', icon: 'ki-filled ki-user-tick', iconColor: 'text-info' }
  ]

  // Função para converter valores do formulário em números para o gráfico
  const convertFormValueToNumber = (type: string, value: string | undefined): number => {
    if (!value) return 0

    const mappings: Record<string, Record<string, number>> = {
      sono: {
        'excelente': 10, // 8+ horas
        'bom': 8,        // 6-8 horas
        'regular': 6,    // 4-6 horas
        'ruim': 4        // <4 horas
      },
      humor: {
        'muito-feliz': 50, // Muito feliz
        'feliz': 40,       // Feliz
        'neutro': 30,      // Neutro
        'triste': 20,      // Triste
        'muito-triste': 10 // Muito triste
      },
      ergonomia: {
        'excelente': 40, // Excelente
        'boa': 30,       // Boa
        'regular': 20,   // Regular
        'ruim': 10       // Ruim
      },
      imc: {
        // Para IMC, usar o valor numérico diretamente
        default: parseFloat(value) || 0
      }
    }

    return mappings[type]?.[value] || mappings[type]?.default || parseFloat(value) || 0
  }

  // Calcular valores baseados nos dados do formulário
  const data = [
    convertFormValueToNumber('sono', sono),
    convertFormValueToNumber('humor', humor),
    convertFormValueToNumber('ergonomia', ergonomia),
    convertFormValueToNumber('imc', imc)
  ]

  const ranges = {
    sleep: { min: 6, max: 10 },    // Sono: 6-10 (bom a excelente)
    mood: { min: 20, max: 50 },    // Humor: 20-50 (triste a muito feliz)
    ergonomics: { min: 20, max: 40 }, // Ergonomia: 20-40 (regular a excelente)
    imc: { min: 18.5, max: 25 }    // IMC: 18.5-25 (normal)
  }
  
  const unbalanced = [
    data[0] < ranges.sleep.min || data[0] > ranges.sleep.max,
    data[1] < ranges.mood.min || data[1] > ranges.mood.max,
    data[2] < ranges.ergonomics.min || data[2] > ranges.ergonomics.max,
    data[3] < ranges.imc.min || data[3] > ranges.imc.max
  ]
  
  const msgs = [
    'Ideal: 6-10h sono',
    'Ideal: humor entre 20-50',
    'Ideal: ergonomia entre 20-40',
    'Ideal: IMC entre 18.5-25'
  ]
  const unCnt = unbalanced.filter(Boolean).length
  const balanced = unCnt === 0

  const warningColor = 'var(--tw-danger)'
  const baseColors = cardsData.map(c => `var(--tw-${c.iconColor.split('-')[1]})`)
  const colors = baseColors.map((c, i) => (unbalanced[i] ? warningColor : c))

  const options: ApexOptions = {
    chart: {
      type: 'donut',
      width: '100%',
      height: '100%',
      events: {
        mounted: () => setReady(true),
        updated: () => setReady(true)
      }
    },
    series: data,
    labels: cardsData.map(c => c.title),
    colors,
    fill: { colors },
    stroke: { width: 2 },
    dataLabels: { enabled: false },
    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: { size: '70%', labels: { show: false } }
      }
    },
    legend: { show: false }, // hide built-in legend
    responsive: [
      {
        breakpoint: 640,
        options: {
          plotOptions: { pie: { donut: { size: '60%' } } }
        }
      },
      {
        breakpoint: 480,
        options: {
          plotOptions: { pie: { donut: { size: '55%' } } }
        }
      }
    ]
  }

  return (
    <div className="card shadow-md rounded-2xl p-4 bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{title}</h3>
        <div className="relative z-10">
          <Menu>
            <MenuItem
              toggle="dropdown"
              trigger="click"
              dropdownProps={{
                placement: isRTL() ? 'bottom-start' : 'bottom-end',
                modifiers: [
                  { name: 'offset', options: { offset: isRTL() ? [0, -10] : [0, 10] } }
                ]
              }}
            >
              <MenuToggle className="btn btn-icon btn-sm btn-light btn-clear">
                <KeenIcon icon="dots-vertical" />
              </MenuToggle>
              <DropdownCard2 />
            </MenuItem>
          </Menu>
        </div>
      </div>

      {/* Chart + Custom Legend */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Chart */}
        <div className="w-full lg:w-1/2 h-48 sm:h-64 lg:h-80">
          <ApexChart
            ref={chartRef}
            options={options}
            series={data}
            type="donut"
            width="100%"
            height="100%"
          />
        </div>

        {/* Custom legend cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-1 gap-4 w-full lg:w-1/2">
          {cardsData.map((c, i) => (
            <div
              key={c.title}
              className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 p-3 rounded-lg"
            >
              <KeenIcon
                icon={c.icon}
                className={`${c.iconColor} ${unbalanced[i] ? 'text-danger' : ''}`}
              />
              <div className="flex-1">
                <span className="block text-sm text-gray-700 dark:text-gray-300">
                  {c.title}
                </span>
                {unbalanced[i] && (
                  <span className="block text-xs text-red-600 mt-1">{msgs[i]}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer status */}
      <div
        className={`mt-6 text-center rounded-md py-2 text-sm font-medium ${
          balanced ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}
      >
        {balanced ? (
          <div className="flex items-center justify-center gap-2">
            <KeenIcon icon="ki-filled ki-check-circle" className="w-4 h-4" />
            Todas as métricas estão equilibradas
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <KeenIcon icon="ki-filled ki-warning" className="w-4 h-4" />
            {unCnt} métrica{unCnt > 1 ? 's' : ''} desequilibrada{unCnt > 1 ? 's' : ''}
          </div>
        )}
      </div>
    </div>
  )
}
