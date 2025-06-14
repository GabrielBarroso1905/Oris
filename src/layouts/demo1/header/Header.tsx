import clsx from 'clsx';
import { useEffect } from 'react';
import { Container } from '@/components/container';
import { useDemo1Layout } from '../';
import { useLocation } from 'react-router';
import { toAbsoluteUrl } from '@/utils/Assets';

const Header = () => {
  const { headerSticky } = useDemo1Layout();
  const { pathname } = useLocation();

  useEffect(() => {
    if (headerSticky) {
      document.body.setAttribute('data-sticky-header', 'on');
    } else {
      document.body.removeAttribute('data-sticky-header');
    }
  }, [headerSticky]);

  return (
    <header
      className={clsx(
        'header fixed top-0 z-10 start-0 end-0 flex items-stretch shrink-0 bg-white dark:bg-[--tw-page-bg-dark]',
        headerSticky && 'shadow-sm'
      )}
    >
      <Container className="flex justify-center items-center gap-4 py-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src={toAbsoluteUrl('/public/media/images/Logo.png')}
            alt="Logo Oris"
            className="w-30 h-30 object-contain"
          />
        </div>
      </Container>
    </header>
  );
};

export { Header };
