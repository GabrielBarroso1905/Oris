import { Fragment } from 'react';

import { toAbsoluteUrl } from '@/utils/Assets';
import { KeenIcon } from '@/components';
import { Container } from '@/components/container';

import { UserProfileHero } from '@/partials/heros';
import { Navbar, NavbarActions, NavbarDropdown } from '@/partials/navbar';
import { PageMenu } from '@/pages/public-profile';

import { ProfileCRMContent } from '.';
import Dashboard from '@/pages/network/user-table/team-crew/blocks/users/DashboardView';

const ProfileCRMPage = () => {
  const image = (
    <img
      src={toAbsoluteUrl('/media/avatars/300-1.png')}
      className="rounded-full border-3 border-success size-[100px] shrink-0"
    />
  );

  return (
    <Fragment>

   <Container className="flex justify-center">
        <Navbar>
          <PageMenu />
        </Navbar>
      </Container>

      <Container>
         <Dashboard />
      </Container>
    </Fragment>
  );
};

export { ProfileCRMPage };
