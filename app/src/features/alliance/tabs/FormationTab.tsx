import { Badge } from '../../../components/ui/Badge';
import { Callout } from '../../../components/ui/Callout';
import { PLAYSTYLE_LABELS } from '../../../lib/playstyle';
import { CoordinateFormationGrid } from './CoordinateFormationGrid';
import { RegionMap } from './RegionMap';

export function FormationTab() {
  return (
    <>
      <Callout kind="info">
        Координаты, мощь и часть ников могут быть неактуальны. Обновим при следующей сверке.
      </Callout>

      <div className="blabel">Регион альянса и построение</div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
        <span
          style={{
            fontFamily: 'var(--mono)',
            fontSize: 10,
            color: 'var(--text3)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            alignSelf: 'center',
            marginRight: 4,
          }}
        >
          Круговая оборона
        </span>
        <Badge variant="red">{PLAYSTYLE_LABELS.attacker} (кольцо)</Badge>
        <Badge variant="gold">{PLAYSTYLE_LABELS.mixed}</Badge>
        <Badge variant="blue">{PLAYSTYLE_LABELS.defender} (центр)</Badge>
        <Badge variant="neutral">{PLAYSTYLE_LABELS.none}</Badge>
      </div>

      <RegionMap>
        <div className="formation-wrap">
          <CoordinateFormationGrid />
        </div>
      </RegionMap>
    </>
  );
}
