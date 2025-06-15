import { Fragment } from 'react';

import { toAbsoluteUrl } from '@/utils/Assets';
import { Container } from '@/components/container';
import { KeenIcon } from '@/components';

import { UserProfileHero } from '@/partials/heros';
import { Navbar, NavbarActions, NavbarDropdown } from '@/partials/navbar';
import { PageMenu } from '@/pages/public-profile';

import { ProfileFeedsContent } from '.';

const ProfileFeedsPage = () => {
  const image = (
    <img
      src={toAbsoluteUrl('/media/avatars/300-1.png')}
      className="rounded-full border-3 border-success size-[100px] shrink-0"
    />
  );

  return (
    <Fragment>
      <UserProfileHero
        name="Jenny Klabber"
        image={image}
        info={[
          { label: 'KeenThemes', icon: 'abstract' },
          { label: 'SF, Bay Area', icon: 'geolocation' },
          { email: 'jenny@kteam.com', icon: 'sms' }
        ]}
      />

      <Container className='flex justify-center'>
      <Navbar>
          <PageMenu />
      </Navbar>
      </Container>
      

      <Container>
        <ProfileFeedsContent />
      </Container>
    </Fragment>
  );
};

export { ProfileFeedsPage };
