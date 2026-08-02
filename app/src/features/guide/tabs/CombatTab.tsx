import { SectionHeader } from '../../../components/layout/SectionHeader';
import { Card, CardTitle, PriorityList } from '../../../components/ui';

export function CombatTab() {
  return (
    <div className="section">
      <SectionHeader
        num="07 // COMBAT"
        title="Механика боя"
        sub="Понимание фаз даёт реальное стратегическое преимущество."
      />
      <div className="blabel">Типы урона</div>
      <div className="g2">
        <Card accent="gold">
          <CardTitle style={{ color: 'var(--gold)' }}>Физический урон (оранжевый)</CardTitle>
          <ul>
            <li>Ближний бой и атаки на основе оружия</li>
            <li>
              Снижается характеристикой <strong style={{ color: '#fff' }}>Armor (броня)</strong>
            </li>
          </ul>
        </Card>
        <Card accent="blue">
          <CardTitle style={{ color: 'var(--blue)' }}>Энергетический урон (синий)</CardTitle>
          <ul>
            <li>Магические способности, герои Warlock</li>
            <li>
              Снижается характеристикой <strong style={{ color: '#fff' }}>Boots (ботинки)</strong>
            </li>
          </ul>
        </Card>
      </div>

      <div className="blabel">Фазы боя</div>
      <PriorityList
        items={[
          {
            title: 'Фаза сближения',
            description:
              'Оба отряда делятся на подгруппы. Танки на фронте вступают в бой друг с другом, пока герои тыла оказывают поддержку. Два одновременных боя.',
          },
          {
            title: 'Переломная фаза',
            description:
              'Как только герой фронта падает, все атаки противника переключаются на оставшийся фронт. Внезапный сдвиг импульса — обычно именно здесь решается исход боя.',
          },
          {
            title: 'Фаза разгрома',
            description:
              'Оба фронта пали. Тыловые линии становятся уязвимы. Сторона, потерявшая фронт первой, почти всегда терпит крах.',
          },
        ]}
      />

      <div className="blabel">Навыки героев</div>
      <div className="g2">
        <Card>
          <CardTitle>Активные навыки</CardTitle>
          <ul>
            <li>Срабатывают при заполнении жёлтой шкалы энергии</li>
            <li>Можно активировать вручную — используйте в ключевые моменты против боссов</li>
            <li>Ультимейт: КД ~15с, наибольший единовременный эффект</li>
          </ul>
        </Card>
        <Card>
          <CardTitle>Пассивные навыки</CardTitle>
          <ul>
            <li>Активны всегда, не требуют триггера</li>
            <li>Бонусы к атаке/защите, командные ауры</li>
            <li>Прокачиваются уровнем звёзд и значками навыков — вкладывайтесь только в основной отряд</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
