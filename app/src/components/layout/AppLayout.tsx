import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { DEFAULT_ALLIANCE_NAME, useSettings } from '../../lib/api/hooks';
import { MobileTopBar } from './MobileTopBar';
import { Sidebar } from './Sidebar';

export function AppLayout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { data: settings } = useSettings();

  useEffect(() => {
    document.title = `Remedium — ${settings?.allianceName ?? DEFAULT_ALLIANCE_NAME}`;
  }, [settings?.allianceName]);

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
