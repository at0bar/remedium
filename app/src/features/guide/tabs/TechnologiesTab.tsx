import { SectionHeader } from '../../../components/layout/SectionHeader';
import { Callout, Card, CardTitle, PriorityList } from '../../../components/ui';

export function TechnologiesTab() {
  return (
    <div className="section">
      <SectionHeader
        num="04 // TECHNOLOGIES"
        title="Технологии"
        sub="Исследования дают постоянные бонусы. Правильный порядок экономит недели."
      />
      <div className="blabel">Порядок приоритета исследований</div>
      <PriorityList
        items={[
          {
            title: 'Ветка развития (Development)',
            description:
              'Сначала максимизируйте скорость строительства и скорость исследований. Сокращает ВСЕ базовые таймеры глобально — самая высокая совокупная отдача в игре.',
          },
          {
            title: 'Экономическая ветка (Economic)',
            description:
              'Эффективность добычи, бонусы к вместимости хранилищ, дополнительные слоты производства. Основа для всего остального.',
          },
          {
            title: 'Ветка боевых фракций (только ваша основная фракция)',
            description:
              'Исследуйте ТОЛЬКО ветку, соответствующую фракции ваших основных героев. Сфокусированная мощь лучше распылённой в среднем.',
          },
        ]}
      />
      <Callout kind="tip">
        Откройте <b>15 уровень лаборатории</b> как можно раньше — он необходим для доступа к наградам исследований Alliance
        Duel.
      </Callout>

      <div className="blabel">Правила ускорителей</div>
      <div className="g2">
        <Card accent="support">
          <CardTitle style={{ color: 'var(--support)' }}>✓ Используйте ускорители для</CardTitle>
          <ul>
            <li>Прорывов уровня Sanctuary</li>
            <li>Высокоуровневых исследований с глобальными бонусами</li>
            <li>Окна начисления очков в Фазе 3 Alliance Duel</li>
            <li>Долгих проектов (таймер от 1 дня)</li>
          </ul>
        </Card>
        <Card accent="red">
          <CardTitle style={{ color: 'var(--red)' }}>✗ НЕ используйте для</CardTitle>
          <ul>
            <li>Декоративных или низкоприоритетных построек</li>
            <li>Оборонительных построек без немедленной необходимости</li>
            <li>Вне фаз событий Alliance Duel</li>
          </ul>
        </Card>
      </div>
      <Callout kind="tip">
        Начинайте исследование длительностью от 1 дня <b>до открытия Фазы 3</b>. Когда оно завершится,{' '}
        <b>не нажимайте кнопку завершения</b>, пока фаза не станет активной — очки засчитываются в момент тапа, а не в
        момент окончания таймера.
      </Callout>
    </div>
  );
}
