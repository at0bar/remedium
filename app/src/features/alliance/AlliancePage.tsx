import { Navigate, Route, Routes } from 'react-router-dom';
import { SectionHeader } from '../../components/layout/SectionHeader';
import { TabBar } from '../../components/layout/TabBar';
import { DEFAULT_ALLIANCE_NAME, useSettings } from '../../lib/api/hooks';
import { useAuth } from '../auth/AuthContext';
import { CaravanTab } from './tabs/CaravanTab';
import { ElixirRaceTab } from './tabs/ElixirRaceTab';
import { EventsTab } from './tabs/EventsTab';
import { FormationTab } from './tabs/FormationTab';
import { PlayersTab } from './tabs/PlayersTab';
import { SettingsTab } from './tabs/SettingsTab';

const BASE_TABS = [
  { to: '/alliance/players', label: 'Игроки' },
  { to: '/alliance/formation', label: 'Формация' },
  { to: '/alliance/events', label: 'События' },
  { to: '/alliance/caravan', label: 'Караван' },
  { to: '/alliance/elixir-race', label: 'Гонка за элексиром' },
];

export function AlliancePage() {
  const { user } = useAuth();
  const { data: settings } = useSettings();
  const canEdit = user?.canEdit ?? false;
  const tabs = canEdit ? [...BASE_TABS, { to: '/alliance/settings', label: 'Настройки' }] : BASE_TABS;
  const allianceName = settings?.allianceName ?? DEFAULT_ALLIANCE_NAME;

  return (
    <section className="section">
      <SectionHeader num="04 // АЛЬЯНС" title={allianceName} sub="Состав альянса, события и распределение ролей" />
      <TabBar tabs={tabs} />
      <Routes>
        <Route index element={<Navigate to="players" replace />} />
        <Route path="players" element={<PlayersTab />} />
        <Route path="formation" element={<FormationTab />} />
        <Route path="events" element={<EventsTab />} />
        <Route path="caravan" element={<CaravanTab />} />
        <Route path="elixir-race" element={<ElixirRaceTab />} />
        {canEdit && <Route path="settings" element={<SettingsTab />} />}
        <Route path="*" element={<Navigate to="/alliance/players" replace />} />
      </Routes>
    </section>
  );
}
