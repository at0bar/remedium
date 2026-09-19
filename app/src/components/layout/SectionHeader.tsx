export function SectionHeader({ num, title, sub }: { num: string; title: string; sub?: string }) {
  return (
    <div className="sec-hdr">
      <div>
        <div className="sec-num">{num}</div>
        <h2 className="sec-title">{title}</h2>
      </div>
      {sub && <div className="sec-sub">{sub}</div>}
    </div>
  );
}
