import { Navigate, Route, Routes } from 'react-router-dom';
import { SectionHeader } from '../../components/layout/SectionHeader';
import { TabBar } from '../../components/layout/TabBar';
import { AlliancesTab } from './tabs/AlliancesTab';
import { GeneralInfoTab } from './tabs/GeneralInfoTab';
import { MapTab } from './tabs/MapTab';
import { RulesTab } from './tabs/RulesTab';

const TABS = [
  { to: '/server/info', label: 'Общая информация' },
  { to: '/server/map', label: 'Карта' },
  { to: '/server/rules', label: 'Правила' },
  { to: '/server/alliances', label: 'Союзы' },
];

export function ServerPage() {
  return (
    <section className="section">
      <SectionHeader num="03 // СЕРВЕР" title="337" sub="Общая информация, правила и союзы сервера" />
      <TabBar tabs={TABS} />
      <Routes>
        <Route index element={<Navigate to="info" replace />} />
        <Route path="info" element={<GeneralInfoTab />} />
        <Route path="map" element={<MapTab />} />
        <Route path="rules" element={<RulesTab />} />
        <Route path="alliances" element={<AlliancesTab />} />
      </Routes>
    </section>
  );
}
