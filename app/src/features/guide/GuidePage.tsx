import { Navigate, Route, Routes } from 'react-router-dom';
import { SectionHeader } from '../../components/layout/SectionHeader';
import { TabBar } from '../../components/layout/TabBar';
import { AllianceDuelTab } from './tabs/AllianceDuelTab';
import { BuildingsTab } from './tabs/BuildingsTab';
import { CombatTab } from './tabs/CombatTab';
import { EquipmentTab } from './tabs/EquipmentTab';
import { EventsTab } from './tabs/EventsTab';
import { HeroesTab } from './tabs/HeroesTab';
import { RavenTab } from './tabs/RavenTab';
import { SoldiersTab } from './tabs/SoldiersTab';
import { SystemsTipsTab } from './tabs/SystemsTipsTab';
import { TechnologiesTab } from './tabs/TechnologiesTab';

const TABS = [
  { to: '/guide/heroes', label: 'Герои' },
  { to: '/guide/equipment', label: 'Снаряжение' },
  { to: '/guide/raven', label: 'Raven' },
  { to: '/guide/technologies', label: 'Технологии' },
  { to: '/guide/soldiers', label: 'Войска' },
  { to: '/guide/buildings', label: 'Постройки' },
  { to: '/guide/combat', label: 'Бой' },
  { to: '/guide/alliance-duel', label: 'Дуэль альянсов' },
  { to: '/guide/events', label: 'События' },
  { to: '/guide/systems-tips', label: 'Системы и советы' },
];

export function GuidePage() {
  return (
    <section className="section">
      <SectionHeader
        num="02 // ГАЙД"
        title="Last Asylum: Plague"
        sub="Справочник по игре"
      />
      <TabBar tabs={TABS} />
      <Routes>
        <Route index element={<Navigate to="heroes" replace />} />
        <Route path="heroes" element={<HeroesTab />} />
        <Route path="equipment" element={<EquipmentTab />} />
        <Route path="raven" element={<RavenTab />} />
        <Route path="technologies" element={<TechnologiesTab />} />
        <Route path="soldiers" element={<SoldiersTab />} />
        <Route path="buildings" element={<BuildingsTab />} />
        <Route path="combat" element={<CombatTab />} />
        <Route path="alliance-duel" element={<AllianceDuelTab />} />
        <Route path="events" element={<EventsTab />} />
        <Route path="systems-tips" element={<SystemsTipsTab />} />
      </Routes>
    </section>
  );
}
