import { SectionHeader } from '../../../components/layout/SectionHeader';
import { Badge, Callout, PriorityList, TableWrap } from '../../../components/ui';

export function SoldiersTab() {
  return (
    <div className="section">
      <SectionHeader
        num="05 // SOLDIERS"
        title="Войска"
        sub="Тиры T1–T10. Разрыв в тирах решает исход прямого боя."
      />
      <div className="blabel">Тиры войск</div>
      <TableWrap>
        <table>
          <thead>
            <tr>
              <th>Тир</th>
              <th>Как открыть</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Badge variant="neutral">T1–T6</Badge>
              </td>
              <td>Обычная прокачка построек + дерево исследований Development</td>
            </tr>
            <tr>
              <td>
                <Badge variant="gold">T7–T9</Badge>
              </td>
              <td>Глубокие вложения в дерево исследований Soldiers (требуется Sanctuary 20+)</td>
            </tr>
            <tr>
              <td>
                <Badge variant="teal">T10</Badge>
              </td>
              <td>
                Ветка исследований Elite Troop — должна быть <strong style={{ color: '#fff' }}>полностью завершена</strong>{' '}
                перед открытием тренировки T10
              </td>
            </tr>
          </tbody>
        </table>
      </TableWrap>

      <div className="blabel">Приоритет тренировки</div>
      <PriorityList
        items={[
          {
            title: 'Держите Training Grounds на максимуме',
            description:
              'Всегда на максимальном уровне, допустимом вашим Sanctuary. Самая ценная цель для ускорителей построек.',
          },
          {
            title: 'Развивайте исследования войск параллельно',
            description:
              'Уровень здания и дерево исследований должны расти вместе, чтобы открывать более высокие тиры.',
          },
          {
            title: 'Тренируйте непрерывно',
            description:
              'Держите тренировку активной постоянно — даже если не планируете драться прямо сейчас. Копите запас уже сейчас.',
          },
        ]}
      />
      <Callout kind="tip">
        Достигните <b>20+ уровня Sanctuary</b>, чтобы открыть войска 7 тира — первый по-настоящему конкурентный боевой
        порог.
      </Callout>
      <Callout kind="warn">
        <b>Частая ошибка:</b> тренировать большое количество войск низкого тира вместо продвижения к более высоким тирам.
        Разрыв в тирах решает исход — количество не компенсирует разницу в тире.
      </Callout>
    </div>
  );
}
