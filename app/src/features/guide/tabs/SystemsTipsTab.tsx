import { SectionHeader } from '../../../components/layout/SectionHeader';
import { Callout, Card, CardTitle, MinisterCard, TableWrap } from '../../../components/ui';

const ministers = [
  {
    title: '⚗️ Министр стратегии',
    buffs: [
      { label: 'Лимит лазарета', value: '+30%' },
      { label: 'Скорость лечения', value: '+25%' },
    ],
    tip: 'Занимайте очередь, когда ожидаете потери войск — перед крупными фазами PvP или событиями Rat Swarm.',
  },
  {
    title: '🛡️ Министр войны',
    buffs: [
      { label: 'Вместимость тренировки', value: '+25%' },
      { label: 'Скорость тренировки', value: '+30%' },
    ],
    tip: 'Занимайте очередь при тренировке войск — особенно во время Фазы 5 Alliance Duel.',
  },
  {
    title: '🏗 Министр строительства',
    buffs: [
      { label: 'Скорость строительства', value: '+60%' },
      { label: 'Скорость исследований', value: '+35%' },
    ],
    tip: 'Занимайте очередь непосредственно перед крупной прокачкой постройки. Лучше всего во время Фазы 2.',
  },
  {
    title: '🔬 Министр развития',
    buffs: [
      { label: 'Скорость исследований', value: '+60%' },
      { label: 'Скорость строительства', value: '+35%' },
    ],
    tip: 'Занимайте очередь при начале долгого исследования — лучше всего использовать в окне Фазы 3.',
  },
  {
    title: '🌾 Министр внутреннего двора',
    buffs: [
      { label: 'Добыча зерна и дерева', value: '+165%' },
      { label: 'Добыча трав', value: '+155%' },
    ],
    tip: 'Занимайте очередь перед долгим отсутствием в игре — бонус к производству продолжает тикать.',
  },
];

