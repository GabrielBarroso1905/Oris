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
          name="Dra. Helena Martins"
          image={image}
          info={[
            { label: 'Psicóloga Clínica', icon: 'user' },
            { label: 'Especialista em Saúde Mental no Trabalho', icon: 'award' },
            { label: 'Mestrado em Psicologia Organizacional', icon: 'school' },
            { label: 'São Paulo, SP', icon: 'geolocation' },
            { label: 'helena.martins@gmail.com', icon: 'sms' }
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
