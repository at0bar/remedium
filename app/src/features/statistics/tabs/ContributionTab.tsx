import { ContributionScale } from './ContributionScale';

export function ContributionTab() {
  return (
    <>
      <div className="blabel">Рейтинг вклада в дуэль альянса</div>
      <p style={{ color: 'var(--text2)', fontSize: 13, margin: '0 0 14px' }}>
        Линии R1 / R2 / R3 — ориентировочные пороги очков для групп.
      </p>
      <ContributionScale />
    </>
  );
}
