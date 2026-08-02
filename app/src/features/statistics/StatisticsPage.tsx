import { Navigate, Route, Routes } from 'react-router-dom';
import { SectionHeader } from '../../components/layout/SectionHeader';
import { TabBar } from '../../components/layout/TabBar';
import { ContributionTab } from './tabs/ContributionTab';
import { RatingTab } from './tabs/RatingTab';

const TABS = [
  { to: '/stats/contribution', label: 'Анализ вклада' },
  { to: '/stats/rating', label: 'Рейтинг игроков' },
];

export function StatisticsPage() {
  return (
    <section className="section">
      <SectionHeader num="04 // СТАТИСТИКА" title="Статистика" sub="Недельная динамика и вклад участников альянса" />
      <TabBar tabs={TABS} />
      <Routes>
        <Route index element={<Navigate to="contribution" replace />} />
        <Route path="contribution" element={<ContributionTab />} />
        <Route path="rating" element={<RatingTab />} />
      </Routes>
    </section>
  );
}
