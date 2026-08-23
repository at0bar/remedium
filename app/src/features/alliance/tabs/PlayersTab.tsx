import { useMemo, useState } from 'react';
import { Badge } from '../../../components/ui/Badge';
import { TableWrap } from '../../../components/ui/TableWrap';
import { useAlliancePlayers } from '../../../lib/api/hooks';
import { formatPowerM } from '../../../lib/format';
import type { AlliancePlayer, PlayerGroup } from '../../../lib/api/types';

const GROUP_RANK: Record<PlayerGroup, number> = { R1: 1, R2: 2, R3: 3, R4: 4, R5: 5 };

type SortMode = 'level' | 'group' | 'power' | 'group-power';

const SORT_LABELS: Record<SortMode, string> = {
  level: 'По уровню',
  group: 'По группе',
  power: 'По суммарной мощи',
  'group-power': 'По группе, внутри — по мощи',
};

function sortPlayers(players: AlliancePlayer[], mode: SortMode): AlliancePlayer[] {
  const sorted = [...players];
  switch (mode) {
    case 'level':
      return sorted.sort((a, b) => b.level - a.level);
    case 'group':
      return sorted.sort((a, b) => GROUP_RANK[b.group] - GROUP_RANK[a.group]);
    case 'power':
      return sorted.sort((a, b) => b.totalPowerM - a.totalPowerM);
    case 'group-power':
      return sorted.sort((a, b) => GROUP_RANK[b.group] - GROUP_RANK[a.group] || b.totalPowerM - a.totalPowerM);
  }
}

export function PlayersTab() {
  const { data: players, isLoading } = useAlliancePlayers();
  const [sortMode, setSortMode] = useState<SortMode>('group-power');

  const sorted = useMemo(() => sortPlayers(players ?? [], sortMode), [players, sortMode]);

  if (isLoading) {
    return <p style={{ color: 'var(--text2)', fontSize: 13 }}>Загрузка списка игроков…</p>;
  }

  return (
    <>
      <div className="auth-field" style={{ maxWidth: 320 }}>
        <label className="auth-label" htmlFor="players-sort">
          Сортировка
        </label>
        <select
          id="players-sort"
          className="auth-input"
          value={sortMode}
          onChange={(e) => setSortMode(e.target.value as SortMode)}
        >
          {(Object.keys(SORT_LABELS) as SortMode[]).map((mode) => (
            <option key={mode} value={mode}>
              {SORT_LABELS[mode]}
            </option>
          ))}
        </select>
      </div>

      <TableWrap>
        <table>
          <thead>
            <tr>
              <th>Ник</th>
              <th>Уровень</th>
              <th>Группа</th>
              <th>Суммарная мощь</th>
              <th>Стиль игры</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((player) => (
              <tr key={player.nick} className={player.isSelf ? 'self' : undefined}>
                <td>
                  <strong style={{ color: '#fff' }}>{player.nick}</strong>
                </td>
                <td>{player.level}</td>
                <td>
                  <Badge variant="gold">{player.group}</Badge>
                </td>
                <td>{formatPowerM(player.totalPowerM)}</td>
                <td>{player.playstyle}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableWrap>
    </>
  );
}
