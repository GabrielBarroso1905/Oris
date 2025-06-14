import { Fragment } from 'react';

import { toAbsoluteUrl } from '@/utils/Assets';
import { KeenIcon } from '@/components';
import { Container } from '@/components/container';

import { UserProfileHero } from '@/partials/heros';
import { Navbar, NavbarActions, NavbarDropdown } from '@/partials/navbar';
import { PageMenu } from '@/pages/public-profile';
import { ProfileCreatorContent } from './ProfileCreatorContent';



const ProfileCreatorPage = () => {
  const image = (
    <div className="flex items-center justify-center rounded-full border-2 border-danger-clarity bg-light size-[100px] shrink-0">
      <img src={toAbsoluteUrl('/media/brand-logos/inferno.svg')} className="size-11" />
    </div>
  );

  return (
    <Fragment>


   <Container className="flex justify-center">
        <Navbar>
          <PageMenu />
        </Navbar>
      </Container>

      <Container>
        <ProfileCreatorContent />
      </Container>
    </Fragment>
  );
};

export { ProfileCreatorPage };
