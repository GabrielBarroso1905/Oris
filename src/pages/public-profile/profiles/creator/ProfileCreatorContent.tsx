
import { ExternalServicesManageApi } from '@/pages/account/home/settings-sidebar';
import { HealthMissionsDashboard } from '../default/blocks/CommunityBadges2';


const ProfileCreatorContent = () => {
  const userName = 'Pedro';
  const userId = '20222SI0026';

  return (
    <div className="xl:grid-cols-3 gap-5 lg:gap-7.5">
      {/* Saudação do usuário */}
    <div className="flex justify-center">
        <div className="w-full max-w-3xl px-6"> {/* Added container with padding */}
          <div className="flex items-center gap-4">
            {/* Greeting */}
            <div className="flex flex-col py-4"> {/* Added vertical padding */}
              <span className="text-xl font-bold text-blue-600">Olá, {userName}</span>
              <span className="text-sm text-gray-500">{userId}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo do perfil */}
      <div className="flex justify-center">
        <div className="grid gap-5">
          <ExternalServicesManageApi title="Public API Key" switch={true} />
          <HealthMissionsDashboard title="Community Badges" />
          {/* <Contributions title="Investments" /> */}
        </div>
      </div>
    </div>
  );
};

export { ProfileCreatorContent };
