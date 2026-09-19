import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { MobileTopBar } from './MobileTopBar';
import { Sidebar } from './Sidebar';

export function AppLayout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <>
      <MobileTopBar onToggle={() => setMobileNavOpen((open) => !open)} />
      <Sidebar open={mobileNavOpen} onNavigate={() => setMobileNavOpen(false)} />
      <div className={`sidebar-backdrop${mobileNavOpen ? ' open' : ''}`} onClick={() => setMobileNavOpen(false)} />
      <div className="main">
        <div className="content">
          <Outlet />
        </div>
      </div>
    </>
  );
}
