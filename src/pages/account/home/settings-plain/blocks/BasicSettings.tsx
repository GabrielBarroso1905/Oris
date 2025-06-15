import { CrudAvatarUpload } from '@/partials/crud';
import { KeenIcon } from '@/components';

interface IGeneralSettingsProps {
  title: string;
  userData?: {
    name: string;
    age: number;
    gender: string;
    sleepQuality: string;
    mood: string;
    anxiety: string;
    fluSymptoms: string;
    sector: string;
    usage: string;
  };
}

const BasicSettings = ({ title, userData }: IGeneralSettingsProps) => {
  // Dados de exemplo baseados na tabela (você pode passar via props)
  const defaultUserData = {
    name: 'Jason Tatum',
    age: 35,
    gender: 'masculino',
    sleepQuality: 'regular',
    mood: 'instável',
    anxiety: 'grave',
    fluSymptoms: 'Sim',
    sector: 'tecnologia',
    usage: 'semanal (1 acesso)'
  };

  const data = userData || defaultUserData;
  
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title flex items-center gap-2">
          <KeenIcon icon="profile-circle" className="w-5 h-5 text-primary" />
          {title}
        </h3>
        <div className="flex items-center gap-2">
          <KeenIcon icon="eye" className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600">Visualização</span>
        </div>
      </div>
      <div className="card-body">
        {/* Foto de Perfil */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
          <div className="flex items-center gap-3">
            <KeenIcon icon="picture" className="w-5 h-5 text-primary" />
            <span className="font-medium text-gray-700">Foto do Perfil</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <CrudAvatarUpload />
            <span className="text-xs text-gray-500">150x150px JPEG, PNG</span>
          </div>
        </div>

        {/* Informações Pessoais */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <KeenIcon icon="profile-user" className="w-4 h-4 text-primary" />
                <label className="text-sm font-medium text-gray-700">Nome Completo</label>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded p-3 text-gray-800">
                {data.name}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <KeenIcon icon="calendar-2" className="w-4 h-4 text-primary" />
                <label className="text-sm font-medium text-gray-700">Idade</label>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded p-3 text-gray-800">
                {data.age} anos
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <KeenIcon icon="people" className="w-4 h-4 text-primary" />
              <label className="text-sm font-medium text-gray-700">Gênero</label>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded p-3 text-gray-800 capitalize">
              {data.gender}
            </div>
          </div>
        </div>

        {/* Estado de Saúde */}
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-4">
            <KeenIcon icon="heart" className="w-5 h-5 text-red-500" />
            <h4 className="font-semibold text-gray-800">Estado de Saúde e Bem-estar</h4>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <KeenIcon icon="moon" className="w-4 h-4 text-primary" />
                <label className="text-sm font-medium text-gray-700">Qualidade do Sono</label>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded p-3 text-gray-800 capitalize">
                {data.sleepQuality}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <KeenIcon icon="happy" className="w-4 h-4 text-primary" />
                <label className="text-sm font-medium text-gray-700">Estado de Humor</label>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded p-3 text-gray-800 capitalize">
                {data.mood}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <KeenIcon icon="question-2" className="w-4 h-4 text-primary" />
                <label className="text-sm font-medium text-gray-700">Nível de Ansiedade (TAG-7)</label>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-gray-50 border border-gray-200 rounded p-3 text-gray-800 capitalize flex-1">
                  {data.anxiety}
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  data.anxiety === 'grave' ? 'bg-red-100 text-red-800' :
                  data.anxiety === 'leve' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {data.anxiety}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <KeenIcon icon="shield-cross" className="w-4 h-4 text-primary" />
                <label className="text-sm font-medium text-gray-700">Sintomas Gripais</label>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-gray-50 border border-gray-200 rounded p-3 text-gray-800 flex-1">
                  {data.fluSymptoms}
                </div>
                <KeenIcon 
                  icon={data.fluSymptoms === 'Sim' ? 'check-circle' : 'cross-circle'} 
                  className={`w-6 h-6 ${data.fluSymptoms === 'Sim' ? 'text-red-500' : 'text-green-500'}`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Informações Profissionais */}
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-4">
            <KeenIcon icon="office-bag" className="w-5 h-5 text-blue-500" />
            <h4 className="font-semibold text-gray-800">Informações Profissionais</h4>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <KeenIcon icon="office" className="w-4 h-4 text-primary" />
                <label className="text-sm font-medium text-gray-700">Setor de Atuação</label>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded p-3 text-gray-800 capitalize">
                {data.sector}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <KeenIcon icon="chart-line" className="w-4 h-4 text-primary" />
                <label className="text-sm font-medium text-gray-700">Frequência de Uso</label>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-gray-50 border border-gray-200 rounded p-3 text-gray-800 flex-1">
                  {data.usage}
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  data.usage.includes('semanal') ? 'bg-yellow-100 text-yellow-800' :
                  data.usage.includes('Excelente') ? 'bg-green-100 text-green-800' :
                  data.usage.includes('Ideal') ? 'bg-purple-100 text-purple-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {data.usage.includes('semanal') ? 'Semanal' :
                   data.usage.includes('Excelente') ? 'Excelente' :
                   data.usage.includes('Ideal') ? 'Ideal' : 'Inativo'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Rodapé Informativo */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <KeenIcon icon="information-2" className="w-4 h-4" />
            <span>Ficha médica - Dados do sistema</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export { BasicSettings, type IGeneralSettingsProps };