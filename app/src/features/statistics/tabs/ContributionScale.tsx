import { Fragment, useMemo } from 'react';
import { Badge, GROUP_BADGE_VARIANT } from '../../../components/ui/Badge';
import { useContribution } from '../../../lib/api/hooks';

const PX_PER_MILLION = 12;
const MINOR_STEP = 1_000_000;
const MAJOR_STEP = 10_000_000;

const PAD_LEFT = 16;
const PAD_TOP = 16;
const PAD_RIGHT = 16;
const PAD_BOTTOM = 16;

const MS_LABEL_W = 24; // dedicated gutter for the R1/R2/R3 milestone labels, left of the ruler
const RULER_X0 = PAD_LEFT + MS_LABEL_W;
const RULER_W = 64; // ruler tick/label area, from RULER_X0
const ROW_GAP = 32; // gap between the ruler's spine and the row list
const ROW_X = RULER_X0 + RULER_W + ROW_GAP;
const ROW_MIN_GAP = 26; // minimum vertical distance between two row centers

const MILESTONES: { value: number; label: string; color?: string }[] = [
  { value: 30_000_000, label: 'R3', color: 'var(--blue)' },
  { value: 8_000_000, label: 'R2', color: 'var(--teal)' },
  { value: 0, label: 'R1' },
];

function formatPoints(n: number) {
  return n.toLocaleString('ru-RU');
}

/** Least-squares isotonic regression (pool-adjacent-violators): the closest non-decreasing sequence to `values`. */
function isotonicNonDecreasing(values: number[]): number[] {
  const blocks: { sum: number; count: number }[] = [];
  for (const v of values) {
    let sum = v;
    let count = 1;
    while (blocks.length > 0 && blocks[blocks.length - 1].sum / blocks[blocks.length - 1].count > sum / count) {
      const prev = blocks.pop()!;
      sum += prev.sum;
      count += prev.count;
    }
    blocks.push({ sum, count });
  }
  const result: number[] = [];
  for (const b of blocks) {
    const avg = b.sum / b.count;
    for (let k = 0; k < b.count; k++) result.push(avg);
  }
  return result;
}

/**
 * Resolves label overlaps by finding the positions closest (least-squares) to the
 * true scale positions that still keep a minimum gap apart — isotonic regression
 * on the naive positions after subtracting an `i * minGap` ramp (which turns the
 * "at least minGap apart" constraint into a plain non-decreasing constraint).
 * Unlike a greedy forward push, or centering clusters independently, this pools
 * violations globally in one consistent pass, so drift stays minimal and never
 * cascades past a genuinely well-separated gap.
 */
function declutter(naiveYsAscending: number[], minGap: number): number[] {
  const adjusted = naiveYsAscending.map((v, i) => v - i * minGap);
  const resolved = isotonicNonDecreasing(adjusted);
  return resolved.map((v, i) => v + i * minGap);
}

export function ContributionScale() {
  const { data: entries, isLoading } = useContribution();

  const layout = useMemo(() => {
    if (!entries || entries.length === 0) return null;

    const maxPoints = Math.max(...entries.map((e) => e.points));
    const maxRounded = Math.ceil(maxPoints / MAJOR_STEP) * MAJOR_STEP;
    const scaleH = (maxRounded / 1_000_000) * PX_PER_MILLION;

    // Fixed unit->px ratio (like the Formation grid's CELL) — the axis is true to scale.
    const y = (value: number) => scaleH - (value / 1_000_000) * PX_PER_MILLION;

    const ticks: { value: number; y: number; major: boolean }[] = [];
    for (let v = MINOR_STEP; v <= maxRounded; v += MINOR_STEP) {
      ticks.push({ value: v, y: y(v), major: v % MAJOR_STEP === 0 || v === MINOR_STEP });
    }

    // Rows are placed at their true scale position, then decluttered where crowded
    // — a thin leader line keeps each row's true value visible on the ruler.
    const sortedDesc = [...entries].sort((a, b) => b.points - a.points);
    const naiveYs = sortedDesc.map((entry) => y(entry.points));
    const displayYs = declutter(naiveYs, ROW_MIN_GAP);
    const rows = sortedDesc.map((entry, i) => ({ entry, naiveY: naiveYs[i], displayY: displayYs[i] }));

    const plotH = Math.max(scaleH, displayYs[displayYs.length - 1] ?? 0);
    return { ticks, rows, y, plotH };
  }, [entries]);

  if (isLoading || !entries || !layout) {
    return <p style={{ color: 'var(--text2)', fontSize: 13 }}>Загрузка анализа вклада…</p>;
  }

  const { ticks, rows, y, plotH } = layout;
  const svgW = RULER_X0 + RULER_W + 8;
  const svgH = PAD_TOP + plotH + PAD_BOTTOM;

  return (
    <div className="contrib-plot" style={{ height: plotH + PAD_TOP + PAD_BOTTOM }}>
      <svg className="contrib-ruler" style={{ width: svgW, height: svgH }} viewBox={`0 0 ${svgW} ${svgH}`}>
        <line
          x1={RULER_X0 + RULER_W}
          y1={PAD_TOP}
          x2={RULER_X0 + RULER_W}
          y2={PAD_TOP + plotH}
          className="contrib-ruler-line"
        />
        {ticks.map((t) => (
          <g key={t.value}>
            <line
              x1={RULER_X0 + RULER_W - (t.major ? 8 : 4)}
              y1={PAD_TOP + t.y}
              x2={RULER_X0 + RULER_W}
              y2={PAD_TOP + t.y}
              className="contrib-ruler-tick"
            />
            {t.major && (
              <text x={RULER_X0 + RULER_W - 12} y={PAD_TOP + t.y + 3} className="contrib-ruler-label" textAnchor="end">
                {formatPoints(t.value)}
              </text>
            )}
          </g>
        ))}
        {rows.map(({ entry, naiveY, displayY }) => (
          <g key={entry.nick}>
            <circle cx={RULER_X0 + RULER_W} cy={PAD_TOP + naiveY} r={2.5} className="contrib-tick-dot" />
            {Math.abs(displayY - naiveY) > 2 && (
              <line
                x1={RULER_X0 + RULER_W + 4}
                y1={PAD_TOP + naiveY}
                x2={ROW_X - 6}
                y2={PAD_TOP + displayY}
                className="contrib-leader"
              />
            )}
          </g>
        ))}
      </svg>

      {MILESTONES.map((m) => (
        <Fragment key={m.label}>
          <div
            className="contrib-milestone"
            style={{
              top: PAD_TOP + y(m.value),
              left: RULER_X0,
              right: PAD_RIGHT,
              background: m.color ?? 'var(--border2)',
            }}
          />
          <span
            className="contrib-milestone-label"
            style={{ top: PAD_TOP + y(m.value), left: PAD_LEFT, width: MS_LABEL_W - 6, color: m.color ?? 'var(--text2)' }}
          >
            {m.label}
          </span>
        </Fragment>
      ))}

      {rows.map(({ entry, displayY }) => (
        <div
          key={entry.nick}
          className={`contrib-row${entry.isSelf ? ' self' : ''}`}
          style={{ top: PAD_TOP + displayY, left: ROW_X, right: PAD_RIGHT }}
        >
          <span className="contrib-row-nick">{entry.nick}</span>
          <span className="contrib-row-points">{formatPoints(entry.points)}</span>
          <Badge variant={GROUP_BADGE_VARIANT[entry.group]}>{entry.group}</Badge>
        </div>
      ))}
    </div>
  );
}
