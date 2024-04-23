import { createMenuItems, useViewConfig } from '@vaadin/hilla-file-router/runtime.js';
import { AppLayout } from '@vaadin/react-components/AppLayout.js';
import { DrawerToggle } from '@vaadin/react-components/DrawerToggle.js';
import { ProgressBar } from '@vaadin/react-components/ProgressBar';
import { Suspense, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

const navLinkClasses = ({ isActive }: any) => {
  return `block rounded-m p-s ${isActive ? 'bg-primary-10 text-primary' : 'text-body'}`;
};

const defaultTitle = 'Hilla AutoGrid CSV-Export';

export default function MainLayout() {
  const navigate = useNavigate();
  const currentTitle = useViewConfig()?.title ?? defaultTitle;

  useEffect(() => {
    document.title = currentTitle;
  }, [currentTitle]);

  return (
    <AppLayout primarySection='drawer'>
      <div slot='drawer' className='flex flex-col justify-between h-full p-m'>
        <header className='flex flex-col gap-m'>
          <h1 className='text-l m-0' onClick={() => navigate('/')}>
            {defaultTitle}
          </h1>
          <nav>
            {createMenuItems().map(({ to, icon, title }) => (
              <NavLink className={navLinkClasses} to={to} key={to}>
                {title}
              </NavLink>
            ))}
          </nav>
        </header>
      </div>

      <DrawerToggle slot='navbar' aria-label='Menu toggle'></DrawerToggle>

      <Suspense fallback={<ProgressBar indeterminate className='m-0' />}>
        <section className='view'>
          <Outlet />
        </section>
      </Suspense>
    </AppLayout>
  );
}
