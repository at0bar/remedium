import { Callout } from '../../../components/ui/Callout';
import { ContributionScale } from './ContributionScale';

export function ContributionTab() {
  return (
    <>
      <Callout kind="info">
        Данные на этой странице отражают рейтинг за прошлую неделю — по ним начисляются повышения и понижения групп.
      </Callout>

      <div className="blabel">Рейтинг вклада в дуэль альянса</div>
      <p style={{ color: 'var(--text2)', fontSize: 13, margin: '0 0 14px' }}>
        Линии R1 / R2 / R3 — ориентировочные пороги очков для групп.
      </p>
      <ContributionScale />
    </>
  );
}
