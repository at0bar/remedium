import { useState } from 'react';
import { Badge } from '../../../components/ui/Badge';
import { CancelIcon, SaveIcon } from '../../../components/ui/ActionIcons';
import { Button } from '../../../components/ui/Button';
import { useAlliancePlayers } from '../../../lib/api/hooks';
import { formatDate } from '../../../lib/format';
import type { AlliancePlayer, CaravanEscortRole, CaravanMember, CaravanRun } from '../../../lib/api/types';

const ESCORT_ROLES: CaravanEscortRole[] = ['страж', 'vip'];

type EditableMember = Omit<CaravanMember, 'isSelf'>;

function PlayerPicker({
  roster,
  value,
  excludeNick,
  onChange,
}: {
  roster: AlliancePlayer[];
  value: EditableMember;
  excludeNick: string;
  onChange: (member: EditableMember) => void;
}) {
  const options = roster.filter((p) => p.nick !== excludeNick);
  const knowsCurrentValue = options.some((p) => p.nick === value.nick);

  return (
    <select
      className="auth-input"
      value={value.nick}
      onChange={(e) => {
        const picked = roster.find((p) => p.nick === e.target.value);
        if (picked) onChange({ nick: picked.nick, group: picked.group, level: picked.level });
      }}
    >
      {/* Keeps a previously assigned player selectable even if they've since left the roster. */}
      {!knowsCurrentValue && <option value={value.nick}>{value.nick}</option>}
      {options.map((p) => (
        <option key={p.id} value={p.nick}>
          {p.nick}
        </option>
      ))}
    </select>
  );
}

export function CaravanEditRow({
  run,
  onSave,
  onCancel,
}: {
  run: CaravanRun;
  onSave: (data: CaravanRun) => void;
  onCancel: () => void;
}) {
  const { data: players } = useAlliancePlayers();
  const roster = players ?? [];

  const [coachman, setCoachman] = useState<EditableMember>({
    nick: run.coachman.nick,
    group: run.coachman.group,
    level: run.coachman.level,
  });
  const [escort, setEscort] = useState<EditableMember>({
    nick: run.escort.nick,
    group: run.escort.group,
    level: run.escort.level,
  });
  const [escortRole, setEscortRole] = useState<CaravanEscortRole>(run.escortRole);

  return (
    <tr>
      <td>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {run.coachman.isSelf ? (
            <span style={{ color: 'var(--text2)', fontSize: 13 }} title="Меняется в Профиль → Настройки">
              {run.coachman.nick}
            </span>
          ) : (
            <PlayerPicker roster={roster} value={coachman} excludeNick={escort.nick} onChange={setCoachman} />
          )}
          <Badge variant="gold">{coachman.group}</Badge>
          <span style={{ color: 'var(--text2)', fontSize: 12, whiteSpace: 'nowrap' }}>{coachman.level} ур.</span>
        </div>
      </td>
      <td>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {run.escort.isSelf ? (
            <span style={{ color: 'var(--text2)', fontSize: 13 }} title="Меняется в Профиль → Настройки">
              {run.escort.nick}
            </span>
          ) : (
            <PlayerPicker roster={roster} value={escort} excludeNick={coachman.nick} onChange={setEscort} />
          )}
          <Badge variant="gold">{escort.group}</Badge>
          <span style={{ color: 'var(--text2)', fontSize: 12, whiteSpace: 'nowrap' }}>{escort.level} ур.</span>
        </div>
      </td>
      <td>
        <select
          className="auth-input"
          value={escortRole}
          onChange={(e) => setEscortRole(e.target.value as CaravanEscortRole)}
        >
          {ESCORT_ROLES.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </td>
      <td>{formatDate(run.lastAssignedDate)}</td>
      <td className="tbl-actions">
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <Button
            variant="gold"
            size="sm"
            iconOnly
            aria-label="Сохранить"
            title="Сохранить"
            onClick={() =>
              onSave({
                ...run,
                coachman: run.coachman.isSelf ? run.coachman : coachman,
                escort: run.escort.isSelf ? run.escort : escort,
                escortRole,
              })
            }
          >
            <SaveIcon />
          </Button>
          <Button variant="neutral" size="sm" iconOnly aria-label="Отмена" title="Отмена" onClick={onCancel}>
            <CancelIcon />
          </Button>
        </div>
      </td>
    </tr>
  );
}
