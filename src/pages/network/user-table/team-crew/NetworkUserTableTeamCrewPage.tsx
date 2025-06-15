import { Fragment } from 'react';

import { Container } from '@/components/container';
import {
  Toolbar,
  ToolbarActions,
  ToolbarDescription,
  ToolbarHeading,
  ToolbarPageTitle
} from '@/partials/toolbar';

import { NetworkUserTableTeamCrewContent } from '.';
import { useLayout } from '@/providers';
import { Navbar } from '@/partials/navbar';
import { PageMenu } from '@/pages/public-profile';

const NetworkUserTableTeamCrewPage = () => {
  const { currentLayout } = useLayout();

  return (
    <Fragment>
     <Container className="flex justify-center">
        <Navbar>
          <PageMenu />
        </Navbar>
      </Container>
      

      <Container className='max-w-[1800px]'>
        <NetworkUserTableTeamCrewContent />
      </Container>
    </Fragment>
  );
};

export { NetworkUserTableTeamCrewPage };
