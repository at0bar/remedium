const common = {
  width: 16,
  height: 16,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export function ProfileIcon() {
  return (
    <svg {...common}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4.5 20c1.4-3.6 4.4-5.5 7.5-5.5s6.1 1.9 7.5 5.5" />
    </svg>
  );
}

export function GuideIcon() {
  return (
    <svg {...common}>
      <path d="M4 5.5C4 4.7 4.7 4 5.5 4H11v16H5.5c-.8 0-1.5-.7-1.5-1.5z" />
      <path d="M20 5.5c0-.8-.7-1.5-1.5-1.5H13v16h5.5c.8 0 1.5-.7 1.5-1.5z" />
    </svg>
  );
}

export function AllianceIcon() {
  return (
    <svg {...common}>
      <path d="M12 3.5l7 2.5v5c0 5-3 8.3-7 9.5-4-1.2-7-4.5-7-9.5v-5z" />
    </svg>
  );
}

export function StatisticsIcon() {
  return (
    <svg {...common}>
      <path d="M4 20V10M11 20V4M18 20v-7" />
    </svg>
  );
}
