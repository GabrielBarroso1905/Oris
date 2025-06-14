import { Fragment } from 'react';

import { toAbsoluteUrl } from '@/utils/Assets';
import { KeenIcon } from '@/components';
import { Container } from '@/components/container';

import { UserProfileHero } from '@/partials/heros';
import { Navbar, NavbarActions, NavbarDropdown } from '@/partials/navbar';
import { PageMenu } from '@/pages/public-profile';

import { ProfileCompanyContent } from './';
import { AccountIntegrationsContent } from '@/pages/account/integrations';

const ProfileCompanyPage = () => {
  return (
    <Fragment>

 <Container className="flex justify-center">
        <Navbar>
          <PageMenu />
        </Navbar>
      </Container>

      <Container>
         <AccountIntegrationsContent />
      </Container>
    </Fragment>
  );
};

export { ProfileCompanyPage };
