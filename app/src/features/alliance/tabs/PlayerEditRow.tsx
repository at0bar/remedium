import { useState } from 'react';
import { CancelIcon, SaveIcon } from '../../../components/ui/ActionIcons';
import { Button } from '../../../components/ui/Button';
import { useAuth } from '../../auth/AuthContext';
import { formatPowerM } from '../../../lib/format';
import { PLAYSTYLES, PLAYSTYLE_LABELS } from '../../../lib/playstyle';
import type { AlliancePlayer, PlayerGroup, Playstyle } from '../../../lib/api/types';

const GROUPS: PlayerGroup[] = ['R1', 'R2', 'R3', 'R4', 'R5'];

export function PlayerEditRow({
  initial,
  onSave,
  onCancel,
}: {
  initial: AlliancePlayer | null;
  onSave: (data: Omit<AlliancePlayer, 'id' | 'isSelf'>) => void;
  onCancel: () => void;
}) {
  const { user } = useAuth();
  const canEditGroup = !initial?.isSelf || (user?.canEdit ?? false);

  const [nick, setNick] = useState(initial?.nick ?? '');
  const [level, setLevel] = useState(initial?.level ?? 1);
  const [group, setGroup] = useState<PlayerGroup>(initial?.group ?? 'R1');
  const [totalPowerM, setTotalPowerM] = useState(initial?.totalPowerM ?? 0);
  const [playstyle, setPlaystyle] = useState<Playstyle>(initial?.playstyle ?? 'none');

  return (
    <tr>
      <td>
        {initial?.isSelf ? (
          <span style={{ color: 'var(--text2)', fontSize: 13 }} title="Меняется в Профиль → Настройки">
            {initial.nick}
          </span>
        ) : (
          <input className="auth-input" value={nick} onChange={(e) => setNick(e.target.value)} placeholder="Ник" />
        )}
      </td>
      <td>
        <input
          className="auth-input"
          type="number"
          min={1}
          value={level}
          onChange={(e) => setLevel(Number(e.target.value))}
        />
      </td>
      <td>
        {canEditGroup ? (
          <select className="auth-input" value={group} onChange={(e) => setGroup(e.target.value as PlayerGroup)}>
            {GROUPS.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        ) : (
          <span style={{ color: 'var(--text2)', fontSize: 13 }} title="Смену группы подтверждает редактор">
            {group}
          </span>
        )}
      </td>
      <td>
        {initial?.isSelf ? (
          <span style={{ color: 'var(--text2)', fontSize: 13 }} title="Считается по отрядам на странице профиля">
            {formatPowerM(initial.totalPowerM)}
          </span>
        ) : (
          <input
            className="auth-input"
            type="number"
            min={0}
            step={0.01}
            value={totalPowerM}
            onChange={(e) => setTotalPowerM(Number(e.target.value))}
          />
        )}
      </td>
      <td>
        <select className="auth-input" value={playstyle} onChange={(e) => setPlaystyle(e.target.value as Playstyle)}>
          {PLAYSTYLES.map((p) => (
            <option key={p} value={p}>
              {PLAYSTYLE_LABELS[p]}
            </option>
          ))}
        </select>
      </td>
      <td className="tbl-actions">
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <Button
            variant="gold"
            size="sm"
            iconOnly
            aria-label="Сохранить"
            title="Сохранить"
            onClick={() => {
              const finalNick = initial?.isSelf ? initial.nick : nick.trim();
              if (!finalNick) return;
              onSave({
                nick: finalNick,
                level,
                group,
                totalPowerM: initial?.isSelf ? initial.totalPowerM : totalPowerM,
                playstyle,
              });
            }}
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
