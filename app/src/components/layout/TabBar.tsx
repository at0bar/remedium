import { NavLink } from 'react-router-dom';

export interface TabItem {
  to: string;
  label: string;
}

export function TabBar({ tabs }: { tabs: TabItem[] }) {
  return (
    <div className="tabbar">
      {tabs.map((tab) => (
        <NavLink key={tab.to} to={tab.to} className={({ isActive }) => `tab${isActive ? ' active' : ''}`}>
          {tab.label}
        </NavLink>
      ))}
    </div>
  );
}
