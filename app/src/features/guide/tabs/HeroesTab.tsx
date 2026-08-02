import { SectionHeader } from '../../../components/layout/SectionHeader';
import { Badge, Callout, Card, CardTitle, SquadBlock, TableWrap } from '../../../components/ui';
import { srHeroes, ssrHeroes, urHeroes } from '../data/heroes';

const factionBadge = { warrior: 'warrior', ranger: 'ranger', warlock: 'warlock' } as const;
const factionLabel = { warrior: 'Warrior', ranger: 'Ranger', warlock: 'Warlock' } as const;

export function HeroesTab() {
  return (
    <div className="section">
      <SectionHeader num="01 // HEROES" title="Герои" sub="Ваш отряд из 5 героев определяет почти всю боевую мощь." />

      <div className="blabel">Классы</div>
      <div className="g3">
        <Card accent="tank">
          <CardTitle style={{ color: 'var(--tank)' }}>🛡️ Tank</CardTitle>
          <ul>
            <li>Низкая атака, высокие HP и защита</li>
            <li>Стоит на фронте — принимает весь урон</li>
            <li>Защищает carry и support на задней линии</li>
            <li>
              Приоритет снаряжения: <strong style={{ color: '#fff' }}>Броня → Ботинки</strong>
            </li>
          </ul>
        </Card>
        <Card accent="carry">
          <CardTitle style={{ color: 'var(--carry)' }}>🪓 Carry (DPS)</CardTitle>
          <ul>
            <li>Высокая атака, низкое HP — хрупкий, но смертоносный</li>
            <li>Отвечает за большую часть урона</li>
            <li>Зависит от того, выживут ли танки</li>
            <li>
              Приоритет снаряжения: <strong style={{ color: '#fff' }}>Оружие → Перчатки</strong>
            </li>
          </ul>
        </Card>
        <Card accent="support">
          <CardTitle style={{ color: 'var(--support)' }}>⚗️ Support</CardTitle>
          <ul>
            <li>Сбалансированные характеристики, упор на утилити</li>
            <li>Усиливает атаку, защиту или лечит</li>
            <li>Слаб в одиночку, силён в полном отряде</li>
            <li>Постоянно усиливает каждого другого героя</li>
          </ul>
        </Card>
      </div>

      <div className="blabel">Фракции и система контр-каунтеров</div>
      <div className="g2">
        <div className="tc">
          <div className="crow">
            <Badge variant="warrior">Warrior</Badge>
            <span className="carr">→ получает −20% урона от</span>
            <Badge variant="warlock">Warlock</Badge>
          </div>
          <div className="crow">
            <Badge variant="ranger">Ranger</Badge>
            <span className="carr">→ получает −20% урона от</span>
            <Badge variant="warrior">Warrior</Badge>
          </div>
          <div className="crow">
            <Badge variant="warlock">Warlock</Badge>
            <span className="carr">→ получает −20% урона от</span>
            <Badge variant="ranger">Ranger</Badge>
          </div>
        </div>
        <div className="tc">
          <table>
            <thead>
              <tr>
                <th>Героев одной фракции</th>
                <th>Бонус</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>3 героя</td>
                <td>
                  <Badge variant="teal">+5%</Badge>
                </td>
              </tr>
              <tr>
                <td>Разделение 3+2</td>
                <td>
                  <Badge variant="teal">+10%</Badge>
                </td>
              </tr>
              <tr>
                <td>4 героя</td>
                <td>
                  <Badge variant="teal">+15%</Badge>
                </td>
              </tr>
              <tr>
                <td>5 героев</td>
                <td>
                  <Badge variant="gold">+20%</Badge>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Callout kind="tip">
        <b>ПРАВИЛО</b> Всегда стремитесь иметь минимум 3 героя одной фракции. Идеально: 5 героев одной фракции (+20%) или
        разделение 3+2 (+10%). Никогда не собирайте случайные фракции — потеря характеристик значительна.
      </Callout>

      <div className="blabel">Полный ростер героев</div>
      <div className="slabel">Герои UR</div>
      <TableWrap>
        <table>
          <thead>
            <tr>
              <th>Герой</th>
              <th>Фракция</th>
              <th>Класс</th>
              <th>Как получить</th>
              <th>Заметки</th>
            </tr>
          </thead>
          <tbody>
            {urHeroes.map((h) => (
              <tr key={h.name}>
                <td>
                  <strong style={{ color: '#fff' }}>{h.name}</strong>
                </td>
                <td>
                  <Badge variant={factionBadge[h.faction]}>{factionLabel[h.faction]}</Badge>
                </td>
                <td className={`cls-${h.cls}`} style={{ whiteSpace: 'nowrap' }}>
                  {h.clsLabel}
                </td>
                <td style={{ fontSize: '11.5px', color: 'var(--text3)' }}>{h.unlock}</td>
                <td>{h.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableWrap>

      <div className="slabel">Герои SSR</div>
      <TableWrap>
        <table>
          <thead>
            <tr>
              <th>Герой</th>
              <th>Фракция</th>
              <th>Класс</th>
              <th>Заметки</th>
            </tr>
          </thead>
          <tbody>
            {ssrHeroes.map((h) => (
              <tr key={h.name}>
                <td>
                  <strong style={{ color: '#fff' }}>{h.name}</strong>
                </td>
                <td>
                  <Badge variant={factionBadge[h.faction]}>{factionLabel[h.faction]}</Badge>
                </td>
                <td className={`cls-${h.cls}`}>{h.clsLabel}</td>
                <td>{h.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableWrap>

      <div className="slabel">Герои SR (только ранняя игра)</div>
      <TableWrap>
        <table>
          <thead>
            <tr>
              <th>Герой</th>
              <th>Фракция</th>
              <th>Класс</th>
              <th>Заметки</th>
            </tr>
          </thead>
          <tbody>
            {srHeroes.map((h) => (
              <tr key={h.name}>
                <td>
                  <span style={{ color: 'var(--text2)' }}>{h.name}</span>
                </td>
                <td>
                  <Badge variant={factionBadge[h.faction]}>{factionLabel[h.faction]}</Badge>
                </td>
                <td className={`cls-${h.cls}`}>{h.clsLabel}</td>
                <td>{h.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableWrap>
      <Callout kind="warn">
        <b>Не вкладывайтесь в SR-героев сверх заполнения слотов.</b> Ни звёзд, ни книг навыков, ни снаряжения. Все ресурсы
        идут исключительно на героев SSR и UR.
      </Callout>

      <div className="blabel">Рекомендуемые сборки отрядов</div>
      <Callout kind="info">
        Отряды ниже — это ИИ-сгенерированные предложения на основе синергии фракций и состава классов. Относитесь к ним как
        к отправной точке, а не как к окончательному ответу — более глубокий анализ ваших конкретных героев, их уровней
        звёзд и развития навыков всегда даст лучший результат.
      </Callout>

      <SquadBlock
        title="Отряд Warrior — полная мета (+20%)"
        headerBackground="linear-gradient(135deg,rgba(201,168,76,.14),rgba(201,168,76,.03))"
        headerBadge={<Badge variant="gold">Лучший в мете · Доступно F2P</Badge>}
        slots={[
          { role: 'Слот 1 · Фронт', name: 'Arthur', type: 'UR · 🛡️ Warrior Tank' },
          { role: 'Слот 2 · Фронт', name: 'Daskal', type: 'UR · 🛡️ Warrior Tank' },
          { role: 'Слот 3 · Тыл', name: 'Marlena', type: 'UR · 🪓 Warrior Carry' },
          { role: 'Слот 4 · Тыл', name: 'Zoya', type: 'UR · 🪓 Warrior Carry' },
          { role: 'Слот 5 · Тыл', name: 'Harper', type: 'UR · ⚗️ Warrior Support' },
        ]}
      />
      <p style={{ fontSize: '11.5px', color: 'var(--text3)', margin: '-6px 0 13px', fontFamily: 'var(--mono)', padding: '0 4px' }}>
        Все 5 Warrior → +20% ко всем характеристикам. Harper в роли support нативно синергирует с фракцией Warrior. Daskal
        открывается на 29 день, Zoya — на 57 день.
      </p>

      <SquadBlock
        title="Ядро Warrior — Arthur + Marlena + Harper"
        headerBackground="linear-gradient(135deg,rgba(91,156,246,.10),rgba(91,156,246,.02))"
        headerBadge={<Badge variant="blue">Полностью Warrior · Ранняя сборка F2P</Badge>}
        slots={[
          { role: 'Слот 1 · Фронт', name: 'Arthur', type: 'UR · 🛡️ Warrior Tank' },
          { role: 'Слот 2 · Фронт', name: 'Bella', type: 'SSR · 🛡️ Warrior Tank' },
          { role: 'Слот 3 · Тыл', name: 'Marlena', type: 'UR · 🪓 Warrior Carry' },
          { role: 'Слот 4 · Тыл', name: 'Claire', type: 'SSR · 🪓 Warrior Carry' },
          { role: 'Слот 5 · Тыл', name: 'Harper', type: 'UR · ⚗️ Warrior Support' },
        ]}
      />
      <p style={{ fontSize: '11.5px', color: 'var(--text3)', margin: '-6px 0 13px', fontFamily: 'var(--mono)', padding: '0 4px' }}>
        Все 5 Warrior → +20%. Claire усиливает урон 3 Warrior-героев с наибольшей атакой — в этой сборке сильная синергия.
      </p>

      <SquadBlock
        title="Отряд Ranger — контра Warrior (+20%)"
        headerBackground="linear-gradient(135deg,rgba(91,156,246,.10),rgba(91,156,246,.02))"
        headerBadge={<Badge variant="ranger">Контра Warrior</Badge>}
        slots={[
          { role: 'Слот 1 · Фронт', name: 'Shadow', type: 'UR · 🛡️ Ranger Tank' },
          { role: 'Слот 2 · Фронт', name: 'Louis', type: 'UR · 🛡️ Ranger Tank' },
          { role: 'Слот 3 · Тыл', name: 'Red Lady', type: 'UR · 🪓 Ranger Carry' },
          { role: 'Слот 4 · Тыл', name: 'Cynthia', type: 'UR · 🪓 Ranger Carry' },
          { role: 'Слот 5 · Тыл', name: 'Bell', type: 'UR · ⚗️ Ranger Support' },
        ]}
      />
      <p style={{ fontSize: '11.5px', color: 'var(--text3)', margin: '-6px 0 13px', fontFamily: 'var(--mono)', padding: '0 4px' }}>
        Все 5 Ranger → +20%. Получает −20% урона от Warrior. Shadow и Bell открываются позже по прогрессии сервера.
      </p>

      <SquadBlock
        title="Отряд Warlock — контра Ranger (+20%)"
        headerBackground="linear-gradient(135deg,rgba(76,175,122,.10),rgba(76,175,122,.02))"
        headerBadge={<Badge variant="warlock">Контра Ranger</Badge>}
        slots={[
          { role: 'Слот 1 · Фронт', name: 'Brian', type: 'UR · 🛡️ Warlock Tank' },
          { role: 'Слот 2 · Фронт', name: 'Billy', type: 'UR · 🛡️ Warlock Tank' },
          { role: 'Слот 3 · Тыл', name: 'Jester', type: 'UR · 🪓 Warlock Carry' },
          { role: 'Слот 4 · Тыл', name: 'Annie', type: 'UR · 🪓 Warlock Carry' },
          { role: 'Слот 5 · Тыл', name: 'Nicole', type: 'UR · ⚗️ Warlock Support' },
        ]}
      />
      <p style={{ fontSize: '11.5px', color: 'var(--text3)', margin: '-6px 0 13px', fontFamily: 'var(--mono)', padding: '0 4px' }}>
        Все 5 Warlock → +20%. Получает −20% урона от Ranger. Синергии Nicole и Stellar с фракцией Warlock полностью
        раскрываются именно здесь. Billy открывается примерно на 85 день.
      </p>

      <div className="blabel">Roadmap прогрессии отряда (F2P / лёгкий донат)</div>
      <Callout kind="info">
        Приведённые ниже сроки прогрессии основаны на исследованиях сообщества (автор: [BOSS] Dawar). Возраст сервера — это
        возраст вашего игрового сервера, а не личное время игры. Все герои UR открываются через паки Daily Offer, если не
        указано иное.
      </Callout>

      <Card accent="warrior" style={{ marginBottom: 10 }}>
        <CardTitle style={{ color: 'var(--warrior)' }}>⚔️ Путь Warrior — самый простой, рекомендован для F2P</CardTitle>
        <TableWrap>
          <table>
            <thead>
              <tr>
                <th>Стадия</th>
                <th>Возраст сервера</th>
                <th>Состав</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Старт</td>
                <td>День 1–7</td>
                <td>Arthur · Bella (врем.) · Claire · Celia (врем.) · Sivir (врем.)</td>
              </tr>
              <tr>
                <td>Ранняя игра</td>
                <td>День 8–22</td>
                <td>Arthur · Lucius · Claire · Celia (врем.) · Sivir (врем.)</td>
              </tr>
              <tr>
                <td>Мид-гейм</td>
                <td>День 22–66</td>
                <td>
                  Arthur · Lucius · Claire · Celia (врем.) · <strong style={{ color: 'var(--gold-lt)' }}>Harper (UR)</strong>
                </td>
              </tr>
              <tr>
                <td>Поздний мид-гейм</td>
                <td>День 29–57</td>
                <td>
                  Arthur · <strong style={{ color: 'var(--gold-lt)' }}>Daskal (UR)</strong> ·{' '}
                  <strong style={{ color: 'var(--gold-lt)' }}>Marlena (UR)</strong> · Claire / Cynthia (врем.) · Harper
                </td>
              </tr>
              <tr>
                <td>Поздняя игра</td>
                <td>День 57+</td>
                <td>
                  Arthur · Daskal · Marlena · <strong style={{ color: 'var(--gold-lt)' }}>Zoya (UR)</strong> · Harper —
                  полностью Warrior, бонус +20%
                </td>
              </tr>
            </tbody>
          </table>
        </TableWrap>
        <p style={{ fontSize: 12, color: 'var(--text3)', marginTop: 8 }}>
          Временный герой = вкладывать максимум до уровня навыков 8–12, без звёзд, без снаряжения кроме раннего филлера.
        </p>
      </Card>

      <Card accent="ranger" style={{ marginBottom: 10 }}>
        <CardTitle style={{ color: 'var(--ranger)' }}>🏹 Путь Ranger — более сильная контра Warrior в мид-гейме</CardTitle>
        <TableWrap>
          <table>
            <thead>
              <tr>
                <th>Стадия</th>
                <th>Возраст сервера</th>
                <th>Состав</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Старт</td>
                <td>День 1–7</td>
                <td>Arthur (врем.) · Bella (врем.) · Ash (врем.) · Celia (врем.) · Bestar (врем.)</td>
              </tr>
              <tr>
                <td>Ранняя игра</td>
                <td>День 8–22</td>
                <td>
                  Arthur (врем.) · <strong style={{ color: 'var(--gold-lt)' }}>Shadow (UR)</strong> · Cynthia · Ash (врем.)
                  · Bestar (врем.)
                </td>
              </tr>
              <tr>
                <td>Поздний мид</td>
                <td>День 36–64</td>
                <td>
                  Shadow · Arthur (врем.) · Cynthia · <strong style={{ color: 'var(--gold-lt)' }}>Red Lady (UR)</strong> ·
                  Ash (врем.)
                </td>
              </tr>
              <tr>
                <td>Поздняя игра</td>
                <td>День 71+</td>
                <td>
                  <strong style={{ color: 'var(--gold-lt)' }}>Louis (UR)</strong> · Shadow · Cynthia · Red Lady ·{' '}
                  <strong style={{ color: 'var(--gold-lt)' }}>Bell (UR)</strong> — полностью Ranger, +20%
                </td>
              </tr>
            </tbody>
          </table>
        </TableWrap>
      </Card>

      <Card accent="warlock" style={{ marginBottom: 10 }}>
        <CardTitle style={{ color: 'var(--warlock)' }}>🔮 Путь Warlock — самый сложный, наиболее зависим от временных героев</CardTitle>
        <TableWrap>
          <table>
            <thead>
              <tr>
                <th>Стадия</th>
                <th>Возраст сервера</th>
                <th>Состав</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Старт</td>
                <td>День 1–15</td>
                <td>Arthur (врем.) · Hastar (врем.) · Stellar (врем.) · Celia (врем.) · Claire (врем.)</td>
              </tr>
              <tr>
                <td>Ранняя игра</td>
                <td>День 15–43</td>
                <td>
                  Arthur (врем.) · Hastar (врем.) · <strong style={{ color: 'var(--gold-lt)' }}>Annie (UR)</strong> ·
                  Stellar (врем.) · <strong style={{ color: 'var(--gold-lt)' }}>Jester (UR)</strong>
                </td>
              </tr>
              <tr>
                <td>Мид</td>
                <td>День 43–85</td>
                <td>
                  <strong style={{ color: 'var(--gold-lt)' }}>Brian (UR)</strong> · Hastar (врем.) · Annie · Stellar
                  (врем.) · Jester
                </td>
              </tr>
              <tr>
                <td>Поздний мид</td>
                <td>День 85–99</td>
                <td>
                  Brian · <strong style={{ color: 'var(--gold-lt)' }}>Billy (UR)</strong> · Annie · Stellar (врем.) ·
                  Jester
                </td>
              </tr>
              <tr>
                <td>Поздняя игра</td>
                <td>День 99+</td>
                <td>
                  Brian · Billy · Annie · <strong style={{ color: 'var(--gold-lt)' }}>Nicole (UR)</strong> · Jester —
                  полностью Warlock, +20%
                </td>
              </tr>
            </tbody>
          </table>
        </TableWrap>
      </Card>

      <div className="blabel">Философия вложений</div>
      <Callout kind="tip">
        <b>Сначала фракция, потом роли классов.</b> Максимизируйте основного танка → основного керри → поддержку фракции.
        Прокачанный танк умножает ценность каждого другого вложения. Расширяйтесь за пределы ядра только когда оно
        полностью развито.
      </Callout>

      <div className="blabel">Оптимальное позиционирование</div>
      <TableWrap>
        <table>
          <thead>
            <tr>
              <th>Слот</th>
              <th>Роль</th>
              <th>Линия</th>
              <th>Заметка</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>🛡️ Основной танк</td>
              <td>
                <Badge variant="red">Фронт</Badge>
              </td>
              <td>Герой с наибольшими вложениями — принимает урон первым</td>
            </tr>
            <tr>
              <td>2</td>
              <td>🛡️ Второй танк</td>
              <td>
                <Badge variant="red">Фронт</Badge>
              </td>
              <td>Выигрывает время, чтобы задняя линия наносила урон</td>
            </tr>
            <tr>
              <td>3</td>
              <td>🪓 Основной carry</td>
              <td>
                <Badge variant="teal">Тыл</Badge>
              </td>
              <td>Наибольшая атака — безопасно позади фронта</td>
            </tr>
            <tr>
              <td>4</td>
              <td>🪓 Второй carry</td>
              <td>
                <Badge variant="teal">Тыл</Badge>
              </td>
              <td>Вторичный ДПС или специалист по дебаффам</td>
            </tr>
            <tr>
              <td>5</td>
              <td>⚗️ Support</td>
              <td>
                <Badge variant="teal">Тыл</Badge>
              </td>
              <td>Баффы и лечение — должен соответствовать вашей фракции</td>
            </tr>
          </tbody>
        </table>
      </TableWrap>

      <div className="blabel">Статистика и навыки героев (по данным сообщества)</div>
      <div className="g2">
        <Card accent="gold">
          <CardTitle>5 основных характеристик</CardTitle>
          <ul>
            <li>
              <strong style={{ color: '#fff' }}>ATK</strong> — базовый урон; используется во всех атакующих навыках. Высокий
              ATK = высокий урон.
            </li>
            <li>
              <strong style={{ color: '#fff' }}>HP</strong> — суммарное здоровье. Может использоваться в защитных/
              поддерживающих навыках (например, щит Arthur масштабируется от максимального HP).
            </li>
            <li>
              <strong style={{ color: '#fff' }}>DEF</strong> — снижает входящий урон до вычета из HP. Точная формула не
              документирована полностью.
            </li>
            <li>
              <strong style={{ color: '#fff' }}>CMD</strong> — количество солдат, которых герой приводит в бой. 400 CMD =
              400 развёрнутых солдат.
            </li>
            <li>
              <strong style={{ color: '#fff' }}>Level</strong> — повышает все 4 характеристики. Растёт за счёт антитоксина
              или прохождения этапов Expedition.
            </li>
          </ul>
        </Card>
        <Card>
          <CardTitle>6 скрытых характеристик снаряжения</CardTitle>
          <ul>
            <li>
              <strong style={{ color: '#fff' }}>Crit Rate</strong> — % шанс нанести критический удар. Базовое значение ~5%
              (не отображается на экране характеристик героя).
            </li>
            <li>
              <strong style={{ color: '#fff' }}>Crit DMG</strong> — множитель критического удара. Базовое значение
              ~150–200% от обычного урона.
            </li>
            <li>
              <strong style={{ color: '#fff' }}>Crit Rate Taken</strong> — % шанс избежать входящего крита. Данных
              сообщества недостаточно.
            </li>
            <li>
              <strong style={{ color: '#fff' }}>Crit DMG Taken</strong> — снижение множителя крита при получении
              критического удара. Данных недостаточно.
            </li>
            <li>
              <strong style={{ color: '#fff' }}>Physical DMG RES</strong> — снижает входящий физический урон. Усиливается
              бронёй.
            </li>
            <li>
              <strong style={{ color: '#fff' }}>Energy DMG RES</strong> — снижает входящий энергетический урон. Усиливается
              ботинками.
            </li>
          </ul>
        </Card>
      </div>

      <div className="blabel">Структура навыков</div>
      <Card style={{ marginBottom: 12 }}>
        <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6, marginBottom: 8 }}>
          У каждого героя SSR и UR есть <strong style={{ color: '#fff' }}>5 навыков</strong>: 3 пассивных и 2 активных.
        </p>
        <div className="g2" style={{ marginTop: 8 }}>
          <div>
            <p
              style={{
                fontSize: 12,
                fontFamily: 'var(--mono)',
                color: 'var(--gold)',
                textTransform: 'uppercase',
                letterSpacing: '.08em',
                marginBottom: 6,
              }}
            >
              Активные (2)
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 4 }}>
              <li style={{ fontSize: 13, color: 'var(--text2)', paddingLeft: 13, position: 'relative', lineHeight: 1.4 }}>
                <span style={{ position: 'absolute', left: 0, color: 'var(--gold)', fontSize: 10, top: 2 }}>▸</span>
                <strong style={{ color: '#fff' }}>2-й навык (ультимейт)</strong> — базовый КД 15с. Наибольший эффект,
                самый высокий урон или воздействие.
              </li>
              <li style={{ fontSize: 13, color: 'var(--text2)', paddingLeft: 13, position: 'relative', lineHeight: 1.4 }}>
                <span style={{ position: 'absolute', left: 0, color: 'var(--gold)', fontSize: 10, top: 2 }}>▸</span>
                <strong style={{ color: '#fff' }}>3-й навык (активный)</strong> — базовый КД 5с. Срабатывает чаще, чем
                ультимейт.
              </li>
            </ul>
          </div>
          <div>
            <p
              style={{
                fontSize: 12,
                fontFamily: 'var(--mono)',
                color: 'var(--text3)',
                textTransform: 'uppercase',
                letterSpacing: '.08em',
                marginBottom: 6,
              }}
            >
              Пассивные (3)
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 4 }}>
              <li style={{ fontSize: 13, color: 'var(--text2)', paddingLeft: 13, position: 'relative', lineHeight: 1.4 }}>
                <span style={{ position: 'absolute', left: 0, color: 'var(--gold)', fontSize: 10, top: 2 }}>▸</span>
                <strong style={{ color: '#fff' }}>1-й навык</strong> — базовая автоатака. Без КД.
              </li>
              <li style={{ fontSize: 13, color: 'var(--text2)', paddingLeft: 13, position: 'relative', lineHeight: 1.4 }}>
                <span style={{ position: 'absolute', left: 0, color: 'var(--gold)', fontSize: 10, top: 2 }}>▸</span>
                <strong style={{ color: '#fff' }}>4-й навык</strong> — активен всегда; иногда командная аура.
              </li>
              <li style={{ fontSize: 13, color: 'var(--text2)', paddingLeft: 13, position: 'relative', lineHeight: 1.4 }}>
                <span style={{ position: 'absolute', left: 0, color: 'var(--gold)', fontSize: 10, top: 2 }}>▸</span>
                <strong style={{ color: '#fff' }}>5-й / бонусный навык</strong> — статовая пассивка; UR-герои также
                получают здесь бонус к снижению КД. Открывается на 30 уровне + 8★.
              </li>
            </ul>
          </div>
        </div>
      </Card>
      <Callout kind="tip">
        Эффекты навыков закрыты за уровнями звёзд — у каждого навыка 3 запертых эффекта, открываемых на 1★, 5★ и 10★. Скачок
        с 9★ до 10★ — крупнейшее единовременное вложение в игре: все 4 слота навыков одновременно достигают максимального
        уровня. В первую очередь прокачивайте основного ДПС-керри до 10★.
      </Callout>

      <div className="blabel">Дальность атаки</div>
      <div className="g2">
        <Card>
          <CardTitle>🗡️ Ближний бой</CardTitle>
          <ul>
            <li>ВСЕ танки атакуют в ближнем бою</li>
            <li>Командуют солдатами с мечом и щитом</li>
            <li>Вступают в прямой контакт с фронтом врага</li>
          </ul>
        </Card>
        <Card>
          <CardTitle>🏹 Дальний бой</CardTitle>
          <ul>
            <li>Все carry и support атакуют дистанционно</li>
            <li>Командуют лучниками</li>
            <li>Тип атаки не зависит от позиции героя в отряде</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
