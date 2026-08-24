import { Badge, GROUP_BADGE_VARIANT } from '../../../components/ui/Badge';
import type { CaravanMember } from '../../../lib/api/types';

export function CaravanMemberCell({ member }: { member: CaravanMember }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <strong style={{ color: '#fff' }}>{member.nick}</strong>
      <Badge variant={GROUP_BADGE_VARIANT[member.group]}>{member.group}</Badge>
      <span style={{ color: 'var(--text2)', fontSize: 12 }}>{member.level} ур.</span>
    </div>
  );
}
