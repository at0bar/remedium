import type { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../features/auth/AuthContext';
import { useProfile } from '../../lib/api/hooks';
import { AllianceIcon, GuideIcon, ProfileIcon, ServerIcon, StatisticsIcon } from './NavIcons';

const NAV_ITEMS: { to: string; icon: ReactNode; label: string }[] = [
  { to: '/profile', icon: <ProfileIcon />, label: 'Профиль' },
  { to: '/guide', icon: <GuideIcon />, label: 'Гайд' },
  { to: '/server', icon: <ServerIcon />, label: 'Сервер' },
  { to: '/alliance', icon: <AllianceIcon />, label: 'Альянс' },
  { to: '/stats', icon: <StatisticsIcon />, label: 'Статистика' },
];

export function Sidebar({ open, onNavigate }: { open?: boolean; onNavigate?: () => void }) {
  const { user, logout } = useAuth();
  const { data: profile } = useProfile();
  const displayNick = profile?.nick ?? user?.nick ?? 'Гость';

  return (
    <nav className={`sidebar${open ? ' open' : ''}`}>
      <div className="sb-brand">
        <div className="sb-tag">Alliance Dashboard</div>
        <div className="sb-title">Remedium</div>
        <div className="sb-sub">// [IRON] ЦАРСТВО</div>
      </div>
      <div className="nav-grp">Разделы</div>
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          onClick={onNavigate}
          className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
        >
          <span className="nav-icon">{item.icon}</span>
          {item.label}
        </NavLink>
      ))}
      <div className="sb-foot">
        {displayNick}
        <br />
        <button
          type="button"
          onClick={logout}
          style={{
            background: 'none',
            border: 'none',
            color: 'inherit',
            font: 'inherit',
            letterSpacing: 'inherit',
            padding: 0,
            marginTop: 4,
            cursor: 'pointer',
            textDecoration: 'underline',
          }}
        >
          Выйти
        </button>
      </div>
    </nav>
  );
}
