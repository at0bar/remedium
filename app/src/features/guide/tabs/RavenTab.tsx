import { SectionHeader } from '../../../components/layout/SectionHeader';
import { Callout, Card, CardTitle, PriorityList } from '../../../components/ui';

export function RavenTab() {
  return (
    <div className="section">
      <SectionHeader
        num="03 // RAVEN"
        title="Raven"
        sub="Постоянные боевые баффы для всей вашей армии. Никогда не пренебрегайте этим."
      />
      <Callout kind="info">
        Raven даёт <b>постоянные боевые бонусы</b>, влияющие на все войска и героев. Три вещи, которые нужно фармить:{' '}
        <b>Raven Essence</b> (прокачивает Raven), <b>Raven Fruit</b> (тратится на опыт Raven) и <b>Raven Gear</b>{' '}
        (экипируется на Raven ради бонусов к характеристикам).
      </Callout>

      <div className="blabel">Raven Essence — приоритетные источники</div>
      <PriorityList
        items={[
          {
            title: 'Ежедневные задания',
            description: 'Выполняйте 60 очков активности в день → гарантированно 6 Raven Essence. Никогда не пропускайте.',
          },
          {
            title: 'Магазин альянса',
            description: '990 очков альянса за 1 Essence. Зарабатывайте пожертвованиями, караванами, дуэлями и событиями.',
          },
          {
            title: 'Pandemic Experience',
            description: 'Более высокие сложности дают больше очков альянса → тратьте их в магазине альянса на Essence.',
          },
          {
            title: 'Магазин Expedition',
            description: '30 Essence за ~9 000 очков Expedition. Фармите, выполняя испытания Watchtower Expedition.',
          },
          {
            title: 'Охота на воров',
            description: '50 Essence за 10 000 монет льва. Цельтесь в золотых воров и главарей воров.',
          },
          {
            title: 'Магазин чести',
            description: 'Можно заработать в Elixir Battles, Royal City Scramble, Destiny Arena, Triangular Arena.',
          },
          {
            title: 'Караван альянса',
            description:
              'Случайные дропы Raven за каждый забег. Лидер каравана получает чуть лучшие награды. Участвуйте регулярно.',
          },
        ]}
      />

      <div className="blabel">Raven Fruit — как фармить</div>
      <div className="g2">
        <Card accent="support">
          <CardTitle>Способ производства</CardTitle>
          <ul>
            <li>Raven Fruit производится пассивно вашим Raven со временем</li>
            <li>
              <strong style={{ color: '#fff' }}>Собирайте примерно каждые 2 часа</strong> — лимит заполняется быстро,
              излишек пропадает
            </li>
            <li>Чем выше уровень Raven, тем быстрее производство фруктов</li>
          </ul>
        </Card>
        <Card accent="gold">
          <CardTitle>Другие источники фруктов</CardTitle>
          <ul>
            <li>Награды за события и вехи в сундуках</li>
            <li>Фаза 1 Alliance Duel засчитывает очки за расход Raven Fruit</li>
            <li>
              <strong style={{ color: '#fff' }}>Тратьте фрукты во время Фазы 1</strong> ради двойной ценности
            </li>
          </ul>
        </Card>
      </div>

      <div className="blabel">Raven Gear — как получить</div>
      <div className="g3">
        <Card>
          <CardTitle>Магазин альянса</CardTitle>
          <p>20 сундуков Raven Gear ≈ 19 800 очков альянса. Самый стабильный фармируемый источник.</p>
        </Card>
        <Card>
          <CardTitle>Магазин Expedition</CardTitle>
          <p>
            Покупайте партиями. <strong style={{ color: '#fff' }}>Копите все сундуки для Фазы 3 Alliance Duel</strong>{' '}
            ради двойной ценности.
          </p>
        </Card>
        <Card>
          <CardTitle>Награды за события</CardTitle>
          <p>События Raven Duel, вехи в сундуках, прохождение высоких сложностей Pandemic Experience.</p>
        </Card>
      </div>
      <Callout kind="warn">
        <b>Копите ВСЕ сундуки Raven Gear для Фазы 3 Alliance Duel</b> (фаза исследований технологий). Их открытие в этот
        момент даёт вам одновременно прогресс И очки события.
      </Callout>
    </div>
  );
}
