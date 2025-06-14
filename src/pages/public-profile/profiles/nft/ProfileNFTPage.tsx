import { Fragment } from 'react';

import { Container } from '@/components/container';
import { toAbsoluteUrl } from '@/utils/Assets';
import { KeenIcon } from '@/components';

import { UserProfileHero } from '@/partials/heros';
import { Navbar, NavbarActions, NavbarDropdown } from '@/partials/navbar';
import { PageMenu } from '@/pages/public-profile';

import { ProfileNFTContent } from '.';

const ProfileNFTPage = () => {
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
        <ProfileNFTContent />
      </Container>
    </Fragment>
  );
};

export { ProfileNFTPage };
