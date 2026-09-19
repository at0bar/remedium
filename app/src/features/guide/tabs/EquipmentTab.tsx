import { SectionHeader } from '../../../components/layout/SectionHeader';
import { Badge, Callout, Card, CardTitle, TableWrap } from '../../../components/ui';

export function EquipmentTab() {
  return (
    <div className="section">
      <SectionHeader
        num="02 // EQUIPMENT"
        title="Снаряжение"
        sub="4 слота снаряжения на героя. Всегда цельтесь в UR. SSR — переходный вариант."
      />

      <div className="blabel">Слоты снаряжения</div>
      <div className="g2">
        <Card accent="carry">
          <CardTitle style={{ color: 'var(--carry)' }}>⚔ Оружие (меч)</CardTitle>
          <p>
            Базовые ATK + DEF, %ATK и %Crit Rate. Основной атакующий слот. Приоритет для героев Carry.
          </p>
        </Card>
        <Card accent="tank">
          <CardTitle style={{ color: 'var(--tank)' }}>🛡️ Броня</CardTitle>
          <p>
            Базовые DEF + HP, %DEF, %HP и Physical DMG RES. Основной защитный слот. Приоритет для героев Tank.
          </p>
        </Card>
        <Card accent="carry">
          <CardTitle style={{ color: 'var(--carry)' }}>🥊 Перчатки</CardTitle>
          <p>Базовые ATK + HP, %ATK и все виды DMG RES. Вторичный атакующий слот. Приоритет для Carry после оружия.</p>
        </Card>
        <Card accent="tank">
          <CardTitle style={{ color: 'var(--tank)' }}>👟 Ботинки</CardTitle>
          <p>
            Базовые DEF + HP, %DEF, %HP и Energy DMG RES. Вторичный защитный слот. Приоритет для Tank после брони.
          </p>
        </Card>
      </div>

      <div className="blabel">Приоритет по классам</div>
      <TableWrap>
        <table>
          <thead>
            <tr>
              <th>Класс</th>
              <th>Порядок прокачки</th>
              <th>Правило</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Badge variant="tank">🛡️ Tank</Badge>
              </td>
              <td>1-е Броня → 2-е Ботинки</td>
              <td>Никогда не вкладывайтесь в оружие, пока броня не прокачана до предела</td>
            </tr>
            <tr>
              <td>
                <Badge variant="carry">🪓 Carry</Badge>
              </td>
              <td>1-е Оружие → 2-е Перчатки</td>
              <td>Никогда не вкладывайтесь в ботинки, пока оружие не прокачано до предела</td>
            </tr>
          </tbody>
        </table>
      </TableWrap>

      <div className="blabel">Ключевые вехи роста мощи</div>
      <p style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 9 }}>
        Снаряжение прокачивается до 40 уровня за счёт Gearstones и трав. После 40 уровня снаряжение можно повышать до{' '}
        <strong style={{ color: '#fff' }}>5 звёзд</strong> (каждая звезда требует Gearstones + закалённую сталь + травы, а
        для финального шага звезды нужны чертежи). Самые большие скачки мощи на уровнях:
      </p>
      <div className="mrow">
        <div className="ms">+10</div>
        <div className="ms">+20</div>
        <div className="ms">+30</div>
        <div className="ms">+40</div>
      </div>
      <Callout kind="tip">Никогда не прокачивайте всерьёз снаряжение SSR — оно переходное. Держите материалы для UR-снаряжения.</Callout>
      <Callout kind="warn">
        <b>Частая ошибка:</b> равномерно прокачивать все 4 слота. Максимум 2 слота, соответствующих роли героя, прежде чем
        трогать остальные.
      </Callout>
    </div>
  );
}
