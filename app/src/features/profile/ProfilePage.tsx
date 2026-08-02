import { Navigate, Route, Routes } from 'react-router-dom';
import { SectionHeader } from '../../components/layout/SectionHeader';
import { TabBar } from '../../components/layout/TabBar';
import { useProfile } from '../../lib/api/hooks';
import { OverviewTab } from './tabs/OverviewTab';
import { SettingsTab } from './tabs/SettingsTab';

const TABS = [
  { to: '/profile/overview', label: 'Обзор' },
  { to: '/profile/settings', label: 'Настройки' },
];

export function ProfilePage() {
  const { data: profile } = useProfile();

  return (
    <section className="section">
      <SectionHeader
        num="01 // ПРОФИЛЬ"
        title={profile?.nick ?? 'Профиль'}
        sub="Отряды и личная статистика"
      />
      <TabBar tabs={TABS} />
      <Routes>
        <Route index element={<Navigate to="overview" replace />} />
        <Route path="overview" element={<OverviewTab />} />
        <Route path="settings" element={<SettingsTab />} />
      </Routes>
    </section>
  );
}
