export interface PriorityItem {
  title: string;
  description: string;
}

export function PriorityList({ items }: { items: PriorityItem[] }) {
  return (
    <div className="plist">
      {items.map((item, i) => (
        <div className="pi" key={item.title}>
          <div className="pin">{i + 1}</div>
          <div className="pic">
            <div className="pit">{item.title}</div>
            <div className="pid">{item.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
