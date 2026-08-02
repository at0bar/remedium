import { Badge, type BadgeVariant } from '../../../components/ui/Badge';
import { TableWrap } from '../../../components/ui/TableWrap';
import { useElixirRace } from '../../../lib/api/hooks';
import type { ElixirParticipation } from '../../../lib/api/types';

const PARTICIPATION_VARIANT: Record<ElixirParticipation, BadgeVariant> = {
  Да: 'teal',
  Нет: 'red',
  'Не знает': 'neutral',
};

export function ElixirRaceTab() {
  const { data: entries, isLoading } = useElixirRace();

  if (isLoading) {
    return <p style={{ color: 'var(--text2)', fontSize: 13 }}>Загрузка гонки за элексиром…</p>;
  }

  return (
    <TableWrap>
      <table>
        <thead>
          <tr>
            <th>Ник</th>
            <th>Уровень</th>
            <th>Команда</th>
            <th>Участие</th>
          </tr>
        </thead>
        <tbody>
          {entries?.map((entry) => (
            <tr key={entry.nick}>
              <td>
                <strong style={{ color: '#fff' }}>{entry.nick}</strong>
              </td>
              <td>{entry.level}</td>
              <td>{entry.team}</td>
              <td>
                <Badge variant={PARTICIPATION_VARIANT[entry.participation]}>{entry.participation}</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </TableWrap>
  );
}
