import { CardIntegration } from '@/partials/cards';
import { ReactNode, useRef } from 'react';

interface IIntegrationsItem {
  logo: string;
  path: string;
  name: string;
  description: string;
  actions: ReactNode;
}
interface IIntegrationsItems extends Array<IIntegrationsItem> {}

const Integrations = () => {
  const fileInputs = useRef<HTMLInputElement[]>([]);

  const handleFileUpload = (index: number) => {
    if (fileInputs.current[index]) {
      fileInputs.current[index].click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (file) {
      alert(`Arquivo "${file.name}" anexado para o exame "${items[index].name}".`);
    }
  };

  const items: IIntegrationsItems = [
    {
      logo: 'jira.svg',
      path: '#',
      name: 'Exame de Sangue',
      description: 'Anexe aqui seu exame completo de sangue atualizado.',
      actions: (
        <>
          <input
            type="file"
            accept=".pdf,.jpg,.png"
            hidden
            ref={(el) => (fileInputs.current[0] = el!)}
            onChange={(e) => handleFileChange(e, 0)}
          />
          <button
            onClick={() => handleFileUpload(0)}
            className="btn btn-sm btn-primary mt-2"
          >
            Importar Arquivo
          </button>
        </>
      )
    },
    {
      logo: 'inferno.svg',
      path: '#',
      name: 'Raio-X do Tórax',
      description: 'Anexe seu exame de imagem do tórax.',
      actions: (
        <>
          <input
            type="file"
            accept=".pdf,.jpg,.png"
            hidden
            ref={(el) => (fileInputs.current[1] = el!)}
            onChange={(e) => handleFileChange(e, 1)}
          />
          <button
            onClick={() => handleFileUpload(1)}
            className="btn btn-sm btn-primary mt-2"
          >
            Importar Arquivo
          </button>
        </>
      )
    },
    {
      logo: 'evernote.svg',
      path: '#',
      name: 'Eletrocardiograma',
      description: 'Anexe o exame de eletrocardiograma em PDF ou imagem.',
      actions: (
        <>
          <input
            type="file"
            accept=".pdf,.jpg,.png"
            hidden
            ref={(el) => (fileInputs.current[2] = el!)}
            onChange={(e) => handleFileChange(e, 2)}
          />
          <button
            onClick={() => handleFileUpload(2)}
            className="btn btn-sm btn-primary mt-2"
          >
            Importar Arquivo
          </button>
        </>
      )
    },
    {
      logo: 'gitlab.svg',
      path: '#',
      name: 'Exame de Urina',
      description: 'Adicione seu exame de urina para avaliação médica.',
      actions: (
        <>
          <input
            type="file"
            accept=".pdf,.jpg,.png"
            hidden
            ref={(el) => (fileInputs.current[3] = el!)}
            onChange={(e) => handleFileChange(e, 3)}
          />
          <button
            onClick={() => handleFileUpload(3)}
            className="btn btn-sm btn-primary mt-2"
          >
            Importar Arquivo
          </button>
        </>
      )
    }
  ];

  const renderItem = (item: IIntegrationsItem, index: number) => {
    return (
      <CardIntegration
        logo={item.logo}
        // path={item.path}
        name={item.name}
        description={item.description}
        // actions={item.actions}
        key={index}
      />
    );
  };

return (
  <div id="integrations_cards" className="p-4 lg:p-6">
    <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Mantenha seus exames atualizados.</h1>

    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-7.5">
      {items.map((item, index) => renderItem(item, index))}
    </div>
  </div>
);
};

export { Integrations, type IIntegrationsItem, type IIntegrationsItems };
