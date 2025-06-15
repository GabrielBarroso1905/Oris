// src/components/Contributions.tsx
import React, { useEffect, useRef, useState } from 'react'
import ApexChart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'
import { useLanguage } from '@/i18n'
import { KeenIcon, Menu, MenuItem, MenuToggle } from '@/components'
import { DropdownCard2 } from '@/partials/dropdowns/general'

export interface IContributionsProps {
  title: string
}

interface ICardData {
  title: string
  icon: string
  iconColor: string
}

export const Contributions: React.FC<IContributionsProps> = ({ title }) => {
  const { isRTL } = useLanguage()
  const chartRef = useRef<any>(null)
  const [ready, setReady] = useState(false)

  const cardsData: ICardData[] = [
    { title: 'Sono', icon: 'ki-filled ki-moon', iconColor: 'text-primary' },
    { title: 'Humor', icon: 'ki-filled ki-emoji-happy', iconColor: 'text-success' },
    { title: 'BPM', icon: 'ki-filled ki-heart', iconColor: 'text-danger' },
    { title: 'IMC', icon: 'ki-filled ki-user-tick', iconColor: 'text-info' }
  ]

  const data = [10, 50, 60, 20]
  const ranges = {
    sleep: { min: 8, max: 12 },
    mood: { min: 30, max: 50 },
    bpm: { min: 60, max: 100 },
    imc: { min: 18.5, max: 25 }
  }
  const unbalanced = [
    data[0] < ranges.sleep.min || data[0] > ranges.sleep.max,
    data[1] < ranges.mood.min || data[1] > ranges.mood.max,
    data[2] < ranges.bpm.min || data[2] > ranges.bpm.max,
    data[3] < ranges.imc.min || data[3] > ranges.imc.max
  ]
  const msgs = [
    'Ideal: 8–12h sono',
    'Ideal: humor entre 30–50',
    'Ideal: 60–100 BPM',
    'Ideal: IMC entre 18.5–25'
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
