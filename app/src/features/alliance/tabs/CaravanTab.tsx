import { Badge } from '../../../components/ui/Badge';
import { TableWrap } from '../../../components/ui/TableWrap';
import { useCaravan } from '../../../lib/api/hooks';
import { formatDate } from '../../../lib/format';

export function CaravanTab() {
  const { data: entries, isLoading } = useCaravan();

  if (isLoading) {
    return <p style={{ color: 'var(--text2)', fontSize: 13 }}>Загрузка каравана…</p>;
  }

  return (
    <TableWrap>
      <table className="tbl-nowrap">
        <thead>
          <tr>
            <th>Ник</th>
            <th>Группа</th>
            <th>Уровень</th>
            <th>Признак</th>
            <th>Дата последнего назначения</th>
          </tr>
        </thead>
        <tbody>
          {entries?.map((entry) => (
            <tr key={entry.nick} className={entry.isSelf ? 'self' : undefined}>
              <td>
                <strong style={{ color: '#fff' }}>{entry.nick}</strong>
              </td>
              <td>
                <Badge variant="gold">{entry.group}</Badge>
              </td>
              <td>{entry.level}</td>
              <td>
                <Badge variant={entry.flag === 'vip' ? 'purple' : 'teal'}>{entry.flag}</Badge>
              </td>
              <td>{formatDate(entry.lastAssignedDate)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </TableWrap>
  );
}
