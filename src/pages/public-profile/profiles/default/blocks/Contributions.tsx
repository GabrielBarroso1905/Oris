import ApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { useLanguage } from '@/i18n';
import { KeenIcon, Menu, MenuItem, MenuToggle } from '@/components';
import { DropdownCard2 } from '@/partials/dropdowns/general';
import { useEffect, useRef, useState } from 'react';

interface IContributionsProps {
  title: string;
}

interface ICardData {
  title: string;
  icon: string;
  iconColor: string;
}

const Contributions = ({ title }: IContributionsProps) => {
  const { isRTL } = useLanguage();
  const chartRef = useRef<any>(null);
  const [chartReady, setChartReady] = useState(false);

  const cardsData: ICardData[] = [
    { title: "Sono", icon: 'ki-filled ki-moon', iconColor: 'text-primary' },
    { title: "Humor", icon: 'ki-filled ki-emoji-happy', iconColor: 'text-success' },
    { title: "BPM", icon: 'ki-filled ki-heart', iconColor: 'text-danger' },
    { title: "IMC", icon: 'ki-filled ki-user-tick', iconColor: 'text-info' }
  ];

  const data: number[] = [10, 50, 60, 50];

  const healthyRanges = {
    sleep: { min: 8, max: 12 },
    mood: { min: 30, max: 50 },
    bpm: { min: 60, max: 100 },
    imc: { min: 18.5, max: 25 }
  };

  const isUnbalanced = [
    data[0] < healthyRanges.sleep.min || data[0] > healthyRanges.sleep.max,
    data[1] < healthyRanges.mood.min || data[1] > healthyRanges.mood.max,
    data[2] < healthyRanges.bpm.min || data[2] > healthyRanges.bpm.max,
    data[3] < healthyRanges.imc.min || data[3] > healthyRanges.imc.max
  ];

  const unbalancedMessages = [
    "Ideal: 20h a 40h de sono",
    "Vamos tentar melhorar esse humor",
    "Ideal: 60 a 100 BPM",
    "Ideal: IMC entre 18.5 e 25"
  ];

  const unbalancedCount = isUnbalanced.filter(Boolean).length;
  const isBalanced = unbalancedCount === 0;

  const warningColor = 'var(--tw-danger)';
  const normalColors = cardsData.map(card => `var(--tw-${card.iconColor.split('-')[1]})`);
  const colors = normalColors.map((color, index) => isUnbalanced[index] ? warningColor : color);

  const options: ApexOptions = {
    series: data,
    labels: cardsData.map(card => card.title),
    colors: colors,
    fill: { colors },
    chart: {
      type: 'donut',
      events: {
        mounted: () => setChartReady(true),
        updated: () => setChartReady(true)
      }
    },
    stroke: { show: true, width: 2 },
    dataLabels: { enabled: false },
    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: {
          size: '70%',
          labels: { show: false }
        }
      }
    },
    legend: {
      offsetY: -10,
      fontSize: '13px',
      itemMargin: { vertical: 1 },
      labels: {
        colors: 'var(--tw-gray-700)',
        useSeriesColors: false
      }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: { width: 200 },
        legend: { position: 'bottom' },
        plotOptions: { pie: { donut: { size: '65%' } } }
      }
    }]
  };

  return (
    <div className="card shadow-md rounded-2xl p-4 bg-white dark:bg-gray-900">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{title}</h3>
        <Menu>
          <MenuItem
            toggle="dropdown"
            trigger="click"
            dropdownProps={{
              placement: isRTL() ? 'bottom-start' : 'bottom-end',
              modifiers: [{ name: 'offset', options: { offset: isRTL() ? [0, -10] : [0, 10] } }]
            }}
          >
            <MenuToggle className="btn btn-sm btn-icon btn-light btn-clear">
              <KeenIcon icon="dots-vertical" />
            </MenuToggle>
            {DropdownCard2()}
          </MenuItem>
        </Menu>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
        <div className="relative donut-container w-full max-w-sm">
          <ApexChart
            ref={chartRef}
            id="contributions_chart"
            options={options}
            series={options.series}
            type="donut"
            width="100%"
            height="100%"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 w-full">
          {cardsData.map((card, i) => (
            <div key={card.title} className="flex flex-col bg-gray-100 dark:bg-gray-800 p-2 rounded-md">
              <div className="flex items-center gap-2">
                <KeenIcon icon={card.icon} className={`w-5 h-5 ${isUnbalanced[i] ? 'text-red-500' : card.iconColor}`} />
                <span className="text-sm text-gray-700 dark:text-gray-300">{card.title}</span>
              </div>
              {isUnbalanced[i] && (
                <span className="text-xs text-red-600 mt-1">{unbalancedMessages[i]}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className={`mt-4 text-center rounded-md py-2 text-sm font-medium 
        ${isBalanced ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
        {isBalanced ? (
          <div className="flex justify-center items-center gap-2">
            <KeenIcon icon="ki-filled ki-check-circle" className="w-4 h-4" />
            Todas as métricas estão equilibradas
          </div>
        ) : (
          <div className="flex justify-center items-center gap-2">
            <KeenIcon icon="ki-filled ki-warning" className="w-4 h-4" />
            {unbalancedCount} métrica{unbalancedCount > 1 ? 's' : ''} desequilibrada{unbalancedCount > 1 ? 's' : ''}
          </div>
        )}
      </div>
    </div>
  );
};

export { Contributions, type IContributionsProps };
