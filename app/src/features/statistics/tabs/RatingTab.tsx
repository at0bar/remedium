import { TableWrap } from '../../../components/ui/TableWrap';
import { useWeeklyRating } from '../../../lib/api/hooks';
import { formatDate } from '../../../lib/format';

export function RatingTab() {
  const { data, isLoading } = useWeeklyRating();

  if (isLoading || !data) {
    return <p style={{ color: 'var(--text2)', fontSize: 13 }}>Загрузка рейтинга…</p>;
  }

  const { weeks, entries } = data;
  const sortedByLatest = [...entries].sort((a, b) => b.points[0] - a.points[0]);

  return (
    <TableWrap>
      <table>
        <thead>
          <tr>
            <th>Ник</th>
            {weeks.map((week) => (
              <th key={week}>{formatDate(week)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedByLatest.map((entry) => (
            <tr key={entry.nick} className={entry.isSelf ? 'self' : undefined}>
              <td>
                <strong style={{ color: '#fff' }}>{entry.nick}</strong>
              </td>
              {entry.points.map((points, i) => (
                <td key={weeks[i]}>{points.toLocaleString('ru-RU')}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </TableWrap>
  );
}
