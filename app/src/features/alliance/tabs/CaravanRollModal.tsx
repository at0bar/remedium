import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { CaravanMemberCell } from './CaravanMemberCell';
import type { CaravanDraw, CaravanRole } from '../../../lib/api/types';

export const ROLE_BADGE: Record<CaravanRole, 'gold' | 'teal' | 'purple'> = {
  кучер: 'gold',
  страж: 'teal',
  vip: 'purple',
};

export function CaravanRollModal({
  draw,
  onConfirm,
  onReroll,
  onClose,
}: {
  draw: CaravanDraw;
  onConfirm: () => void;
  onReroll: () => void;
  onClose: () => void;
}) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h3 className="modal-title">Счастливчики!</h3>
        <div className="modal-draw-list">
          <div className="modal-draw-row">
            <CaravanMemberCell member={draw.coachman} />
            <Badge variant={ROLE_BADGE.кучер}>кучер</Badge>
          </div>
          <div className="modal-draw-row">
            <CaravanMemberCell member={draw.escort} />
            <Badge variant={ROLE_BADGE[draw.escortRole]}>{draw.escortRole}</Badge>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 20 }}>
          <Button variant="neutral" onClick={onReroll}>
            Переброс
          </Button>
          <Button variant="gold" onClick={onConfirm}>
            Подтвердить
          </Button>
        </div>
      </div>
    </div>
  );
}
