import { Link } from 'react-router-dom';
import { Callout } from '../../../components/ui/Callout';
import { Card, CardTitle } from '../../../components/ui/Card';
import { StatTile } from '../../../components/ui/StatTile';
import { useProfile } from '../../../lib/api/hooks';
import { formatDate, formatPowerM, sumPowerM } from '../../../lib/format';

export function OverviewTab() {
  const { data: profile, isLoading } = useProfile();

  if (isLoading || !profile) {
    return <p style={{ color: 'var(--text2)', fontSize: 13 }}>Загрузка профиля…</p>;
  }

  const totalPower = sumPowerM(profile.squads.map((s) => s.powerM));

  return (
    <>
      <Callout kind="tip">
        <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', gap: 12, flexWrap: 'wrap' }}>
          <span>
            Ты <b>мощнее чем {profile.stats.strongerThanPercent}%</b> игроков альянса — входишь в топ по суммарной мощи
            отрядов.
          </span>
          <Link
            to="/stats/rating"
            style={{ color: 'var(--gold-lt)', fontFamily: 'var(--mono)', fontSize: 12, whiteSpace: 'nowrap', textDecoration: 'none' }}
          >
            Смотреть рейтинг →
          </Link>
        </span>
      </Callout>

      <div className="g-auto">
        <StatTile value={String(profile.level)} label="Уровень" sub={`Ранг ${profile.group}`} />
        <StatTile value={formatPowerM(totalPower)} label="Суммарная мощь" />
        <StatTile value={profile.playstyle} label="Стиль игры" />
        <StatTile value={`${profile.coords.x}:${profile.coords.y}`} label="Координаты" sub={`Мифриловый зал`} />
      </div>

      <div className="blabel">Отряды ({profile.squads.length}/4) · суммарная мощь {formatPowerM(totalPower)}</div>
      <div className="g-auto">
        {profile.squads.map((squad) => (
          <Card accent="gold" key={squad.name}>
            <CardTitle>{squad.name}</CardTitle>
            <p>
              Мощь: <strong style={{ color: '#fff' }}>{formatPowerM(squad.powerM)}</strong>
            </p>
          </Card>
        ))}
      </div>

      <div className="blabel">Краткая статистика</div>
      <div className="g-auto">
        <StatTile value={profile.stats.avgDuelScore.toLocaleString('ru-RU')} label="Ср. очки дуэли альянсов" />
        <StatTile value={`#${profile.stats.avgDuelRank}`} label="Ср. место в рейтинге дуэли" />
        <StatTile value={formatDate(profile.stats.lastCoachmanDate)} label="Последний раз кучером" />
      </div>
    </>
  );
}
