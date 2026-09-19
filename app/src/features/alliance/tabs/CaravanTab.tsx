import { useState } from 'react';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { DiceIcon, EditIcon } from '../../../components/ui/ActionIcons';
import { TableWrap } from '../../../components/ui/TableWrap';
import { useAuth } from '../../auth/AuthContext';
import { useAddCaravanRun, useAlliancePlayers, useCaravan, useRollCaravan, useUpdateCaravanRun } from '../../../lib/api/hooks';
import { formatDate } from '../../../lib/format';
import type { CaravanDraw } from '../../../lib/api/types';
import { CaravanEditRow } from './CaravanEditRow';
import { CaravanMemberCell } from './CaravanMemberCell';
import { CaravanRollModal, ROLE_BADGE } from './CaravanRollModal';

const ROLL_ANIMATION_MS = 2000;

export function CaravanTab() {
  const { user } = useAuth();
  const canEdit = user?.canEdit ?? false;
  const { data: runs, isLoading } = useCaravan();
  const { data: players } = useAlliancePlayers();
  const rollCaravan = useRollCaravan();
  const addRun = useAddCaravanRun();
  const updateRun = useUpdateCaravanRun();

  const [rolling, setRolling] = useState(false);
  const [draw, setDraw] = useState<CaravanDraw | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  if (isLoading) {
    return <p style={{ color: 'var(--text2)', fontSize: 13 }}>Загрузка каравана…</p>;
  }

  const handleRoll = () => {
    if (rolling) return;
    setRolling(true);
    window.setTimeout(() => {
      setRolling(false);
      rollCaravan.mutate(undefined, { onSuccess: setDraw });
    }, ROLL_ANIMATION_MS);
  };

  const handleReroll = () => {
    rollCaravan.mutate(undefined, { onSuccess: setDraw });
  };

  const handleConfirm = () => {
    if (!draw) return;
    addRun.mutate(draw, { onSuccess: () => setDraw(null) });
  };

  return (
    <>
      {canEdit && (
        <div className="caravan-roll-bar">
          <Button
            variant="gold"
            className={`caravan-roll-btn${rolling ? ' rolling' : ''}`}
            onClick={handleRoll}
            disabled={rolling || !players || players.length < 2}
          >
            <DiceIcon />
            {rolling ? 'Крутим…' : 'Разыграть'}
          </Button>
        </div>
      )}

      <TableWrap>
        <table className="tbl-fixed">
          <colgroup>
            <col style={{ width: '32%' }} />
            <col style={{ width: '32%' }} />
            <col style={{ width: '14%' }} />
            <col style={{ width: '14%' }} />
            <col style={{ width: '8%' }} />
          </colgroup>
          <thead>
            <tr>
              <th>Кучер</th>
              <th>Спутник</th>
              <th>Роль спутника</th>
              <th>Дата последнего назначения</th>
              <th className="tbl-actions">Действия</th>
            </tr>
          </thead>
          <tbody>
            {runs?.map((run) =>
              editingId === run.id ? (
                <CaravanEditRow
                  key={run.id}
                  run={run}
                  onSave={(data) => updateRun.mutate(data, { onSuccess: () => setEditingId(null) })}
                  onCancel={() => setEditingId(null)}
                />
              ) : (
                <tr key={run.id} className={run.coachman.isSelf || run.escort.isSelf ? 'self' : undefined}>
                  <td>
                    <CaravanMemberCell member={run.coachman} />
                  </td>
                  <td>
                    <CaravanMemberCell member={run.escort} />
                  </td>
                  <td>
                    <Badge variant={ROLE_BADGE[run.escortRole]}>{run.escortRole}</Badge>
                  </td>
                  <td>{formatDate(run.lastAssignedDate)}</td>
                  <td className="tbl-actions">
                    {canEdit && (
                      <Button
                        variant="neutral"
                        size="sm"
                        iconOnly
                        aria-label="Редактировать"
                        title="Редактировать"
                        onClick={() => setEditingId(run.id)}
                      >
                        <EditIcon />
                      </Button>
                    )}
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </TableWrap>

      {draw && (
        <CaravanRollModal
          draw={draw}
          onConfirm={handleConfirm}
          onReroll={handleReroll}
          onClose={() => setDraw(null)}
        />
      )}
    </>
  );
}