export function SystemsTipsTab() {
  return (
    <div className="section">
      <SectionHeader
        num="10 // SYSTEMS & TIPS"
        title="Системы и продвинутые советы"
        sub="VIP, титулы, Falcon Tower, экспедиции, Curios и ежедневные привычки."
      />

      <div className="blabel">Система VIP</div>
      <div className="g2">
        <Card accent="gold">
          <CardTitle>Преимущества VIP</CardTitle>
          <ul>
            <li>Постоянные % бонусы к производству еды, дерева и трав</li>
            <li>Бонусы к скорости строительства, стамине и скорости найма героев</li>
            <li>Заходите ежедневно за бесплатными очками VIP — небольшая, но накопительная выгода</li>
            <li>VIP 6 и 8 — ключевые вехи для скачков бонуса производства</li>
          </ul>
        </Card>
        <Card>
          <CardTitle>Приоритет вложений в VIP</CardTitle>
          <ul>
            <li>Сначала месячный/боевой пропуск — лучшая ценность в пересчёте на ежедневные ресурсы</li>
            <li>Затем прямые траты на баннеры UR-героев ради pity</li>
            <li>F2P: вкладывайте свободные самоцветы в VIP, прежде чем покупать ресурсы напрямую</li>
          </ul>
        </Card>
      </div>

      <div className="blabel">Титулы Royal City (система министров)</div>
      <Callout kind="info">
        Игроки встают в очередь на каждую министерскую должность в Royal City. Когда подходит ваша очередь, у вас есть{' '}
        <b>5 минут</b> соответствующего баффа. Вставайте в очередь на титул, соответствующий тому, чем вы активно
        занимаетесь, чтобы не потратить окно впустую.
      </Callout>
      <div className="g3">
        {ministers.map((m) => (
          <MinisterCard key={m.title} title={m.title} buffs={m.buffs} tip={m.tip} />
        ))}
      </div>
      <Callout kind="tip">
        Регулярно проверяйте очередь Royal City и занимайте место заранее. Бафф министра войны, потраченный впустую, пока
        вы в базе, — это бафф, который не участвовал в бою.
      </Callout>

      <div className="blabel">Экспедиции Watchtower</div>
      <Callout kind="info">
        Watchtower Expeditions — это дорожная карта испытаний, открываемых в Watchtower. Каждый узел открывается в
        определённое время, и вы проходите его, когда готовы — беритесь за них сразу по открытию, чтобы копить очки
        Expedition.
      </Callout>
      <div className="g2">
        <Card accent="support">
          <CardTitle>Что нужно знать</CardTitle>
          <ul>
            <li>Испытания открываются по расписанию — беритесь за них сразу, а не откладывайте</li>
            <li>Более сложные этапы дают больше очков Expedition, ресурсов и билетов найма</li>
            <li>
              Очки Expedition конвертируются в <strong style={{ color: '#fff' }}>Raven Essence и сундуки Raven Gear</strong>{' '}
              в магазине Expedition
            </li>
          </ul>
        </Card>
        <Card>
          <CardTitle>Приоритеты магазина Expedition</CardTitle>
          <ul>
            <li>30 Raven Essence за ~9 000 очков — высший приоритет</li>
            <li>
              Сундуки Raven Gear — покупайте и <strong style={{ color: '#fff' }}>копите для Фазы 3 Alliance Duel</strong>
            </li>
            <li>Пропускайте покупку базовых ресурсов — предметы Raven всегда выгоднее</li>
          </ul>
        </Card>
      </div>

      <div className="blabel">Falcon Tower</div>
      <div className="g2">
        <Card accent="gold">
          <CardTitle>Ежедневные активности</CardTitle>
          <ul>
            <li>Основной источник очков Expedition — выполняйте активности здесь ежедневно</li>
            <li>Награды включают билеты найма, ресурсы и Raven Essence через магазин Expedition</li>
            <li>Выполняйте здесь Falcon Quest — сохраняйте сбор награды для начала фаз Alliance Duel</li>
          </ul>
        </Card>
        <Card>
          <CardTitle>Тайминг Falcon Quest</CardTitle>
          <ul>
            <li>
              Каждый Falcon Quest даёт <strong style={{ color: '#fff' }}>10 000 очков Alliance Duel</strong>
            </li>
            <li>Выполняйте задания в любое время — забирайте награду только когда активна нужная фаза</li>
          </ul>
        </Card>
      </div>

      <div className="blabel">Система Curios</div>
      <div className="g2">
        <Card accent="carry">
          <CardTitle>Что такое Curios?</CardTitle>
          <p>
            Особые коллекционные предметы, дающие пассивные бонусы вашему святилищу. Добываются через события,
            исследование и активности. Можно прокачивать или объединять. Каждый даёт уникальный бонус — производство,
            бой, скорость исследований и т.д.
          </p>
        </Card>
        <Card>
          <CardTitle>Приоритет Curios</CardTitle>
          <ul>
            <li>Боевые Curios для вашей основной фракции героев — наибольшее немедленное влияние</li>
            <li>Curios, усиливающие производство, дают постоянную пассивную ценность</li>
            <li>Не вкладывайтесь сильно в Curios низкой редкости — ждите улучшений до SSR/UR</li>
          </ul>
        </Card>
      </div>

      <div className="blabel">Календарь ресурсов — еженедельная координация</div>
      <TableWrap>
        <table>
          <thead>
            <tr>
              <th>Ресурс</th>
              <th>Копить до</th>
              <th>Также тратить во время</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Raven Essence / Fruit</td>
              <td>Открытия Фазы 1</td>
              <td>Raven Survival Battle</td>
            </tr>
            <tr>
              <td>Ускорители строительства</td>
              <td>Открытия Фазы 2</td>
              <td>Держите тап завершения до начала фазы</td>
            </tr>
            <tr>
              <td>Ускорители технологий + сундуки Raven</td>
              <td>Открытия Фазы 3</td>
              <td>Свитки знаний — то же окно</td>
            </tr>
            <tr>
              <td>Осколки героев / значки навыков / антитоксин</td>
              <td>Открытия Фазы 4</td>
              <td>Hero Survival Battle</td>
            </tr>
            <tr>
              <td>Ускорители тренировки войск</td>
              <td>Открытия Фазы 5</td>
              <td>Troops Training Survival Battle</td>
            </tr>
            <tr>
              <td>Ускорители лечения</td>
              <td>Открытия Фазы 6</td>
              <td>После PvP-рейдов для быстрого восстановления</td>
            </tr>
            <tr>
              <td>Награды Falcon Quest</td>
              <td>Открытия соответствующей фазы</td>
              <td>Каждая фаза — по 10 000 очков</td>
            </tr>
          </tbody>
        </table>
      </TableWrap>

      <div className="blabel">Ежедневные привычки — обязательные</div>
      <div className="g2">
        <Card accent="gold">
          <CardTitle>Каждый день</CardTitle>
          <ul>
            <li>Выполняйте 60 очков активности → гарантированно 6 Raven Essence</li>
            <li>Собирайте Raven Fruit каждые ~2 часа (лимит заполняется быстро)</li>
            <li>Проверяйте караван альянса — присоединяйтесь к каждому забегу</li>
            <li>Выполняйте ежедневные испытания Falcon Tower</li>
            <li>Держите очередь тренировки войск постоянно запущенной</li>
          </ul>
        </Card>
        <Card>
          <CardTitle>Перед событиями</CardTitle>
          <ul>
            <li>Копите ресурсы под следующую фазу Alliance Duel</li>
            <li>Заранее начинайте долгие постройки и исследования — держите тап завершения</li>
            <li>Сохраняйте Falcon Quest для начала фаз</li>
            <li>Вставайте в очередь на титулы Royal City, соответствующие плану активности</li>
          </ul>
        </Card>
      </div>

      <div className="divider" />
      <p style={{ fontSize: 13, color: 'var(--text3)', textAlign: 'center', fontFamily: 'var(--mono)', letterSpacing: '.06em' }}>
        Следуйте за лидерством · Оставайтесь активны ежедневно · Концентрируйте ресурсы на основном отряде · Рассчитывайте
        время тапов
      </p>
    </div>
  );
}
