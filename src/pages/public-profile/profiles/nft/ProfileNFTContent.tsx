

import { BasicSettings } from '@/pages/account/home/settings-plain';
import { CommunityBadges } from '../default';
import { About, Assets, Network, Tokens3dArt, TokensCollected, TokensCreated } from './blocks';

const ProfileNFTContent = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-7.5">
      <div className="col-span-3">
        <div className="grid gap-5 lg:gap-7.5">
          <BasicSettings title="Basic Settings" />
        </div>
      </div>
    </div>
  );
};

export { ProfileNFTContent };
