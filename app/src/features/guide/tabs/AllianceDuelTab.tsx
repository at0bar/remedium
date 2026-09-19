import { SectionHeader } from '../../../components/layout/SectionHeader';
import { Badge, Callout, Card, CardTitle } from '../../../components/ui';
import { alliancePhases } from '../data/alliancePhases';

export function AllianceDuelTab() {
  return (
    <div className="section">
      <SectionHeader
        num="08 // ALLIANCE DUEL"
        title="Дуэль альянсов"
        sub="Еженедельное событие из 6 фаз. Копите ресурсы, тратьте их в нужную фазу."
      />
      <Callout kind="info">
        Основная стратегия: <b>копите ресурсы между событиями и тратьте их в правильную фазу начисления очков.</b> Те же
        ресурсы, но правильный тайминг = намного больше очков, чем трата в течение недели как попало.
      </Callout>

      <div className="blabel">Разбивка по фазам</div>
      <div className="ptable">
        <table className="ptable-inner">
          <thead>
            <tr>
              <th>Фаза</th>
              <th>Что даёт очки</th>
              <th>Стратегия</th>
            </tr>
          </thead>
          <tbody>
            {alliancePhases.map((p) => (
              <tr key={p.phase}>
                <td className="phase-badge-cell">
                  <Badge variant={p.badge}>{p.phase}</Badge>
                  <br />
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--text3)' }}>{p.subtitle}</span>
                </td>
                <td>
                  <div className="ptags">
                    {p.tags.map((tag) => (
                      <span className="ptag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td>{p.strategy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Callout kind="tip">
        <b>Стратегия предварительной постройки:</b> начинайте долгие постройки и исследования до открытия каждой фазы.
        Когда они завершатся, <b>не нажимайте кнопку завершения</b>, пока соответствующая фаза не станет активной. Очки
        засчитываются в момент тапа — а не в момент окончания таймера.
      </Callout>
      <Callout kind="tip">
        <b>Falcon Quest:</b> каждое задание даёт <b>10 000 очков события</b>. Выполните задания до начала каждой фазы, но
        забирайте награду только после начала фазы.
      </Callout>
      <Callout kind="warn">
        <b>Синхронизация Survival Battle:</b> когда Survival Battle (Raven, Hero или Troops Training) идёт одновременно со
        своей фазой Alliance Duel, действия засчитывают очки в обоих событиях одновременно.
      </Callout>

      <div className="blabel">Ключевые активности альянса</div>
      <div className="g2">
        <Card accent="gold">
          <CardTitle>Караван альянса</CardTitle>
          <ul>
            <li>Регулярное участие → очки альянса → Raven Essence</li>
            <li>Лидер получает лучшие награды — вызывайтесь, когда можете</li>
          </ul>
        </Card>
        <Card accent="support">
          <CardTitle>Pandemic Experience</CardTitle>
          <ul>
            <li>Самое выгодное событие для получения очков альянса</li>
            <li>Выше сложность = лучше награды для всех</li>
          </ul>
        </Card>
        <Card accent="ranger">
          <CardTitle>Hunt Battle</CardTitle>
          <ul>
            <li>Волновая зачистка Blight — начать могут только R4/R5</li>
            <li>Сложность фиксируется на всё событие — выбирайте с умом</li>
          </ul>
        </Card>
        <Card accent="warrior">
          <CardTitle>Рейдовые атаки</CardTitle>
          <ul>
            <li>Присоединяйтесь ко всем рейдам альянса во время Фазы 6</li>
            <li>Скоординированная группа побеждает одиночных игроков с высокой мощью</li>
          </ul>
        </Card>
      </div>
      <Callout kind="warn">
        <b>Треугольник PvP-фракций:</b> Warriors {'>'} Rangers {'>'} Warlocks {'>'} Warriors. Знайте основную фракцию
        противника перед рейдами Фазы 6.
      </Callout>
    </div>
  );
}
