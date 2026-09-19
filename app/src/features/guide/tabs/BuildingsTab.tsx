import type { ReactNode } from 'react';
import { SectionHeader } from '../../../components/layout/SectionHeader';
import { Callout, Card, CardTitle, TierBlock } from '../../../components/ui';
import { sanctuaryLevels } from '../data/sanctuaryLevels';

/** Parses **bold** (plain white) and ++bold++ (gold) markers from data strings into JSX. */
function renderMarked(text: string): ReactNode {
  const regex = /(\*\*[^*]+\*\*|\+\+[^+]+\+\+)/g;
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = regex.exec(text))) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    const token = match[0];
    const isGold = token.startsWith('++');
    parts.push(
      <strong key={key++} style={{ color: isGold ? 'var(--gold-lt)' : '#fff' }}>
        {token.slice(2, -2)}
      </strong>,
    );
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
}

export function BuildingsTab() {
  return (
    <div className="section">
      <SectionHeader
        num="06 // BUILDINGS"
        title="Постройки"
        sub="Всё завязано на уровнях построек. Порядок имеет огромное значение."
      />

      <TierBlock tier={1} name="Производство и выживание" priority="Всегда первый приоритет" twoCol>
        <Card>
          <CardTitle>Хранилища</CardTitle>
          <ul>
            <li>Склады и амбары — прокачивайте до максимума перед повышением Sanctuary</li>
            <li>Без достаточного хранилища оффлайн-ресурсы переполняются и теряются</li>
          </ul>
        </Card>
        <Card>
          <CardTitle>Базовое производство</CardTitle>
          <ul>
            <li>
              <strong style={{ color: '#fff' }}>Ферма</strong> — зерно для населения и войск
            </li>
            <li>
              <strong style={{ color: '#fff' }}>Лесопилка</strong> — древесина для строительства
            </li>
            <li>
              <strong style={{ color: '#fff' }}>Огород трав</strong> — травы (самое частое узкое место)
            </li>
            <li>
              <strong style={{ color: '#fff' }}>Мастерская антитоксина</strong> — антитоксин для прокачки героев и событий
            </li>
          </ul>
        </Card>
      </TierBlock>

      <TierBlock tier={2} name="Технологии и экономика" priority="Синхронно с Sanctuary" twoCol>
        <Card>
          <CardTitle>Лаборатории исследований</CardTitle>
          <ul>
            <li>Прокачка синхронизирована с уровнем Sanctuary</li>
            <li>2 активные лаборатории резко сокращают все таймеры</li>
            <li>Требуется 15 уровень для наград исследований Alliance Duel</li>
          </ul>
        </Card>
        <Card>
          <CardTitle>Sanctuary HQ</CardTitle>
          <ul>
            <li>Открывает новые постройки, более высокие лимиты, дополнительные очереди стройки</li>
            <li>
              Повышайте <strong style={{ color: '#fff' }}>только после</strong> того, как производство, хранилища и
              мощь стабильны
            </li>
          </ul>
        </Card>
      </TierBlock>

      <TierBlock tier={3} name="Медицинские постройки" priority="Динамический приоритет">
        <Card>
          <CardTitle>Госпитали и палаты</CardTitle>
          <ul>
            <li>Определяют максимум раненых войск на лечении и скорость лечения</li>
            <li>Обычно низкий приоритет — поднимайте немедленно во время Rat Swarm или интенсивного PvP</li>
          </ul>
        </Card>
      </TierBlock>

      <TierBlock tier={4} name="Бой и оборона" priority="Минимум по требованию, максимум перед войнами" twoCol>
        <Card>
          <CardTitle>Учебные лагеря / казармы</CardTitle>
          <ul>
            <li>Увеличивают вместимость войск и скорость тренировки</li>
            <li>Всегда на максимальном уровне, допустимом Sanctuary</li>
          </ul>
        </Card>
        <Card>
          <CardTitle>Стены / сторожевые башни</CardTitle>
          <ul>
            <li>Базовая оборона — соблюдайте минимум для повышения Sanctuary</li>
            <li>Полностью максимизируйте перед крупными PvP-событиями или войнами сервера</li>
          </ul>
        </Card>
      </TierBlock>

      <TierBlock tier={5} name="Разведка и вспомогательные постройки" priority="Последними — после всего остального">
        <Card>
          <CardTitle>Разведцентры, радары и декоративные постройки</CardTitle>
          <ul>
            <li>Открывают исследование пустошей и найм выживших</li>
            <li>Не влияют напрямую на бой — прокачивайте только когда все основные постройки максимальны</li>
          </ul>
        </Card>
      </TierBlock>

      <div className="blabel">Требования прокачки Sanctuary — уровни 1–30</div>
      <p style={{ fontSize: 12, color: 'var(--text2)', marginBottom: 10 }}>
        Данные с lastasylumplague.com. <b>Исходное время</b> — базовое время до всех сокращений от хижины строителя,
        исследований, помощи альянса или Curios. Уровни 2–7 показывают только время постройки (отдельное исходное время не
        указано). Пороги тиров войск подтверждены сообществом.
      </p>
      <div className="tw">
        <div className="tc" style={{ overflowX: 'auto', marginBottom: 8 }}>
          <table>
            <thead>
              <tr>
                <th>Уровень</th>
                <th>Зерно и дерево</th>
                <th>Травы</th>
                <th>Звёзды</th>
                <th>Требуемые постройки</th>
                <th>Исходное время</th>
                <th>Открывает</th>
              </tr>
            </thead>
            <tbody>
              {sanctuaryLevels.map((row) => (
                <tr key={row.level} style={row.highlight ? { background: 'rgba(201,168,76,0.05)' } : undefined}>
                  <td style={{ textAlign: 'center' }}>
                    {row.highlight ? <strong style={{ color: 'var(--gold-lt)' }}>{row.level}</strong> : row.level}
                  </td>
                  <td>{row.farmWood}</td>
                  <td>{row.herbs}</td>
                  <td style={{ textAlign: 'center' }}>{row.stars}</td>
                  <td style={{ fontSize: '11.5px' }}>{row.buildings}</td>
                  <td style={{ whiteSpace: 'nowrap', textAlign: 'center' }}>
                    {row.time === 'как строительство' ? (
                      <span style={{ color: 'var(--text3)' }}>{row.time}</span>
                    ) : (
                      row.time
                    )}
                  </td>
                  <td style={{ fontSize: 12 }}>
                    {renderMarked(row.unlocks)}
                    {row.gate && (
                      <>
                        <br />
                        <small style={{ color: 'var(--gold)' }}>▶ {row.gate}</small>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Callout kind="tip">
        <b>Ключевые вехи:</b> Ур.7 → 1-я лаборатория + Raven Nest (начинайте фармить Raven немедленно). Ур.9 → начинают
        требоваться травы. Ур.15 → открывается Raven Workshop. Ур.20 → слот отряда 3 + порог войск T7. Ур.24 → порог войск
        T8. Ур.27 → порог войск T9. Ур.29 → порог войск T10. Всегда заранее прокачивайте требуемые постройки перед попыткой
        поднять следующий уровень Sanctuary.
      </Callout>

      <Callout kind="tip">
        <b>Производство → Хранилища → Исследования → Sanctuary → Оборона.</b> Никогда не спешите с Sanctuary, пока
        ресурсная база не сможет это выдержать.
      </Callout>
    </div>
  );
}
