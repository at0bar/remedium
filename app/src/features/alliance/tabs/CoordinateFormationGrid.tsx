import { useMemo } from 'react';
import { useFormation } from '../../../lib/api/hooks';

const CELL = 20; // px per in-game coordinate unit
const CITY_CELLS = 3; // a city occupies 3x3 units
const GAP_CELLS = 1; // 1-unit gap between adjacent cities
const STEP = CITY_CELLS + GAP_CELLS; // 4 — matches the real coordinate spacing between city centers
const CITY_PX = CITY_CELLS * CELL; // 60

// Includes the region-boundary chrome's own gutter (previously .region-map-content
// padding: 56/20/20/20) — the chrome now lives inside .coord-canvas-wrap so it
// scrolls together with the grid on narrow viewports, so its space moved here too.
const MARGIN_LEFT = 54;
const MARGIN_TOP = 76;
const MARGIN_RIGHT = 48;
const MARGIN_BOTTOM = 48;

export function CoordinateFormationGrid() {
  const { data: formationTiles, isLoading } = useFormation();

  const layout = useMemo(() => {
    if (!formationTiles) return null;

    const xs = Array.from(new Set(formationTiles.map((t) => t.x))).sort((a, b) => a - b);
    const ys = Array.from(new Set(formationTiles.map((t) => t.y))).sort((a, b) => b - a);

    // Origin (top-left reference point) sits one city-step outside the outermost cities on every side.
    const originX = xs[0] - STEP;
    const originYTop = ys[0] + STEP;
    const boundXMax = xs[xs.length - 1] + STEP;
    const boundYMin = ys[ys.length - 1] - STEP;

    const canvasW = (boundXMax - originX) * CELL;
    const canvasH = (originYTop - boundYMin) * CELL;

    // Coordinates name a cell, not a grid line — offset by half a cell so a city's
    // own coordinate lands in the middle of its cell instead of on a line crossing.
    const pxX = (x: number) => (x - originX) * CELL + CELL / 2;
    const pxY = (y: number) => (originYTop - y) * CELL + CELL / 2;

    return { xs, ys, canvasW, canvasH, pxX, pxY };
  }, [formationTiles]);

  if (isLoading || !formationTiles || !layout) {
    return <p style={{ color: 'var(--text2)', fontSize: 13 }}>Загрузка формации…</p>;
  }

  const { xs, ys, canvasW, canvasH, pxX, pxY } = layout;

  return (
    <div
      className="coord-canvas-wrap"
      style={{ width: canvasW + MARGIN_LEFT + MARGIN_RIGHT, height: canvasH + MARGIN_TOP + MARGIN_BOTTOM }}
    >
      <span className="region-label" style={{ top: 3, left: 26, color: 'var(--map-neighbor)' }}>
        Храм войны
      </span>
      <div className="region-line h region-neighbor" style={{ top: 18, left: 16, width: 170 }} />
      <div className="region-line v region-neighbor" style={{ top: 18, left: 16, height: 90 }} />

      <div className="region-line h region-us" style={{ top: 25, left: 23, width: 148 }} />
      <div className="region-line v region-us" style={{ top: 25, left: 23, height: 74 }} />
      <span className="region-label" style={{ top: 31, left: 33, color: 'var(--gold-lt)' }}>
        Мифриловый зал
      </span>

      <div
        className="coord-canvas"
        style={{
          left: MARGIN_LEFT,
          top: MARGIN_TOP,
          width: canvasW,
          height: canvasH,
        }}
      >
        {formationTiles.map((tile) => (
          <div
            key={tile.nick}
            className={`ftile role-${tile.role}${tile.isSelf ? ' self' : ''}`}
            style={{
              position: 'absolute',
              left: pxX(tile.x) - CITY_PX / 2,
              top: pxY(tile.y) - CITY_PX / 2,
              width: CITY_PX,
              height: CITY_PX,
            }}
            title={`${tile.nick} · ${tile.power ?? 'мощь неизвестна'} · ${tile.x}:${tile.y}`}
          >
            <div className="ftile-n">{tile.power ?? '—'}</div>
            <div className="ftile-nick">{tile.nick}</div>
          </div>
        ))}
      </div>

      <svg
        className="coord-axes"
        style={{ left: MARGIN_LEFT, top: MARGIN_TOP, width: canvasW, height: canvasH }}
        viewBox={`0 0 ${canvasW} ${canvasH}`}
      >
        {/* X axis — top edge, arrow pointing right */}
        <line x1={0} y1={0} x2={canvasW + 12} y2={0} className="coord-axis-line" />
        <polygon points={`${canvasW + 12},0 ${canvasW + 2},-5 ${canvasW + 2},5`} className="coord-axis-arrow" />
        <text x={canvasW + 20} y={6} className="coord-axis-letter">
          X
        </text>

        {/* Y axis — left edge, arrow pointing down */}
        <line x1={0} y1={0} x2={0} y2={canvasH + 12} className="coord-axis-line" />
        <polygon points={`0,${canvasH + 12} -5,${canvasH + 2} 5,${canvasH + 2}`} className="coord-axis-arrow" />
        <text x={0} y={canvasH + 30} className="coord-axis-letter" textAnchor="middle">
          Y
        </text>

        {xs.map((x) => (
          <g key={`tx-${x}`}>
            <line x1={pxX(x)} y1={-4} x2={pxX(x)} y2={4} className="coord-tick" />
            <text x={pxX(x)} y={-8} className="coord-tick-label" textAnchor="middle">
              {x}
            </text>
          </g>
        ))}
        {ys.map((y) => (
          <g key={`ty-${y}`}>
            <line x1={-4} y1={pxY(y)} x2={4} y2={pxY(y)} className="coord-tick" />
            <text x={-8} y={pxY(y) + 3} className="coord-tick-label" textAnchor="end">
              {y}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
