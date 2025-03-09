import { observer } from 'mobx-react-lite';
import { useLocation } from 'react-router';

import { userStore } from '../../stores/user-store';
import ProfileBadge from './profile-badge';
import { useCallback, useState } from 'react';
import { debounce } from '../../util/debounce';
import StorageService from '../../services/storage-service';
import ExpendMenu from '../nav/expend-menu';
import ParentNavItem from '../nav/parent-nav-item';
import AppErrorMessage from './app-error-message';
import MobileMenu from './mobile-menu';

export type LinkType = {
  label: string;
  link: string;
};

const generalLinks: LinkType[] = [
  {
    label: 'Dashboard',
    link: '/dashboard',
  },
  {
    label: 'Marketplace',
    link: 'marketplace',
  },
  {
    label: 'About',
    link: 'about',
  },
];

const Header = observer(() => {
  // const location = window.location.pathname;
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const logoutDebounce = useCallback(
    debounce(() => {
      userStore.logout();
      StorageService.clear();
    }, 1500),
    []
  );

  return (
    <header>
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        {userStore.isLoggedIn && <ProfileBadge />}

        <ExpendMenu setMenuOpen={setMobileMenuOpen} />

        <div className="hidden lg:flex lg:gap-x-12">
          <div className="relative">
            <ParentNavItem label="Product" />
          </div>

          {generalLinks.map((gl) => (
            <a
              key={gl.label}
              href={gl.link}
              className="text-sm/6 font-semibold hover:underline"
            >
              {gl.label}
            </a>
          ))}
        </div>
        {location.pathname !== '/login' && (
          <div className="hidden lg:flex lg:justify-end">
            {userStore.isLoggedIn ? (
              <a onClick={logoutDebounce} className="text-sm/6 font-semibold">
                Log out <span aria-hidden="true">&rarr;</span>
              </a>
            ) : (
              <a href="/login" className="text-sm/6 font-semibold">
                Log in <span aria-hidden="true">&rarr;</span>
              </a>
            )}
          </div>
        )}
      </nav>

      <MobileMenu
        links={generalLinks}
        isOpen={mobileMenuOpen}
        setMenuOpen={setMobileMenuOpen}
      />
      <AppErrorMessage />
    </header>
  );
});

export default Header;
