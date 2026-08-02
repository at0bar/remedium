export function MobileTopBar({ onToggle }: { onToggle: () => void }) {
  return (
    <div className="mobile-topbar">
      <button type="button" className="mobile-menu-btn" onClick={onToggle} aria-label="Открыть меню">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <span className="sb-title" style={{ fontSize: 16 }}>
        Remedium
      </span>
    </div>
  );
}
