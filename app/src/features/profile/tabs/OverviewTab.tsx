import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '../../../components/ui/Badge';
import { EditIcon, TrashIcon } from '../../../components/ui/ActionIcons';
import { Button } from '../../../components/ui/Button';
import { Callout } from '../../../components/ui/Callout';
import { StatTile } from '../../../components/ui/StatTile';
import { SquadBlock } from '../../../components/ui/SquadBlock';
import { useAddSquad, useDeleteSquad, useProfile, useUpdateSquad } from '../../../lib/api/hooks';
import { formatDate, formatPercentChange, formatPowerM, sumPowerM } from '../../../lib/format';
import { SquadEditForm } from './SquadEditForm';

export function OverviewTab() {
  const { data: profile, isLoading } = useProfile();
  const addSquad = useAddSquad();
  const updateSquad = useUpdateSquad();
  const deleteSquad = useDeleteSquad();
  const [editingId, setEditingId] = useState<string | 'new' | null>(null);

  if (isLoading || !profile) {
    return <p style={{ color: 'var(--text2)', fontSize: 13 }}>Загрузка профиля…</p>;
  }

  const totalPower = sumPowerM(profile.squads.map((s) => s.powerM));
  const canAddSquad = profile.squads.length < 4;

  return (
    <>
      {profile.stats.strongerThanPercent !== null && profile.stats.strongerThanPercent > 50 && (
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
      )}

      <div className="g-auto">
        <StatTile value={String(profile.level)} label="Уровень" sub={`Ранг ${profile.group}`} />
        <StatTile
          value={formatPowerM(totalPower)}
          label="Суммарная мощь"
          sub={`${formatPercentChange(profile.stats.weeklyPowerChangePercent)} за неделю`}
          subTone={
            profile.stats.weeklyPowerChangePercent === null
              ? 'muted'
              : profile.stats.weeklyPowerChangePercent > 0
                ? 'positive'
                : profile.stats.weeklyPowerChangePercent < 0
                  ? 'negative'
                  : 'muted'
          }
        />
        <StatTile value={profile.playstyle} label="Стиль игры" />
        <StatTile value={`${profile.coords.x}:${profile.coords.y}`} label="Координаты" sub={`Мифриловый зал`} />
      </div>

      <div className="blabel">Отряды ({profile.squads.length}/4) · суммарная мощь {formatPowerM(totalPower)}</div>
      {profile.squads.map((squad) =>
        editingId === squad.id ? (
          <SquadEditForm
            key={squad.id}
            initial={squad}
            onSave={(data) => {
              updateSquad.mutate({ ...squad, ...data }, { onSuccess: () => setEditingId(null) });
            }}
            onCancel={() => setEditingId(null)}
          />
        ) : (
          <SquadBlock
            key={squad.id}
            title={squad.name}
            headerBadge={
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <Badge variant="gold">{formatPowerM(squad.powerM)}</Badge>
                <Button
                  variant="neutral"
                  size="sm"
                  iconOnly
                  aria-label="Редактировать"
                  title="Редактировать"
                  onClick={() => setEditingId(squad.id)}
                >
                  <EditIcon />
                </Button>
                <Button
                  variant="red"
                  size="sm"
                  iconOnly
                  aria-label="Удалить"
                  title="Удалить"
                  onClick={() => deleteSquad.mutate(squad.id)}
                >
                  <TrashIcon />
                </Button>
              </div>
            }
            slots={squad.heroes.map((name, i) => ({ role: `Герой ${i + 1}`, name: name || '—' }))}
          />
        ),
      )}

      {editingId === 'new' && (
        <SquadEditForm
          initial={null}
          onSave={(data) => {
            addSquad.mutate(data, { onSuccess: () => setEditingId(null) });
          }}
          onCancel={() => setEditingId(null)}
        />
      )}
      {canAddSquad && editingId !== 'new' && (
        <Button variant="gold" onClick={() => setEditingId('new')}>
          + Добавить отряд
        </Button>
      )}

      <div className="blabel">Краткая статистика</div>
      <div className="g-auto">
        <StatTile
          value={profile.stats.avgDuelScore === null ? '—' : profile.stats.avgDuelScore.toLocaleString('ru-RU')}
          label="Ср. очки дуэли альянсов"
        />
        <StatTile value={profile.stats.avgDuelRank === null ? '—' : `#${profile.stats.avgDuelRank}`} label="Ср. место в рейтинге дуэли" />
        <StatTile value={formatDate(profile.stats.lastCoachmanDate)} label="Последний раз был назначен в караван" />
      </div>
    </>
  );
}
