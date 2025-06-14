import { toAbsoluteUrl } from '@/utils/Assets';
import { useState } from 'react';

interface IIntegrationProps {
  logo: string;
  name: string;
  description: string;
}

const CardIntegration = ({ logo, name, description }: IIntegrationProps) => {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const cardColor = fileName ? 'bg-green-50 border-green-300' : 'bg-white';

  return (
    <div
      className={`card flex flex-col items-center text-center border transition-colors duration-300 ${cardColor}`}
    >
      <div className="card-body p-5 lg:p-7.5 flex flex-col items-center justify-center">
        <div className="flex items-center justify-center mb-3 lg:mb-5">
          <img
            src={toAbsoluteUrl(`/media/brand-logos/${logo}`)}
            className="h-11 shrink-0"
            alt={name}
          />
        </div>

        <div className="flex flex-col items-center gap-1 lg:gap-2.5">
          <p className="text-base font-medium text-gray-900">{name}</p>
          <span className="text-2sm text-gray-700">{description}</span>

          {fileName && (
            <span className="mt-2 text-xs text-green-600 font-medium">
              Arquivo adicionado: <br />
              <span className="text-gray-800">{fileName}</span>
            </span>
          )}
        </div>
      </div>

      <div className="card-footer flex flex-col items-center justify-center py-3.5 gap-2">
        <label className="btn btn-sm btn-primary cursor-pointer">
          {fileName ? 'Atualizar Exame' : 'Importar Arquivo'}
          <input type="file" accept=".pdf,.jpg,.png" hidden onChange={handleFileChange} />
        </label>
      </div>
    </div>
  );
};

export { CardIntegration, type IIntegrationProps };
