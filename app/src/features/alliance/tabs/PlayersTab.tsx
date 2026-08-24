import { useMemo, useState } from 'react';
import { Badge, GROUP_BADGE_VARIANT } from '../../../components/ui/Badge';
import { EditIcon, TrashIcon } from '../../../components/ui/ActionIcons';
import { Button } from '../../../components/ui/Button';
import { TableWrap } from '../../../components/ui/TableWrap';
import { useAddPlayer, useAlliancePlayers, useDeletePlayer, useUpdatePlayer } from '../../../lib/api/hooks';
import { formatPowerM } from '../../../lib/format';
import type { AlliancePlayer, PlayerGroup } from '../../../lib/api/types';
import { PlayerEditRow } from './PlayerEditRow';

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
  const addPlayer = useAddPlayer();
  const updatePlayer = useUpdatePlayer();
  const deletePlayer = useDeletePlayer();
  const [editingId, setEditingId] = useState<string | 'new' | null>(null);

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
        <table className="tbl-fixed">
          <colgroup>
            <col style={{ width: '34%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '16%' }} />
            <col style={{ width: '18%' }} />
            <col style={{ width: '12%' }} />
          </colgroup>
          <thead>
            <tr>
              <th>Ник</th>
              <th>Уровень</th>
              <th>Группа</th>
              <th>Суммарная мощь</th>
              <th>Стиль игры</th>
              <th className="tbl-actions">Действия</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((player) =>
              editingId === player.id ? (
                <PlayerEditRow
                  key={player.id}
                  initial={player}
                  onSave={(data) =>
                    updatePlayer.mutate({ ...player, ...data }, { onSuccess: () => setEditingId(null) })
                  }
                  onCancel={() => setEditingId(null)}
                />
              ) : (
                <tr key={player.id} className={player.isSelf ? 'self' : undefined}>
                  <td className="tbl-cell-ellipsis">
                    <strong style={{ color: '#fff' }}>{player.nick}</strong>
                  </td>
                  <td>{player.level}</td>
                  <td>
                    <Badge variant={GROUP_BADGE_VARIANT[player.group]}>{player.group}</Badge>
                  </td>
                  <td>{formatPowerM(player.totalPowerM)}</td>
                  <td>{player.playstyle}</td>
                  <td className="tbl-actions">
                    <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                      <Button
                        variant="neutral"
                        size="sm"
                        iconOnly
                        aria-label="Редактировать"
                        title="Редактировать"
                        onClick={() => setEditingId(player.id)}
                      >
                        <EditIcon />
                      </Button>
                      <Button
                        variant="red"
                        size="sm"
                        iconOnly
                        aria-label="Удалить"
                        title="Удалить"
                        onClick={() => deletePlayer.mutate(player.id)}
                      >
                        <TrashIcon />
                      </Button>
                    </div>
                  </td>
                </tr>
              ),
            )}
            {editingId === 'new' && (
              <PlayerEditRow
                initial={null}
                onSave={(data) => addPlayer.mutate(data, { onSuccess: () => setEditingId(null) })}
                onCancel={() => setEditingId(null)}
              />
            )}
          </tbody>
        </table>
      </TableWrap>

      {editingId !== 'new' && (
        <div style={{ marginTop: 12 }}>
          <Button variant="gold" onClick={() => setEditingId('new')}>
            + Добавить игрока
          </Button>
        </div>
      )}
    </>
  );
}
