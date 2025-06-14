import { Fragment } from 'react';
import { KeenIcon } from '@/components';
import { toAbsoluteUrl } from '@/utils/Assets';

interface IExternalServicesManageApiProps {
  title: string;
  switch: boolean;
}

const ExternalServicesManageApi = ({
  title,
  switch: showSwitch,
}: IExternalServicesManageApiProps) => {
  return (
    <Fragment>
      <style>
        {`
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
            background: conic-gradient(from 45deg, #3b82f6, #10b981);
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
        `}
      </style>

      <div className="card rounded-2xl shadow-sm overflow-hidden p-0 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-300">
        <div className="flex flex-col items-start gap-4 p-5 user-access-bg bg-no-repeat bg-[length:650px] bg-right">
          <div className="flex items-center gap-4">
            <div className="hexagon-container">
              <div className="hexagon"></div>
              <div className="hexagon-inner">
                <span className="text-xl font-semibold text-blue-600 dark:text-blue-400">183</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-900 dark:text-white">Pílulas Oris</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Moeda de troca para ser utilizadas na Oris.{' '}
                <a href="#" className="text-emerald-500 hover:underline">Sobre</a>
              </span>
            </div>
          </div>
        </div>

        {/* Botão aprimorado */}
        <div className="w-full bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-700 dark:to-blue-600 px-4 py-3 flex justify-between items-center group hover:from-blue-500 hover:to-blue-400 dark:hover:from-blue-600 dark:hover:to-blue-500 transition-all duration-200 cursor-pointer">
          <div className="flex items-center gap-2">
            <KeenIcon icon="ki-solid ki-gift" className="text-white opacity-90 group-hover:opacity-100" />
            <span className="text-white font-semibold text-sm">Pílula do Dia</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-300 font-medium text-sm">Disponível</span>
            <KeenIcon icon="ki-solid ki-arrow-right" className="text-white text-opacity-70 group-hover:text-opacity-100 transition-all" />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export { ExternalServicesManageApi, type IExternalServicesManageApiProps };